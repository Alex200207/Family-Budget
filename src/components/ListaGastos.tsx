import React from 'react';
import { ShoppingBag, Coffee, Home, Car, Heart, Music } from 'lucide-react';

const gastos = [
  { categoria: 'Compras', monto: -120.50, fecha: '15 mar 2024', icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
  { categoria: 'Café', monto: -4.99, fecha: '15 mar 2024', icon: Coffee, color: 'bg-amber-100 text-amber-600' },
  { categoria: 'Alquiler', monto: -1200, fecha: '14 mar 2024', icon: Home, color: 'bg-green-100 text-green-600' },
  { categoria: 'Seguro Auto', monto: -89.99, fecha: '14 mar 2024', icon: Car, color: 'bg-red-100 text-red-600' },
  { categoria: 'Salud', monto: -45.00, fecha: '13 mar 2024', icon: Heart, color: 'bg-pink-100 text-pink-600' },
  { categoria: 'Entretenimiento', monto: -15.99, fecha: '13 mar 2024', icon: Music, color: 'bg-purple-100 text-purple-600' },
];

export default function ListaGastos() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Gastos Recientes</h2>
        <button className="text-indigo-600 hover:text-indigo-700 font-medium">Ver Todos</button>
      </div>
      <div className="space-y-4">
        {gastos.map((gasto, index) => (
          <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${gasto.color}`}>
                <gasto.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">{gasto.categoria}</p>
                <p className="text-sm text-gray-500">{gasto.fecha}</p>
              </div>
            </div>
            <span className="font-semibold text-red-500">
              ${Math.abs(gasto.monto).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}