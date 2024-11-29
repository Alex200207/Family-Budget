import moment from "moment";
import "moment/locale/es";
import usePlan, { Plan } from "../hook/usePlan";
import { Table } from "../components/Table";
import useUsers from "../hook/useUsers";
import Modal from "../components/modal/CustomModal";
import { useState } from "react";
import FormAdd from "../components/modal/FormAdd";
import AddAmountModal from "../components/modal/AddAmountModal";
import FormEdit from "../components/modal/FormEdit";

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
  objetivo?: string;
}

export default function Planes() {
  const [isFormAddModalOpen, setIsFormAddModalOpen] = useState(false);
  const [isFormEditModalOpen, setIsFormEditModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanRow | null>(null);
  const [selectAmount, setSelectAmount] = useState<PlanRow | null>(null);
  const [isAddAmountModalOpen, setIsAddAmountModalOpen] = useState(false);

  const { plans, reloadData, deletePlans, incrementAmounts, editPlanData } =
    usePlan();
  const { users } = useUsers();

  const handleDelete = async (id: string) => {
    await deletePlans(id);
    reloadData();
  };

  const updateAmount = async (plan: PlanRow, amount: number) => {
    await incrementAmounts(plan.id.toString(), amount);
    reloadData();
  };

  const handleEditSave = async (updatedPlan: Plan) => {
    await editPlanData(updatedPlan.id, updatedPlan);
    reloadData();
    closeFormEditModal();
  };

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
        <div className="flex flex-col sm:flex-row sm:space-x-3">
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
    {
      header: "Acciones",
      accessor: "id",
      cell: (row: PlanRow) => (
        <div className="flex flex-col sm:flex-row sm:space-x-3">
          <button
            className="btn btn-secondary mb-2 sm:mb-0"
            onClick={() => openAddAmountModal(row)}
          >
            +
          </button>

          <button
            className="border border-red-600 rounded-sm px-2 py-1 text-red-600 hover:bg-red-600 hover:text-white mb-2 sm:mb-0"
            onClick={() => handleDelete(row.id.toString())}
          >
            Eliminar
          </button>
          <button
            className="border border-blue-600 rounded-sm px-2 py-1 text-blue-600 hover:bg-blue-600 hover:text-white"
            onClick={() => openFormEditModal(row)}
          >
            Editar
          </button>
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
    setIsFormAddModalOpen(true);
  };

  const closeFormAddModal = () => {
    setIsFormAddModalOpen(false);
  };

  const openFormEditModal = (plan: PlanRow) => {
    setSelectedPlan(plan);
    setIsFormEditModalOpen(true);
  };

  const closeFormEditModal = () => {
    setSelectedPlan(null);
    setIsFormEditModalOpen(false);
  };

  const openAddAmountModal = (plan: PlanRow) => {
    setSelectAmount(plan);
    setIsAddAmountModalOpen(true);
  };

  const closeAddAmountModal = () => {
    setSelectAmount(null);
    setIsAddAmountModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold mb-4 sm:mb-0">Planes Financieros</h1>
        <button className="btn btn-primary" onClick={openModal}>
          Nuevo Plan
        </button>
      </div>

      <div className="overflow-x-auto">
        <Table data={transformedPlans} columns={columns} />
      </div>

      <Modal isOpen={isFormAddModalOpen} onClose={closeFormAddModal}>
        <FormAdd onClose={closeFormAddModal} reloadData={reloadData} />
      </Modal>

      <Modal isOpen={isFormEditModalOpen} onClose={closeFormEditModal}>
        <FormEdit
          plan={selectedPlan ? { ...selectedPlan, objetivo: selectedPlan.objetivo || "" } : null}
          onClose={closeFormEditModal}
          onSave={handleEditSave}
        />
      </Modal>

      <AddAmountModal
        plan={selectAmount}
        reloadData={reloadData}
        onClose={closeAddAmountModal}
        isOpen={isAddAmountModalOpen}
        updateAmount={updateAmount}
      />
    </div>
  );
}
