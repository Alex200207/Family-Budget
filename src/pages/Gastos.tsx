import { Table } from "../components/Table";
import useExpenses from "../hook/useExpenses";
import { Gasto } from "../types";
import useUsers from "../hook/useUsers";
import useBudgets from "../hook/useBudget";
import CustomModal from "../components/modal/CustomModal";
import FormAddExpense from "../components/modal/Expenses/FormAddExpense";
import { useState } from "react";

interface ExpenseRow {
  id: number;
  presupuesto_id: number;
  tipo: string;
  usuario_id: number;
  monto: number;
  estado: number; // 1: Pagado, 0: Pendiente
  fecha?: Date;
  deuda?: number;
}

export default function Gastos() {
  const { expense, reloadData } = useExpenses();
  const { users } = useUsers();
  const { budget, reloadBudget } = useBudgets();
  const [isFormAddModalOpen, setIsFormAddModalOpen] = useState(false);

  const findUser = (id: number) => {
    const user = users.find((user) => user.id === id);
    return user ? user.nombres : "Usuario no encontrado";
  };

  const findBudget = (id: number) => {
    const presupuesto = budget.find((budget) => budget.id === id);
    return presupuesto ? presupuesto.limite : 0;
  };

  const openModal = () => {
    setIsFormAddModalOpen(true);
  };

  const closeFormAddModal = () => {
    setIsFormAddModalOpen(false);
  };

  const openAmountExpense = (row: ExpenseRow) => {
    console.log("Row:", row);
  };

  const transformedExpense: Gasto[] = expense.map((expense) => ({
    id: expense.id,
    presupuesto_id: expense.presupuesto_id,
    tipo: expense.tipo,
    usuario_id: expense.usuario_id,
    monto: expense.monto,
    estado: expense.estado,
    fecha: expense.fecha,
    deuda: expense.deuda,
  }));

  const columns = [
    {
      header: "Usuario",
      accessor: "usuario_id",
      cell: (row: ExpenseRow) => findUser(row.usuario_id),
    },
    {
      header: "Presupuesto",
      accessor: "presupuesto_id",
      cell: (row: ExpenseRow) => {
        const presupuestoLimite = findBudget(row.presupuesto_id);
        const presupuestoMostrar = presupuestoLimite < 0 ? 0 : presupuestoLimite;
        return `$${presupuestoMostrar.toFixed(2)}`;
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
      header: "Gasto",
      accessor: "monto",
      cell: (row: ExpenseRow) => (
        <span className="font-semibold text-red-500">
          ${Math.abs(row.monto).toFixed(2)}
        </span>
      ),
    },
    {
      header: "Estado",
      accessor: "estado",
      cell: (row: ExpenseRow) => {
        let estadoText = "Pendiente";
        let estadoColor = "bg-red-500";
        if (row.estado === 1) {
          estadoText = "Pagado";
          estadoColor = "bg-green-500";
        } else if (row.estado === 2) {
          estadoText = "En Proceso"; 
          estadoColor = "bg-yellow-500";
        }
        return (
          <span className={`px-2 py-1 rounded-full ${estadoColor} text-white`}>
            {estadoText}
          </span>
        );
      },
    },
    {
      header: "Deuda",
      accessor: "deuda",
      cell: (row: ExpenseRow) => (
        <span className="font-semibold text-red-500">
          ${Math.abs(row.deuda ?? 0).toFixed(2)}
        </span>
      ),
    },
    {
      header: "Fecha",
      accessor: "fecha",
      cell: (row: ExpenseRow) => {
        return row.fecha ? new Date(row.fecha).toLocaleDateString() : "-";
      },
    },
    {
      header: "Acciones",
      accessor: "acciones",
      cell: (row: ExpenseRow) => (
        <div className="flex items-center space-x-3">
          <button
            className="btn btn-secondary"
            onClick={() => openAmountExpense(row)}
          >
            +
          </button>
          <button className="border border-red-600 rounded-sm px-2 py-1 text-red-600 hover:bg-red-600 hover:text-white">
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:space-x-6">
        <h1 className="text-2xl font-semibold">Gastos</h1>
        <button className="btn btn-primary" onClick={openModal}>
          Nuevo Gasto
        </button>
      </div>
      <div className="overflow-x-auto">
        <Table data={transformedExpense} columns={columns} />
      </div>

      {/* Modal para agregar nuevo gasto */}
      <CustomModal isOpen={isFormAddModalOpen} onClose={closeFormAddModal}>
        <FormAddExpense
          onClose={closeFormAddModal}
          reloadData={reloadData}
          reloadBudget={reloadBudget}
        />
      </CustomModal>
    </div>
  );
}
