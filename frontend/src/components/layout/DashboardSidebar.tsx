import { Link, useLocation } from 'react-router-dom';
import { Home, Film, User, Settings } from 'lucide-react';

const DashboardSidebar = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: <Home size={20} /> },
        { path: '/movies', label: 'Películas', icon: <Film size={20} /> },
        { path: '/profile', label: 'Perfil', icon: <User size={20} /> },
        { path: '/settings', label: 'Configuración', icon: <Settings size={20} /> },
    ];

    return (
        <aside className="w-64 bg-gray-900 text-white min-h-screen">
            <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold">Star Wars App</h2>
                <p className="text-gray-400 text-sm mt-1">Dashboard</p>
            </div>
            <nav className="mt-6">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 py-3 px-6 transition-colors ${isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'hover:bg-gray-800 text-gray-300'
                                }`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default DashboardSidebar;