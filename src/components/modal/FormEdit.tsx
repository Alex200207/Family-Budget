import React, { useEffect, useState } from "react";
import { Plan } from "../../hook/usePlan";
import useUsers from "../../hook/useUsers";

interface FormEditProps {
  plan: Plan | null;
  onClose: () => void;
  onSave: (updatedPlan: Plan) => void;
}

const FormEdit: React.FC<FormEditProps> = ({ plan, onClose, onSave }) => {
  const { users } = useUsers();
  const [formData, setFormData] = useState<Plan>(
    plan || {
      id: 0,
      objetivo: "",
      meta: 0,
      actual: 0,
      usuario_id: 0,
      descripcion: "",
      fecha_limite: new Date(),
    }
  );

  useEffect(() => {
    if (plan) {
      setFormData(plan);
    }
  }, [plan]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "meta" || name === "actual" || name === "usuario_id"
          ? Number(value)
          : value,
    }));
  };



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData); // Llamar a onSave con los datos editados
    onClose();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center custom-z bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-5">
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Editar Plan
        </h2>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Objetivo
            </label>
            <input
              type="text"
              name="objetivo"
              value={formData.objetivo}
              onChange={handleChange}
              placeholder="Nuevo Objetivo"
              className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Descripción del plan"
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
              value={formData.actual}
              onChange={handleChange}
              placeholder="Cantidad actual"
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
              value={formData.meta}
              onChange={handleChange}
              placeholder="Meta del plan"
              className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <select
              name="usuario_id"
              value={formData.usuario_id}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecciona un usuario</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.nombres} {user.apellidos}
                </option>
              ))}
            </select>
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

export default FormEdit;
