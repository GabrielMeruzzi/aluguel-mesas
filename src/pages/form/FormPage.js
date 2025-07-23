import React, { useState } from "react";
import "./Form.css";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import PopUpMessage from "../../components/popUp/PopUpMessage";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function AddRent() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [formData, setFormData] = useState({
    nome: null,
    celular: "21",
    endereco: null,
    qntCustomizada: false,
    qntJogos: null,
    qntMesas: null,
    qntCadeiras: null,
    valor: null,
    dataEntrega: null,
    pagamento: false,
    status: 0,
    observacao: null,
  });

  const handleChange = (e) => {
    const { name, type } = e.target;
    let value = type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "qntCustomizada") {
        if (value) {
          updated.qntJogos = "";
        } else {
          updated.qntMesas = "";
          updated.qntCadeiras = "";
        }
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://addaluguel-iolqb46d3a-uc.a.run.app",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error(`Erro no servidor: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setShowPopUp(true);
      } else {
        alert("Erro: " + (data.message || "Não foi possível adicionar."));
      }
    } catch (error) {
      console.error("Erro ao enviar aluguel:", error);
      alert("Erro ao enviar o formulário");
    }
  };

  return (
    <div>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          margin: "15px 10px",
        }}
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Nome"
          variant="outlined"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
        />

        <TextField
          id="outlined-basic"
          label="Celular"
          variant="outlined"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          name="celular"
          value={formData.celular}
          onChange={handleChange}
        />

        <TextField
          id="outlined-basic"
          label="Endereco"
          variant="outlined"
          name="endereco"
          value={formData.endereco}
          onChange={handleChange}
          required
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Qnt Personalizada
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={false}
            label="qntCustomizada"
            name="qntCustomizada"
            value={formData.qntCustomizada}
            onChange={handleChange}
          >
            <MenuItem value={true}>SIM</MenuItem>
            <MenuItem value={false}>NÃO</MenuItem>
          </Select>
        </FormControl>

        {!formData.qntCustomizada ? (
          <TextField
            id="outlined-basic"
            label="Quantidade de Jogos"
            variant="outlined"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            name="qntJogos"
            value={formData.qntJogos}
            onChange={handleChange}
            required
          />
        ) : (
          <>
            <TextField
              id="outlined-basic"
              label="Quantidade de Mesas"
              variant="outlined"
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              name="qntMesas"
              value={formData.qntMesas}
              onChange={handleChange}
              required
            />
            <TextField
              id="outlined-basic"
              label="Quantidade de Cadeiras"
              variant="outlined"
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              name="qntCadeiras"
              value={formData.qntCadeiras}
              onChange={handleChange}
              required
            />
          </>
        )}

        <TextField
          id="outlined-basic"
          label="Valor R$"
          variant="outlined"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          name="valor"
          value={formData.valor}
          onChange={handleChange}
          required
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Data Entrega"
              format="DD-MM-YYYY"
              onChange={(newDate) =>
                setFormData((prev) => ({
                  ...prev,
                  dataEntrega: newDate ? newDate.format("YYYY-MM-DD") : "",
                }))
              }
            />
          </DemoContainer>
        </LocalizationProvider>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Pagamento</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={false}
            label="pagamento"
            name="pagamento"
            value={formData.pagamento}
            onChange={handleChange}
          >
            <MenuItem value={true}>PAGO</MenuItem>
            <MenuItem value={false}>NÃO PAGO</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={0}
            label="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <MenuItem value={0}>ENTREGAR</MenuItem>
            <MenuItem value={1}>ENTREGUE</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="outlined-multiline-static"
          label="Observações"
          multiline
          rows={4}
          name="observacao"
          value={formData.observacao}
          onChange={handleChange}
        />

        <Button variant="contained" endIcon={<SendIcon />} type="submit">
          Enviar Aluguel
        </Button>
      </Box>
      {showPopUp ? (
        <>
          <PopUpMessage />
        </>
      ) : null}
    </div>
  );
}
