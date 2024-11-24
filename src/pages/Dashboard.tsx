
import DashboardStats from '../components//Dashboard1';
import ListaGastos from '../components/ListaGastos';
import GraficaPresupuesto from '../components/GraficaPresupuesto';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <DashboardStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ListaGastos />
        <GraficaPresupuesto />
      </div>
    </div>
  );
}