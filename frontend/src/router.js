import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Dashboard from './pages/Dashboard.js';
import DashboardLayout from './features/dashboard/DashboardLayout.js';
import TorneoDetails from './features/dashboard/Torneos/TorneoDetails.js';
import EquipoDetails from './features/dashboard/Equipos/EquipoDetails.js';
import ResultadoDetails from './features/dashboard/Partidos/ResultadoDetails.js';
import EquipoDetailsHome from './features/home/EquipoDetails.js';
import Navbar from './components/Navbar.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import Login from './components/Login.js';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navbar />}>
                    <Route index element={<Home />} /> {/* Ruta principal */}
                    <Route path="equipo/:id" element={<EquipoDetailsHome />} /> {/* Detalles del equipo */}
                </Route>
                <Route path="/login" element={<Login />} /> {/* Ruta de inicio de sesión */}
                {/* Rutas protegidas */}
                <Route path="/dashboard" element={<ProtectedRoute />}>
                    <Route element={<DashboardLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="torneo/:id" element={<TorneoDetails />} />
                        <Route path="resultado/:id" element={<ResultadoDetails />} />
                        <Route path="equipo/:id" element={<EquipoDetails />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
