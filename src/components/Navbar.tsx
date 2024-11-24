
import { Bell, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-bold">Presupuesto Familiar</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6 cursor-pointer hover:text-indigo-200" />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
              <span className="hidden md:block">Familia Rodríguez</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}