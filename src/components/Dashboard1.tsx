import { PieChart, Wallet, TrendingUp, Users } from 'lucide-react';

import useUsers from '../hook/useUsers';
import useExpenses from '../hook/useExpenses';

export default function Dashboard() {
  const { users } = useUsers();
  const {  expense} = useExpenses();

  const showExpenseTotal = () => {
    let total = 0;
    expense.forEach((exp) => {
      total += exp.monto;
    });
    return total;
  }



  const estadisticas = [
    { titulo: 'Balance Total', cantidad: '$5.240', cambio: '+8%', icon: Wallet },
    { titulo: 'Gastos Mensuales', cantidad: '$1.850', cambio: '-2%', icon: PieChart },
    { titulo: 'Ingresos Mensuales', cantidad: `${showExpenseTotal()}`, cambio: '+12%', icon: TrendingUp },
    { titulo: 'Miembros Familia', cantidad: `${users.length}`, icon: Users },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {estadisticas.map((stat) => (
        <div key={stat.titulo} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{stat.titulo}</p>
              <p className="text-2xl font-semibold mt-1">{stat.cantidad}</p>
            </div>
            <div className="bg-indigo-50 p-3 rounded-lg">
              <stat.icon className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className={`text-sm ${
              stat.cambio?.startsWith('+') ? 'text-green-500' : 
              stat.cambio === '0' ? 'text-gray-500' : 'text-red-500'
            }`}>
              {stat.cambio}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
