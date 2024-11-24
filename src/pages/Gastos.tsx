
import { Table } from '../components/Table';
import { ShoppingBag, Coffee, Home, Car, Heart, Music } from 'lucide-react';

const gastos = [
  { id: 1, categoria: 'Compras', monto: -120.50, fecha: '15 mar 2024', icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
  { id: 2, categoria: 'Café', monto: -4.99, fecha: '15 mar 2024', icon: Coffee, color: 'bg-amber-100 text-amber-600' },
  { id: 3, categoria: 'Alquiler', monto: -1200, fecha: '14 mar 2024', icon: Home, color: 'bg-green-100 text-green-600' },
  { id: 4, categoria: 'Seguro Auto', monto: -89.99, fecha: '14 mar 2024', icon: Car, color: 'bg-red-100 text-red-600' },
  { id: 5, categoria: 'Salud', monto: -45.00, fecha: '13 mar 2024', icon: Heart, color: 'bg-pink-100 text-pink-600' },
  { id: 6, categoria: 'Entretenimiento', monto: -15.99, fecha: '13 mar 2024', icon: Music, color: 'bg-purple-100 text-purple-600' },
];

const columns = [
  {
    header: 'Categoría',
    accessor: 'categoria',
    cell: (row: any) => (
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${row.color}`}>
          <row.icon className="h-5 w-5" />
        </div>
        <span>{row.categoria}</span>
      </div>
    ),
  },
  {
    header: 'Monto',
    accessor: 'monto',
    cell: (row: any) => (
      <span className="font-semibold text-red-500">
        ${Math.abs(row.monto).toFixed(2)}
      </span>
    ),
  },
  {
    header: 'Fecha',
    accessor: 'fecha',
  },
];

export default function Gastos() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Gastos</h1>
        <button className="btn btn-primary">Nuevo Gasto</button>
      </div>
      <Table data={gastos} columns={columns} />
    </div>
  );
}