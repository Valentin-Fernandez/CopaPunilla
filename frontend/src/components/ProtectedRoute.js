import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthService from '../service/AuthService.js';

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await AuthService.checkAuth();
                if (response === true) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Cargando...</div>; // Muestra un indicador de carga mientras se verifica
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
