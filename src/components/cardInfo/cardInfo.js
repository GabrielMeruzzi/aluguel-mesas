import "./cardInfo.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function CardInfo({ data, deleteCard }) {
  const {
    id,
    nome,
    celular,
    endereco,
    observacao,
    valor,
    qntCustomizada,
    qntJogos,
    qntMesas,
    qntCadeiras,
    pagamento,
    status,
    dataEntrega,
    dataCriacao,
  } = data;
  const navigate = useNavigate();

  const handleUpdateAluguel = async (updatedData) => {
    try {
      const response = await fetch(
        "https://updatealuguel-iolqb46d3a-uc.a.run.app",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idAluguel: data.id,
            newData: updatedData,
          }),
        }
      );
      if (response.ok) {
        const resData = await response.json();
        console.log(resData.message);
        deleteCard(data.id);
      } else {
        console.log("Erro:", resData.message);
      }
    } catch (err) {
      console.log("Erro ao atualizar", err);
    }
  };

  return (
    <Card sx={{ minWidth: 275, margin: "10px 5px" }}>
      <CardContent>
        {nome ? (
          <div className="textDiv">
            <Typography variant="h7">Nome</Typography>
            <Typography variant="h6">{data.nome}</Typography>
          </div>
        ) : null}

        <div className="textDiv">
          <Typography variant="h7">Data de Entrega</Typography>
          <Typography variant="h6">{data.dataEntrega}</Typography>
        </div>

        <a
          href={`https://waze.com/ul?q=${endereco.replace(" ", "+")}`}
          target="blank"
          className="urlText"
        >
          <div className="textDiv">
            <Typography variant="h7">Endereço</Typography>
            <Typography variant="h6">{data.endereco}</Typography>
          </div>
        </a>

        {qntCustomizada ? (
          <>
            <div className="textDiv">
              <Typography variant="h7">Quantidade Mesas</Typography>
              <Typography variant="h6">{data.qntMesas} Mesas</Typography>
            </div>
            <div className="textDiv">
              <Typography variant="h7">Quantidade Cadeiras</Typography>
              <Typography variant="h6">{data.qntCadeiras} Cadeiras</Typography>
            </div>
          </>
        ) : (
          <div className="textDiv">
            <Typography variant="h7">Quantidade</Typography>
            <Typography variant="h6">{data.qntJogos} Jogos</Typography>
          </div>
        )}

        <div className="textDiv">
          <Typography variant="h7">Valor</Typography>
          <Typography variant="h6">R$ {data.valor}</Typography>
        </div>

        {observacao ? (
          <div className="textDiv">
            <Typography variant="h7">Observação</Typography>
            <Typography variant="h6">{data.observacao}</Typography>
          </div>
        ) : null}
        {celular ? (
          <>
            <a
              href={`https://wa.me/55${celular}`}
              target="blank"
              className="urlText"
            >
              <div className="textDiv">
                <Typography variant="h7">Celular</Typography>
                <Typography variant="h6">{data.celular}</Typography>
              </div>
            </a>
          </>
        ) : null}
        {pagamento ? (
          <div className="textDiv">
            <Typography variant="h7">Status</Typography>
            <Typography variant="h6">PAGO</Typography>
          </div>
        ) : null}
        <CardActions style={{ justifyContent: "center" }}>
          {status >= 2 ? null : status === 0 ? (
            <Button
              variant="outlined"
              size="medium"
              onClick={() => handleUpdateAluguel({ status: 1 })}
            >
              ENTREGUE
            </Button>
          ) : (
            <Button
              variant="outlined"
              size="medium"
              onClick={() => handleUpdateAluguel({ status: 2 })}
            >
              RECEBIDO
            </Button>
          )}

          {pagamento ? null : (
            <Button
              variant="outlined"
              size="medium"
              onClick={() => handleUpdateAluguel({ pagamento: true })}
            >
              PAGO
            </Button>
          )}

          <Button
            variant="outlined"
            size="medium"
            onClick={() => {
              navigate(`/detalhes/${data.id}`, { state: data });
            }}
          >
            DETALHES
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
