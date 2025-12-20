import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { useAuth } from '../core/hooks/useAuth';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import AuthGuard from '../components/auth/AuthGuard';
import MainLayout from '../components/layout/MainLayout';
import AuthLayout from '../components/layout/AuthLayout';
import DashboardLayout from '../components/layout/DashboardLayout';

// Lazy loading
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Dashboard = lazy(() => import('../pages/Dashboard'));

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            {/* Rutas de autenticación */}
            <Route
                element={
                    <AuthGuard>
                        <AuthLayout />
                    </AuthGuard>
                }
            >
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>

            {/* Rutas protegidas */}
            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* Rutas públicas */}
            <Route element={<MainLayout />}>
                <Route path="/about" element={<div>About Page</div>} />
            </Route>

            {/* Ruta raíz */}
            <Route
                path="/"
                element={
                    <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />
                }
            />

            {/* Ruta 404 */}
            <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center">
                    <h1 className="text-3xl font-bold">404 - Página no encontrada</h1>
                </div>
            } />
        </Routes>
    );
};

export default AppRoutes;