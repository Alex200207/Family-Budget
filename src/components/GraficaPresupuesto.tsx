import { Link } from "react-router-dom";
import useBudget from "../hook/useBudget";
import useExpenses from "../hook/useExpenses";
import { Gasto, Presupuesto } from "../types";

export default function GraficaPresupuesto() {
  const { budget } = useBudget();
  const { expense } = useExpenses();

  const categoryColors: Record<string, string> = {
    Housing: "bg-blue-500",
    Food: "bg-green-500",
    Transportation: "bg-yellow-500",
    Entertainment: "bg-purple-500",
    Healthcare: "bg-red-500",
  };

  const displayedBudgets = budget.slice(0, 3);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Presupuesto</h2>
        <button className="text-indigo-600 hover:text-indigo-700 font-medium">
          <Link to="/presupuestos">Ver Todos</Link>
        </button>
      </div>

      {displayedBudgets && displayedBudgets.length > 0 ? (
        <div className="space-y-4">
          {displayedBudgets.map((b: Presupuesto) => {
            const totalSpent = expense
              .filter((e: Gasto) => e.presupuesto_id === b.id)
              .reduce((acc, e) => acc + e.monto, 0);

            const percentageUsed = Math.min(100, (totalSpent / b.limite) * 100);

            const color = categoryColors[b.categoria] || "bg-gray-500";

            return (
              <div key={b.id} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{b.categoria}</span>
                  <span className="text-sm text-gray-500">
                    {percentageUsed.toFixed(2)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${color} transition-all duration-500`}
                    style={{ width: `${percentageUsed}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">Sin presupuestos disponibles.</p>
      )}
    </div>
  );
}
