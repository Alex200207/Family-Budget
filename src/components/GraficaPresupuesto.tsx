import useBudget from "../hook/useBudget";

export interface Presupuesto {
  id: number;
  categoria: string;
  fecha_inicio?: Date;
  fecha_fin?: Date;
  limite: number;
  usuario_id: number;
}

export default function GraficaPresupuesto() {
  const { budget } = useBudget();

  const categoryColors: Record<string, string> = {
    Housing: "bg-blue-500",
    Food: "bg-green-500",
    Transportation: "bg-yellow-500",
    Entertainment: "bg-purple-500",
    Healthcare: "bg-red-500",
  };

  // Limitar a los primeros tres presupuestos
  const displayedBudgets = budget.slice(0, 3);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Presupuesto</h2>
      {displayedBudgets && displayedBudgets.length > 0 ? (
        <div className="space-y-4">
          {displayedBudgets.map((b: Presupuesto) => {
            const color = categoryColors[b.categoria] || "bg-gray-500";

            const percentageUsed = Math.min(
              100,
              parseFloat((Math.random() * 100).toFixed(0))
            );

            return (
              <div key={b.id} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{b.categoria}</span>
                  <span className="text-sm text-gray-500">
                    {percentageUsed}%
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
