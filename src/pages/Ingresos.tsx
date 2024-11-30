import { Table } from "../components/Table";
import useIncome from "../hook/useIncome";
import moment from "moment";
import useUsers from "../hook/useUsers";

interface IncomeRow {
  id: number;
  fecha?: Date;
  monto: number;
  usuario_id: number;
  origen: string;
}

export default function Ingresos() {
  const { income } = useIncome();
  const { users } = useUsers();
  const transformedIncome: IncomeRow[] = income.map((i) => ({
    id: i.id,
    fecha: i.fecha,
    monto: i.monto,
    usuario_id: i.usuario_id,
    origen: i.origen,
  }));

  const getDate = (date: Date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const findUser = (id: number) => {
    const user = users.find((user) => user.id === id);
    return user ? user.nombres : "Usuario no encontrado";
  };

  const columns = [
    {
      header: "Usuario",
      accessor: "usuario_id",
      cell: (row: IncomeRow) => findUser(row.usuario_id),
    },
    {
      header: "Fecha",
      accessor: "fecha",
      cell: (row: IncomeRow) => (
        <span>{row.fecha ? getDate(row.fecha) : "N/A"}</span>
      ),
    },
    {
      header: "Monto",
      accessor: "monto",
      cell: (row: IncomeRow) => (
        <div className="flex items-center space-x-3">
          <span>${row.monto}</span>
        </div>
      ),
    },
    {
      header: "Origen",
      accessor: "origen",
      cell: (row: IncomeRow) => (
        <div className="flex items-center space-x-3">
          <span>{row.origen}</span>
        </div>
      ),
    },

    {
      header: "Acciones",
      accessor: "acciones",
      cell: (row: IncomeRow) => (
        <div className="flex justify-between">
          <button className="btn btn-secondary" onClick={() => row}>
            +
          </button>
          <button className="border border-red-600 rounded-sm px-2 py-1 text-red-600 hover:bg-red-600 hover:text-white">
            Eliminar
          </button>

          <button className="border border-blue-600 rounded-sm px-2 py-1 text-blue-600 hover:bg-blue-600 hover:text-white">
            Editar
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:space-x-6">
        <h1 className="text-2xl font-semibold">Ingresos</h1>
        <button className="btn btn-primary">Nuevo Ingreso</button>
      </div>
      <div className="overflow-x-auto">
        <Table data={transformedIncome} columns={columns} />
      </div>
    </div>
  );
}
