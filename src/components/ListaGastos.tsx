import React from "react";
import { ShoppingBag } from "lucide-react";
import useExpenses from "../hook/useExpenses";
import moment from "moment";
import { Link } from "react-router-dom";

const categoryIcons: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  Compras: { icon: ShoppingBag, color: "bg-blue-100 text-blue-600" },
};

export default function ListaGastos() {
  const { expense: expenses } = useExpenses(); 

  const getDate = (date: Date | string) => {
    return moment(date).format("DD/MM/YYYY");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Gastos Recientes</h2>
        <button className="text-indigo-600 hover:text-indigo-700 font-medium">
          <Link to="/gastos">Ver Todos</Link>
        </button>
      </div>
      <div className="space-y-4">
        {/*con slice mostramos  de 0 a 3 gastos asi limitando */}
        {expenses.slice(0, 3).map((expense, index) => {
          const category = categoryIcons[expense.estado] || {
            icon: ShoppingBag,
            color: "bg-gray-100 text-gray-600",
          };
          const IconComponent = category.icon;

          return (
            <div
              key={index}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${category.color}`}>
                  <IconComponent className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{expense.tipo}</p>
                  <p className="text-sm text-gray-500">
                    {expense.fecha
                      ? getDate(expense.fecha)
                      : "Fecha no disponible"}
                  </p>
                </div>
              </div>
              <span className="font-semibold text-red-500">
                ${Math.abs(expense.monto).toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
