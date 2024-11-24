import moment from "moment";
import { Table } from "../components/Table";
import useExpenses from "../hook/useExpenses";
import { Gasto } from "../types";
import useUsers from "../hook/useUsers";
import useBudgets from "../hook/useBudget";


interface ExpenseRow {
  id: number;
  presupuesto_id: number;
  tipo:string;
  usuario_id: number;
  monto: number;
  estado:number;
  fecha?: Date;
}


export default function Gastos() {
  const { expense } = useExpenses();
  const {users} = useUsers();
  const {budget} = useBudgets();



  const findUser = (id: number) => {
    const user = users.find((user) => user.id === id);
    return user ? user.nombres : "Usuario no encontrado";
  };

  const findBudget = (id: number) => {
    const budgets = budget.find((budget) => budget.id === id);
    return budgets ? budgets.limite: "Presupuesto no encontrado";
  }



  const transformedExpense: Gasto[] = expense.map((expense) => ({
    id: expense.id,
    presupuesto_id: expense.presupuesto_id,
    tipo: expense.tipo,
    usuario_id: expense.usuario_id,
    monto: expense.monto,
    estado: expense.estado,
    fecha: expense.fecha,


  }));

  const columns = [
    {
      header: "Usuario",
      accessor: "usuario_id",
      cell: (row: ExpenseRow) => {
        return findUser(row.usuario_id);
      },
    },
  
    {
      header: "Presupuesto",
      accessor: "presupuesto_id",
      cell: (row: ExpenseRow) => {
        return findBudget(row.presupuesto_id);
      },
    },
    {
      
      header: "Categoría",
      accessor: "categoria",
      cell: (row: ExpenseRow) => (
        <div className="flex items-center space-x-3">
  
          <span>{row.tipo}</span>
        </div>
      ),
    },
    {
      header: "Monto",
      accessor: "monto",
      cell: (row: ExpenseRow) => (
        <span className="font-semibold text-red-500">
          ${Math.abs(row.monto).toFixed(2)}
        </span>
      ),
    },
    {
      header: "Fecha",
      accessor: "fecha",
      cell: (row: ExpenseRow) => moment(row.fecha).format("DD/MM/YYYY"),
    },
  ];




  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Gastos</h1>
        <button className="btn btn-primary">Nuevo Gasto</button>
      </div>
      <Table data={transformedExpense} columns={columns} />
    </div>
  );
}
