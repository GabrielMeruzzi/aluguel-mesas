import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

export default function Details() {
  const location = useLocation();
  const data = location.state;

  const handleDeleteBtn = async () => {
    try {
      const response = await fetch("https://deletealuguel-iolqb46d3a-uc.a.run.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idAluguel: data.id,
        }),
      });
      if (!response.ok) {
        throw new Error("Erro ao remover aluguel");
      }
      
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        margin: "15px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <CardContent>
        <h2>
          Detalhes do pedido <br /> {data.endereco}{" "}
        </h2>
        {data.nome && (
          <p>
            <strong>Nome:</strong> {data.nome}
          </p>
        )}
        <p>
          <strong>Telefone:</strong> {data.celular}
        </p>
        <p>
          <strong>Valor:</strong> R$ {data.valor}
        </p>

        <p>
          <strong>Data do pedido:</strong> {data.dataCriacao}
        </p>
        <p>
          <strong>Data de entrega:</strong> {data.dataEntrega}
        </p>

        <p>
          <strong>Pagamento:</strong> {data.pagamento ? "PAGO" : "NÃO PAGO"}
        </p>

        {data.qntMesas && (
          <p>
            <strong>Mesas:</strong> {data.qntMesas}
          </p>
        )}
        {data.qntCadeiras && (
          <p>
            <strong>Cadeiras:</strong> {data.qntCadeiras}
          </p>
        )}
        {data.qntJogos && (
          <p>
            <strong>Jogos:</strong> {data.qntJogos}
          </p>
        )}
        {data.qntCustomizada && (
          <p>
            <strong>Cadeiras customizadas:</strong> Sim
          </p>
        )}
        {data.status !== undefined && (
          <p>
            <strong>Status:</strong>{" "}
            {
              {
                0: "ENTREGAR",
                1: "ENTREGUE",
                2: "PAGAMENTO PENDENTE",
              }[data.status]
            }
          </p>
        )}
        {data.observacao && (
          <p>
            <strong>Observação:</strong> {data.observacao}
          </p>
        )}
      </CardContent>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "-15px 15px 10px",
        }}
      >
        <Button
          variant="outlined"
          size="medium"
          onClick={() => {
            navigate(`/detalhes/${data.id}`, { state: data });
          }}
        >
          EDITAR
        </Button>

        <Button variant="outlined" size="medium" onClick={handleDeleteBtn}>
          REMOVER
        </Button>

        <Button
          variant="outlined"
          size="medium"
          onClick={() => {
            navigate(`/detalhes/${data.id}`, { state: data });
          }}
        >
          COPIAR ENDEREÇO
        </Button>
        <Button
          variant="outlined"
          size="medium"
          onClick={() => {
            navigate(`/detalhes/${data.id}`, { state: data });
          }}
        >
          COPIAR NÚMERO
        </Button>
      </div>
    </Card>
  );
}
