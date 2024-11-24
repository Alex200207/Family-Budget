
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, PieChart, Target } from 'lucide-react';

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/gastos', icon: Receipt, label: 'Gastos' },
  { to: '/presupuestos', icon: PieChart, label: 'Presupuestos' },
  { to: '/planes', icon: Target, label: 'Planes' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white h-[calc(100vh-4rem)] shadow-sm">
      <nav className="p-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <link.icon className="h-5 w-5" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}