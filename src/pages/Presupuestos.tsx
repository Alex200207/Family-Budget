import { Table } from "../components/Table";
import useBudget from "../hook/useBudget";
import useExpenses from "../hook/useExpenses";


interface BudgetRow {
  id: number;
  fecha_inicio?: Date;
  fecha_fin?: Date;
  limite: number;
  categoria: string;
  gastado: number;
  restante: number;
  porcentaje: number;
}

export default function Presupuestos() {
  const { expense } = useExpenses(); // Arreglo de gastos
  const { budget } = useBudget(); // Arreglo de presupuestos

  const columns = [
    {
      header: "name",
      accessor: "categoria",
      cell: (row: BudgetRow) => row.categoria,
    },
    
    {
      header: "Asignado",
      accessor: "limite",
      cell: (row: BudgetRow) => `$${row.limite.toFixed(2)}`,
    },
    {
      header: "Gastado",
      accessor: "gastado",
      cell: (row: BudgetRow) => `$${row.gastado.toFixed(2)}`,
    },
    {
      header: "Restante",
      accessor: "restante",
      cell: (row: BudgetRow) => `$${row.restante.toFixed(2)}`,
    },
    {
      header: "Limite",
      accessor: "porcentaje",
      cell: (row: BudgetRow) => (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full"
            style={{ width: `${row.porcentaje}%` }}
          />
        </div>
      ),
    },
  ];

  // Transformar presupuestos con cálculos dinámicos
  const transformedBudget: BudgetRow[] = budget.map((budgets) => {
    const totalGastado = expense
      .filter((exp) => exp.presupuesto_id === budgets.id) // Filtra gastos por presupuesto
      .reduce((sum, exp) => sum + exp.monto, 0); // Suma los montos de los gastos

    const restante = budgets.limite - totalGastado;
    const porcentaje = (totalGastado / budgets.limite) * 100;

    return {
      id: budgets.id,
      fecha_inicio: budgets.fecha_inicio,
      fecha_fin: budgets.fecha_fin,
      limite: budgets.limite,
      categoria: budgets.categoria,
      gastado: totalGastado,
      restante: Math.max(restante, 0), // Asegúrate de que no sea negativo
      porcentaje: Math.min(porcentaje, 100), // Máximo 100%
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Presupuestos</h1>
        <button className="btn btn-primary">Nuevo Presupuesto</button>
      </div>
      <Table data={transformedBudget} columns={columns} />
    </div>
  );
}
