import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../core/hooks/useAuth';
import LoadingSpinner from '../ui/LoadingSpinner';

interface AuthGuardProps {
    children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
    const location = useLocation();
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="md" />
            </div>
        );
    }

    if (isAuthenticated) {
        const from = (location.state as any)?.from?.pathname || '/dashboard';
        return <Navigate to={from} replace />;
    }

    return <>{children}</>;
};

export default AuthGuard;