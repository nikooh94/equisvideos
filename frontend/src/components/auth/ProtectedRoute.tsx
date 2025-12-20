import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../core/hooks/useAuth';
import LoadingSpinner from '../ui/LoadingSpinner';

interface ProtectedRouteProps {
    children: ReactNode;
    requiredRoles?: string[];
}

const ProtectedRoute = ({ children, requiredRoles = [] }: ProtectedRouteProps) => {
    const location = useLocation();
    const { isAuthenticated, isLoading, user } = useAuth();

    // Mostrar loading mientras se verifica autenticación
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner
                    size="lg"
                    showText={true}
                    text="Verificando permisos..."
                />
            </div>
        );
    }

    // Redirigir al login si no está autenticado
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                state={{
                    from: location,
                    message: 'Por favor inicia sesión para acceder a esta página'
                }}
                replace
            />
        );
    }

    // Verificar roles si se especifican
    const hasRequiredRole = requiredRoles.length === 0 ||
        (user && requiredRoles.includes(user.role));

    if (!hasRequiredRole) {
        return (
            <Navigate
                to="/dashboard"
                state={{
                    message: 'No tienes permisos para acceder a esta página'
                }}
                replace
            />
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;