
import { ShoppingBag, Coffee, Home, Car, Heart, Music } from 'lucide-react';

const expenses = [
  { category: 'Shopping', amount: -120.50, date: '2024-03-15', icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
  { category: 'Coffee', amount: -4.99, date: '2024-03-15', icon: Coffee, color: 'bg-amber-100 text-amber-600' },
  { category: 'Rent', amount: -1200, date: '2024-03-14', icon: Home, color: 'bg-green-100 text-green-600' },
  { category: 'Car Insurance', amount: -89.99, date: '2024-03-14', icon: Car, color: 'bg-red-100 text-red-600' },
  { category: 'Healthcare', amount: -45.00, date: '2024-03-13', icon: Heart, color: 'bg-pink-100 text-pink-600' },
  { category: 'Entertainment', amount: -15.99, date: '2024-03-13', icon: Music, color: 'bg-purple-100 text-purple-600' },
];

export default function ExpensesList() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Recent Expenses</h2>
        <button className="text-indigo-600 hover:text-indigo-700">View All</button>
      </div>
      <div className="space-y-4">
        {expenses.map((expense, index) => (
          <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${expense.color}`}>
                <expense.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">{expense.category}</p>
                <p className="text-sm text-gray-500">{expense.date}</p>
              </div>
            </div>
            <span className="font-semibold text-red-500">
              ${Math.abs(expense.amount).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}