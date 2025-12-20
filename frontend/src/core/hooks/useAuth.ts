import { useAuthStore } from '../store/auth.store';

export const useAuth = () => {
    const {
        user,
        token,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
        register,
        initialize,
        clearError,
        updateUser,
    } = useAuthStore();

    return {
        // Estado
        user,
        token,
        isAuthenticated,
        isLoading,
        error,

        // Acciones
        login,
        logout,
        register,
        initialize,
        clearError,
        updateUser,

        // Helpers
        isAdmin: user?.role === 'admin',
        // Removido isGuest ya que no existe en tu User
        hasRole: (role: string) => user?.role === role,
    };
};