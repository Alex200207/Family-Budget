import { PieChart, Wallet, TrendingUp, Users } from 'lucide-react';

import useUsers from '../hook/useUsers';
import useExpenses from '../hook/useExpenses';
import useIncome from '../hook/useIncome';

export default function Dashboard() {
  const { users } = useUsers();
  const {  expense} = useExpenses();
  const {income} = useIncome();

  const showExpenseTotal = () => {
    let total = 0;
    expense.forEach((exp) => {
      total += exp.monto;
    });
    return total;
  }

  const showIncomeTotal = () => {
    let total = 0;
    income.forEach((inc) => {
      total += inc.monto;
    });
    return total;
  }

  const showBalance = () => {
    return showIncomeTotal() - showExpenseTotal();
  }



  const estadisticas = [
    { titulo: 'Balance Total', cantidad: `${showBalance()}`, cambio: '', icon: Wallet },
    { titulo: 'Gastos Mensuales', cantidad: `${showExpenseTotal()}`, cambio: '', icon: PieChart },
    { titulo: 'Ingresos Mensuales', cantidad: `${showIncomeTotal()}`, cambio: '', icon: TrendingUp },
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
