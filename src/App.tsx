
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Gastos from './pages/Gastos';
import Presupuestos from './pages/Presupuestos';
import Planes from './pages/Planes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="gastos" element={<Gastos />} />
          <Route path="presupuestos" element={<Presupuestos />} />
          <Route path="planes" element={<Planes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;