import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../../api/auth.service';
import { LoginDto, RegisterDto, AuthResponse, User } from '../interfaces/auth.interface';

// Interfaz para datos de registro internos
interface InternalRegisterData {
    email: string;
    password: string;
    username?: string;
    role?: 'admin' | 'regular';
}

interface AuthState {
    // Estado
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Acciones
    login: (email: string, password: string) => Promise<void>;
    register: (data: InternalRegisterData) => Promise<void>;
    logout: () => void;
    initialize: () => Promise<void>;
    clearError: () => void;
    updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            // Estado inicial
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: true,
            error: null,

            // Inicializar aplicación
            initialize: async () => {
                try {
                    const token = localStorage.getItem('token');

                    if (!token) {
                        set({ isLoading: false });
                        return;
                    }

                    // Verificar token obteniendo el perfil del usuario
                    const user = await authService.getProfile();

                    set({
                        user,
                        token,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error) {
                    // Token inválido o expirado
                    console.error('Error verificando token:', error);
                    localStorage.removeItem('token');
                    set({
                        user: null,
                        token: null,
                        isAuthenticated: false,
                        isLoading: false,
                    });
                }
            },

            // Login
            login: async (email: string, password: string) => {
                set({ isLoading: true, error: null });

                try {
                    const loginData: LoginDto = { email, password };
                    const response = await authService.login(loginData);

                    // Asegurar que response tiene la estructura correcta
                    const authResponse = response as AuthResponse;

                    set({
                        user: authResponse.user,
                        token: authResponse.access_token,
                        isAuthenticated: true,
                        isLoading: false,
                    });

                    localStorage.setItem('token', authResponse.access_token);
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Error al iniciar sesión',
                        isLoading: false,
                        isAuthenticated: false,
                    });
                    throw error;
                }
            },

            // Registro
            register: async (data: InternalRegisterData) => {
                set({ isLoading: true, error: null });

                try {
                    // Convertir a RegisterDto
                    const registerData: RegisterDto = {
                        email: data.email,
                        password: data.password,
                        role: data.role || 'regular'
                    };

                    // Solo agregar username si existe
                    if (data.username) {
                        registerData.username = data.username;
                    }

                    await authService.register(registerData);

                    // Después de registrar, hacer login automático
                    const { login } = get();
                    await login(data.email, data.password);

                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Error al registrarse',
                        isLoading: false,
                        isAuthenticated: false,
                    });
                    throw error;
                }
            },

            // Logout
            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    isLoading: false,
                });

                localStorage.removeItem('token');
                localStorage.removeItem('sw-auth-storage');
            },

            // Actualizar usuario
            updateUser: (userData: Partial<User>) => {
                const currentUser = get().user;
                if (currentUser) {
                    set({
                        user: { ...currentUser, ...userData }
                    });
                }
            },

            // Limpiar errores
            clearError: () => set({ error: null }),
        }),
        {
            name: 'sw-auth-storage',
            partialize: (state) => ({
                user: state.user,
                token: state.token,
            }),
        }
    )
);