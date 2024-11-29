import React, { useState } from "react";
import usePlan, { Plan } from "../../hook/usePlan";
import useUsers from "../../hook/useUsers";

interface FormAddProps {
  onClose: () => void;
  reloadData: () => void;
}

const Form: React.FC<FormAddProps> = ({ onClose, reloadData }) => {
  const { createNewPlan } = usePlan();
  const { users } = useUsers();

  const [formValues, setFormValues] = useState<Plan>({
    id: 0,
    fecha_limite: new Date(),
    objetivo: "",
    actual: 0,
    meta: 0,
    usuario_id: 0,
    descripcion: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Si el campo es fecha, convertir el valor a un objeto Date
    if (name === "fecha_limite") {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: new Date(value),
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]:
          name === "monto" ||
          name === "meta" ||
          name === "actual" ||
          name === "usuario_id"
            ? Number(value)
            : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createNewPlan(formValues);
    reloadData();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center custom-z bg-black bg-opacity-50 ">
      <div className="bg-white rounded-lg shadow-lg p-5 ">
        <h2 className="text-xl font-semibold text-gray-800 text-center">Agregar Plan</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Objetivo
            </label>
            <input
              type="text"
              name="objetivo"
              value={formValues.objetivo}
              onChange={handleInputChange}
              placeholder="Objetivo del plan"
              className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Meta
            </label>
            <input
              type="number"
              name="meta"
              value={formValues.meta}
              onChange={handleInputChange}
              placeholder="Meta del plan"
              className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Actual
            </label>
            <input
              type="number"
              name="actual"
              value={formValues.actual}
              onChange={handleInputChange}
              placeholder="Monto actual"
              className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Usuario ID
            </label>
            <select
              name="usuario_id"
              value={formValues.usuario_id}
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha Límite
            </label>
            <input
              type="date"
              name="fecha_limite"
              value={
                formValues.fecha_limite
                  ? formValues.fecha_limite.toISOString().split("T")[0]
                  : ""
              }
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={formValues.descripcion}
              onChange={handleInputChange}
              placeholder="Descripción del plan"
              className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>
          <div className="flex justify-between col-span-1 md:col-span-2 mt-6">
            <button
              type="submit"
              className="flex items-center border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-md transition hover:bg-blue-500 hover:text-white"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center border-2 border-red-500 text-red-500 px-4 py-2 rounded-md transition hover:bg-red-500 hover:text-white"
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
