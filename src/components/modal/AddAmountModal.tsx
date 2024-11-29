import React, { useState } from "react";

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

interface AddAmountModalProps {
  plan: PlanRow | null;
  onClose: () => void;
  isOpen: boolean;
  updateAmount: (plan: PlanRow, amount: number) => Promise<void>;
  reloadData: () => void;
}

const AddAmountModal: React.FC<AddAmountModalProps> = ({
  plan,
  onClose,
  updateAmount,
  reloadData,
}) => {
  const [amount, setAmount] = useState<number>(0);

  if (!plan) return null;

  const isExceedingGoal = plan.actual + amount > plan.meta;

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
        

        {isExceedingGoal && (
          <p className="text-red-600 text-sm mt-2">
            El monto total excede la meta de {plan.meta}.
          </p>
        )}

        <div className="mt-6 flex justify-end space-x-3">
          <button
            className="px-4 py-2 text-slate-100 bg-red-600 rounded-lg hover:bg-red-800"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className={`px-4 py-2 text-white rounded-lg ${
              isExceedingGoal
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            disabled={isExceedingGoal}
            onClick={async () => {
              if (!isExceedingGoal) {
                await updateAmount(plan, amount);
                reloadData();
                onClose();
              }
            }}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAmountModal;
