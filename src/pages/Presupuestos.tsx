import React from 'react';
import { Table } from '../components/Table';

const presupuestos = [
  { id: 1, categoria: 'Vivienda', asignado: 1500, gastado: 1125, restante: 375, porcentaje: 75 },
  { id: 2, categoria: 'Alimentación', asignado: 800, gastado: 480, restante: 320, porcentaje: 60 },
  { id: 3, categoria: 'Transporte', asignado: 400, gastado: 180, restante: 220, porcentaje: 45 },
  { id: 4, categoria: 'Entretenimiento', asignado: 200, gastado: 180, restante: 20, porcentaje: 90 },
  { id: 5, categoria: 'Salud', asignado: 300, gastado: 90, restante: 210, porcentaje: 30 },
];

const columns = [
  { header: 'Categoría', accessor: 'categoria' },
  {
    header: 'Asignado',
    accessor: 'asignado',
    cell: (row: any) => `$${row.asignado.toFixed(2)}`,
  },
  {
    header: 'Gastado',
    accessor: 'gastado',
    cell: (row: any) => `$${row.gastado.toFixed(2)}`,
  },
  {
    header: 'Restante',
    accessor: 'restante',
    cell: (row: any) => `$${row.restante.toFixed(2)}`,
  },
  {
    header: 'Progreso',
    accessor: 'porcentaje',
    cell: (row: any) => (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-indigo-600 h-2.5 rounded-full"
          style={{ width: `${row.porcentaje}%` }}
        />
      </div>
    ),
  },
];

export default function Presupuestos() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Presupuestos</h1>
        <button className="btn btn-primary">Nuevo Presupuesto</button>
      </div>
      <Table data={presupuestos} columns={columns} />
    </div>
  );
}