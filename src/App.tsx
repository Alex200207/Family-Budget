import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Gastos from "./pages/Gastos";
import Presupuestos from "./pages/Presupuestos";
import Planes from "./pages/Planes";
import Ingresos from "./pages/Ingresos";
import { Miembros } from "./pages/Miembros";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="gastos" element={<Gastos />} />
          <Route path="presupuestos" element={<Presupuestos />} />
          <Route path="planes" element={<Planes />} />
          <Route path="ingresos" element={<Ingresos />} />
          <Route path="usuarios" element={<Miembros />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
