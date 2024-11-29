
export default function BudgetChart() {
  const categories = [
    { name: 'Housing', percentage: 75, color: 'bg-blue-500' },
    { name: 'Food', percentage: 60, color: 'bg-green-500' },
    { name: 'Transportation', percentage: 45, color: 'bg-yellow-500' },
    { name: 'Entertainment', percentage: 90, color: 'bg-purple-500' },
    { name: 'Healthcare', percentage: 30, color: 'bg-red-500' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Budget Overview</h2>
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.name} className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">{category.name}</span>
              <span className="text-sm text-gray-500">{category.percentage}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${category.color} transition-all duration-500`}
                style={{ width: `${category.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}