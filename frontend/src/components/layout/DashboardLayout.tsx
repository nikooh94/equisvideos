import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../layout/DashboardSidebar';
import DashboardHeader from '../layout/DashboardHeader';

const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader />
            <div className="flex">
                <DashboardSidebar />
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;