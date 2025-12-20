import apiClient from './api.client';
import {
    LoginDto,
    AuthResponse,
    RegisterDto,
    User
} from '../core/interfaces/auth.interface';

// Interfaz para respuesta de registro
interface RegisterResponse {
    message: string;
    user: User;
    access_token: string;
}

// Interfaz para respuesta de perfil
interface ProfileResponse {
    user: User;
}

// Interfaz para error estándar
interface ApiError {
    message: string;
    statusCode: number;
    errors?: Record<string, string[]>;
}

// Clase para manejar errores de autenticación
export class AuthError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public errors?: Record<string, string[]>
    ) {
        super(message);
        this.name = 'AuthError';
    }
}

export const authService = {
    /**
     * Iniciar sesión
     * @param credentials - Credenciales de login
     * @returns Promesa con la respuesta de autenticación
     * @throws AuthError - Si hay errores en la autenticación
     */
    login: async (credentials: LoginDto): Promise<AuthResponse> => {
        try {
            const { data } = await apiClient.post<AuthResponse>('/auth/login', credentials);

            // Validar respuesta
            if (!data.access_token || !data.user) {
                throw new AuthError('Respuesta de autenticación inválida');
            }

            return data;
        } catch (error: any) {
            if (error.response?.data) {
                const apiError: ApiError = error.response.data;
                throw new AuthError(
                    apiError.message || 'Error al iniciar sesión',
                    apiError.statusCode,
                    apiError.errors
                );
            }
            throw new AuthError('Error de conexión con el servidor');
        }
    },

    /**
     * Registrar nuevo usuario
     * @param userData - Datos del usuario a registrar
     * @returns Promesa con la respuesta de registro
     * @throws AuthError - Si hay errores en el registro
     */
    register: async (userData: RegisterDto): Promise<RegisterResponse> => {
        try {
            const { data } = await apiClient.post<RegisterResponse>('/users/register', userData);

            // Validar respuesta
            if (!data.access_token || !data.user) {
                throw new AuthError('Respuesta de registro inválida');
            }

            return data;
        } catch (error: any) {
            if (error.response?.data) {
                const apiError: ApiError = error.response.data;
                throw new AuthError(
                    apiError.message || 'Error al registrar usuario',
                    apiError.statusCode,
                    apiError.errors
                );
            }
            throw new AuthError('Error de conexión con el servidor');
        }
    },

    /**
     * Obtener perfil del usuario autenticado
     * @returns Promesa con los datos del perfil
     * @throws AuthError - Si no está autenticado o hay error
     */
    getProfile: async (): Promise<User> => {
        try {
            const { data } = await apiClient.get<ProfileResponse>('/auth/profile');

            if (!data.user) {
                throw new AuthError('Perfil no encontrado');
            }

            return data.user;
        } catch (error: any) {
            if (error.response?.status === 401) {
                throw new AuthError('Sesión expirada. Por favor, vuelve a iniciar sesión.', 401);
            }

            if (error.response?.data) {
                const apiError: ApiError = error.response.data;
                throw new AuthError(
                    apiError.message || 'Error al obtener perfil',
                    apiError.statusCode
                );
            }
            throw new AuthError('Error de conexión con el servidor');
        }
    },

    /**
     * Refrescar token de acceso
     * @returns Nuevo token de acceso
     * @throws AuthError - Si no se puede refrescar
     */
    refreshToken: async (): Promise<{ access_token: string }> => {
        try {
            const { data } = await apiClient.post<{ access_token: string }>('/auth/refresh');
            return data;
        } catch (error: any) {
            throw new AuthError('No se pudo refrescar la sesión', 401);
        }
    },

    /**
     * Cerrar sesión
     * @returns Promesa vacía
     */
    logout: async (): Promise<void> => {
        try {
            await apiClient.post('/auth/logout');
        } catch (error) {
            // No importa si falla el logout en el servidor,
            // igual limpiamos el token localmente
            console.warn('Error al cerrar sesión en el servidor:', error);
        }
    },

    /**
     * Verificar si el token es válido
     * @returns Promesa con estado de validez
     */
    verifyToken: async (token: string): Promise<User> => {
        try {
            // Podrías implementar una ruta específica para verificación
            // o simplemente usar getProfile que validará el token
            return await authService.getProfile();
        } catch (error: any) {
            if (error instanceof AuthError) {
                throw error;
            }
            throw new AuthError('Token inválido o expirado');
        }
    },

    /**
     * Solicitar restablecimiento de contraseña
     * @param email - Email del usuario
     * @returns Promesa con mensaje de confirmación
     */
    requestPasswordReset: async (email: string): Promise<{ message: string }> => {
        try {
            const { data } = await apiClient.post<{ message: string }>('/auth/forgot-password', { email });
            return data;
        } catch (error: any) {
            if (error.response?.data) {
                const apiError: ApiError = error.response.data;
                throw new AuthError(
                    apiError.message || 'Error al solicitar restablecimiento',
                    apiError.statusCode
                );
            }
            throw new AuthError('Error de conexión con el servidor');
        }
    },

    /**
     * Restablecer contraseña
     * @param token - Token de restablecimiento
     * @param password - Nueva contraseña
     * @returns Promesa con mensaje de éxito
     */
    resetPassword: async (
        token: string,
        password: string
    ): Promise<{ message: string }> => {
        try {
            const { data } = await apiClient.post<{ message: string }>(
                '/auth/reset-password',
                { token, password }
            );
            return data;
        } catch (error: any) {
            if (error.response?.data) {
                const apiError: ApiError = error.response.data;
                throw new AuthError(
                    apiError.message || 'Error al restablecer contraseña',
                    apiError.statusCode
                );
            }
            throw new AuthError('Error de conexión con el servidor');
        }
    },

    /**
     * Actualizar perfil de usuario
     * @param userData - Datos a actualizar
     * @returns Promesa con usuario actualizado
     */
    updateProfile: async (userData: Partial<User>): Promise<User> => {
        try {
            const { data } = await apiClient.put<ProfileResponse>('/auth/profile', userData);
            return data.user;
        } catch (error: any) {
            if (error.response?.data) {
                const apiError: ApiError = error.response.data;
                throw new AuthError(
                    apiError.message || 'Error al actualizar perfil',
                    apiError.statusCode,
                    apiError.errors
                );
            }
            throw new AuthError('Error de conexión con el servidor');
        }
    }
};

// Exportar el tipo de error para uso externo
export type { AuthError };