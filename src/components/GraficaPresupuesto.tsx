import React from 'react';

export default function GraficaPresupuesto() {
  const categorias = [
    { nombre: 'Vivienda', porcentaje: 75, color: 'bg-blue-500' },
    { nombre: 'Alimentación', porcentaje: 60, color: 'bg-green-500' },
    { nombre: 'Transporte', porcentaje: 45, color: 'bg-yellow-500' },
    { nombre: 'Entretenimiento', porcentaje: 90, color: 'bg-purple-500' },
    { nombre: 'Salud', porcentaje: 30, color: 'bg-red-500' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Resumen de Presupuesto</h2>
      <div className="space-y-4">
        {categorias.map((categoria) => (
          <div key={categoria.nombre} className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">{categoria.nombre}</span>
              <span className="text-sm text-gray-500">{categoria.porcentaje}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${categoria.color} transition-all duration-500`}
                style={{ width: `${categoria.porcentaje}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}