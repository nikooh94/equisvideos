import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Configuración base
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Crear instancia de axios
const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 segundos timeout
});

// Interceptor para agregar token a las peticiones
apiClient.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = localStorage.getItem('token');

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar respuestas
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Si el error es 401 (No autorizado) y no es una solicitud de refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Intentar refrescar el token
                const refreshToken = localStorage.getItem('refreshToken');

                if (refreshToken) {
                    const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                        refresh_token: refreshToken
                    });

                    const newToken = data.access_token;
                    localStorage.setItem('token', newToken);

                    // Reintentar la solicitud original con el nuevo token
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return apiClient(originalRequest);
                }
            } catch (refreshError) {
                // Si el refresh falla, limpiar tokens y redirigir al login
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        // Para otros errores, propagar el error
        return Promise.reject(error);
    }
);

// Función para setear token manualmente (útil para login)
export const setAuthToken = (token: string): void => {
    localStorage.setItem('token', token);
};

// Función para limpiar token (útil para logout)
export const clearAuthToken = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
};

// Función para verificar si hay token
export const hasAuthToken = (): boolean => {
    return !!localStorage.getItem('token');
};

export default apiClient;