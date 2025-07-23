import "./Navigation.css";
import { Routes, Route } from "react-router-dom";
import Login from "../login/Login";
import ProtectedRoute from "../../authComponents/protectedRoute/ProtectedRoute";
import Info from "../info/Info";
import FormPage from "../form/FormPage";
import OrderDetails from "../orderDetails/OrderDetails"

export default function Navigation() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/adicionar-aluguel" element={<FormPage />} />
        <Route path="/entregar" element={<Info />} />
        <Route path="/entregue" element={<Info />} />
        <Route path="/pendente" element={<Info />} />
        <Route path="/finalizado" element={<Info />} />
        <Route path="/detalhes/:id" element={<OrderDetails />} />
      </Route>
    </Routes>
  );
}
