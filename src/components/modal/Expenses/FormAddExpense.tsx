import { useState } from "react";
import useExpenses from "../../../hook/useExpenses";
import { Gasto } from "../../../types/index";
import useBudgets from "../../../hook/useBudget";
import useUsers from "../../../hook/useUsers";

interface FFormAddExpenseProps {
  onClose: () => void;
  reloadData: () => void;
  reloadBudget: () => void;
}

const FormAddExpense: React.FC<FFormAddExpenseProps> = ({
  onClose,
  reloadData,
  reloadBudget,
}) => {
  const { createNewExpense} = useExpenses();
  const { budget } = useBudgets();
  const { users } = useUsers();

  const [formData, setFormData] = useState<Gasto>({
    id: 0,
    presupuesto_id: 0,
    tipo: "",
    usuario_id: 0,
    monto: 0,
    estado: 0,
    fecha: new Date(),
  });

  // Filtrar presupuestos en base al usuario seleccionado
  const filteredBudgets = formData.usuario_id
    ? budget.filter((b) => b.usuario_id === formData.usuario_id) // Verifica si el presupuesto está asociado al usuario seleccionado
    : [];

  console.log("Filtered Budgets:", filteredBudgets); // Verifica si los presupuestos se están filtrando correctamente

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Actualizar el estado con los valores correctos
    if (name === "fecha") {
      setFormData((prevValues) => ({
        ...prevValues,
        [name]: new Date(value),
      }));
    } else {
      setFormData((prevValues) => ({
        ...prevValues,
        [name]:
          name === "monto" || name === "usuario_id" || name === "presupuesto_id"
            ? Number(value) // Asegúrate de convertir estos campos a número
            : value,
      }));
    }
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    await createNewExpense(formData);
    reloadData();
    reloadBudget();
    onClose();
  };

  return (
    <form onSubmit={handleAddExpense} className="space-y-6">
      <div className="mb-4">
        <label
          htmlFor="usuario_id"
          className="block text-sm font-medium text-gray-700"
        >
          Usuario
        </label>
        <select
          name="usuario_id"
          value={formData.usuario_id}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Selecciona un usuario</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.nombres}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="presupuesto_id"
          className="block text-sm font-medium text-gray-700"
        >
          Presupuesto
        </label>
        <select
          name="presupuesto_id"
          value={formData.presupuesto_id}
          onChange={handleInputChange}
          disabled={!formData.usuario_id}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Selecciona un presupuesto</option>
          {filteredBudgets.map((b) => (
            <option key={b.id} value={b.id}>
              {b.limite} {/* Muestra el limite del presupuesto, puedes cambiarlo por otro campo si es necesario */}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="tipo"
          className="block text-sm font-medium text-gray-700"
        >
          Categoría
        </label>
        <input
          type="text"
          name="tipo"
          id="tipo"
          placeholder="Ej. Transporte, Alimentación"
          value={formData.tipo}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="monto"
          className="block text-sm font-medium text-gray-700"
        >
          Monto
        </label>
        <input
          type="number"
          name="monto"
          id="monto"
          placeholder="Monto del gasto"
          value={formData.monto}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Guardar Gasto
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 mt-2"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormAddExpense;
