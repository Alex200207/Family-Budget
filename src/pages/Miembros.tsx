import { Users } from "lucide-react";
import useUsers from "../hook/useUsers";

export const Miembros = () => {
  const { users } = useUsers();

  const estadisticas = [
    { titulo: "Miembros Familia", cantidad: `${users.length}`, icon: Users },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {estadisticas.map((stat) => (
        <div
          key={stat.titulo}
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{stat.titulo}</p>
              <p className="text-2xl font-semibold mt-1">{stat.cantidad}</p>
            </div>
            <div className="bg-indigo-50 p-3 rounded-lg">
              <stat.icon className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
