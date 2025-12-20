import { LogOut, Bell, Search } from 'lucide-react';
import { useAuth } from '../../core/hooks/useAuth';

const DashboardHeader = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white shadow-sm border-b">
            <div className="flex justify-between items-center px-6 py-4">
                <div className="flex-1">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full relative">
                        <Bell size={20} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="font-medium">{user?.email}</p>
                            <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
                        </div>
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-blue-600">
                                {user?.email?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <button
                            onClick={logout}
                            className="p-2 hover:bg-gray-100 rounded-full text-gray-600"
                            title="Cerrar sesión"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;