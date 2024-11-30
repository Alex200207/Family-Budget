
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex flex-col w-screen h-screen">
   
      <Navbar />
      <div className="flex flex-1 ">
      
        <Sidebar />
        <main className="flex-1 p-4 ">
            <div className="max-w-full mx-auto h-full">
            <Outlet />
            </div>
        </main>
      </div>
    </div>
  );
}
