import DashboardStats from '../components/Dashboard1';
import ListaGastos from '../components/ListaGastos';
import GraficaPresupuesto from '../components/GraficaPresupuesto';

export default function Dashboard() {
  return (
    <div className="space-y-6 px-4 sm:px-6 md:px-8">
    
      <DashboardStats />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <ListaGastos />
        <GraficaPresupuesto />
      </div>
    </div>
  );
}
