import { Outlet } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin.js';

const DashboardLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-primary">
            <NavbarAdmin />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
