import axios from 'axios';
import { useAuthStore } from '../store/auth.store';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api', // Aseguramos el prefijo /api
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para inyectar el token de Zustand
apiClient.interceptors.request.use(
    (config) => {
        // Obtenemos el token directamente del estado actual de Zustand
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor para manejar errores globales (ej: token expirado)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Si el backend dice que el token no sirve, deslogueamos
            useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    }
);

export default apiClient;