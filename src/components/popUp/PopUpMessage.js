import { useNavigate } from "react-router-dom";
import "./PopUpMessage.css";
import Button from "@mui/material/Button";

export default function PopUpMessage() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/entregar?call=getAluguelEntregar")
    }

  return (
    <>
    <div className="overlay" />
    <div className="popUpDiv">
      <h1 className="popUpText">ALUGUEL ADICIONADO</h1>
      <Button variant="contained" onClick={() => handleClick()}>
          Voltar ao início
        </Button>
    </div>
    </>
  );
}
