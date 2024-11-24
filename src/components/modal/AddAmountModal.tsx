import React, { useState } from "react";

interface PlanRow {
  id: number;
  titulo: string;
}

interface AddAmountModalProps {
  plan: PlanRow | null;
  onClose: () => void;
  isOpen: boolean;
  onSave: (id: number, amount: number) => void;
}

const AddAmountModal: React.FC<AddAmountModalProps> = ({ plan, onClose, onSave }) => {
  const [amount, setAmount] = useState<number>(0);

  if (!plan) return null;

  const handleSave = () => {
    onSave(plan.id, amount);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-800">Agregar Monto</h2>
        <p className="mt-2 text-gray-600">
          Agrega un monto al plan: <strong>{plan.titulo}</strong>
        </p>
        <input
          type="number"
          className="mt-4 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <div className="mt-6 flex justify-end space-x-3">
          <button
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            onClick={handleSave}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAmountModal;
