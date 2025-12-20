import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@api': path.resolve(__dirname, './src/api'),
            '@core': path.resolve(__dirname, './src/core'),
            '@pages': path.resolve(__dirname, './src/pages'),
        }
    },
    server: {
        port: 5173, // Vite usa 5173 por defecto
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false,
            }
        }
    },
    build: {
        outDir: 'dist',
        sourcemap: true
    }
})