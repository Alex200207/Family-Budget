import moment from "moment";
import "moment/locale/es";
import usePlan from "../hook/usePlan";
import { Table } from "../components/Table";
import useUsers from "../hook/useUsers";
import Modal from "../components/modal/Modal";
import { useState } from "react";
import FormAdd from "../components/modal/FormAdd";

interface PlanRow {
  id: number;
  titulo: string;
  descripcion: string;
  color: string;
  meta: number;
  actual: number;
  fecha: string;
  progreso: number;
  usuario_id: number;
}

export default function Planes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { plans } = usePlan();
  const { users } = useUsers();

  const columns = [
    {
      header: "Usuario",
      accessor: "usuario_id",
      cell: (row: PlanRow) => {
        return findUser(row.usuario_id);
      },
    },

    {
      header: "Objetivo",
      accessor: "titulo",
      cell: (row: PlanRow) => (
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-medium">{row.titulo}</div>
            <div className="text-sm text-gray-500">{row.descripcion}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Meta",
      accessor: "meta",
      cell: (row: PlanRow) => `$${row.meta.toLocaleString()}`,
    },
    {
      header: "Actual",
      accessor: "actual",
      cell: (row: PlanRow) => `$${row.actual.toLocaleString()}`,
    },
    {
      header: "Fecha Objetivo",
      accessor: "fecha",
      cell: (row: PlanRow) => moment(row.fecha).format("DD/MM/YYYY"),
    },
    {
      header: "Progreso",
      accessor: "progreso",
      cell: (row: PlanRow) => (
        <div className="space-y-1">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{ width: `${row.progreso}%` }}
            />
          </div>
          <div className="text-sm text-gray-500 text-right">
            {row.progreso}%
          </div>
        </div>
      ),
    },
  ];

  const findUser = (userID: number) => {
    const userData = users.find((u) => u.id === userID);
    return userData ? userData.nombres : "sin usuario";
  };

  const transformedPlans: PlanRow[] = plans.map((plan) => ({
    id: plan.id,
    titulo: plan.objetivo,
    descripcion: `${plan.descripcion} `,
    color: "bg-blue-500",
    icon: () => <div className="icon-placeholder" />,
    meta: plan.meta,
    actual: plan.actual,
    fecha: plan.fecha_limite ? plan.fecha_limite.toString() : "",
    progreso: Math.min(Math.round((plan.actual / plan.meta) * 100), 100),
    usuario_id: plan.usuario_id,
  }));

  const openModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Planes Financieros</h1>
        <button className="btn btn-primary" onClick={openModal}>
          Nuevo Plan
        </button>
      </div>

      <Table data={transformedPlans} columns={columns} />
      <Modal isOpen={isModalOpen} onClose={closeModal}>

        <FormAdd />
       
      </Modal>
    </div>
  );
}
