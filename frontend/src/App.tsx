import { BrowserRouter } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './core/store/auth.store';
import AppRoutes from './routes';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Configuración de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Componente de carga inicial
const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const { initialize, isLoading } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="text-center">
          <LoadingSpinner
            size="lg"
            color="text-white"
            showText={true}
            text="Inicializando aplicación..."
          />
          <p className="mt-4 text-gray-300 text-sm">
            Cargando configuración del universo Star Wars...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

// Componente App principal
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInitializer>
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900">
                <LoadingSpinner size="lg" color="text-white" showText={true} />
              </div>
            }
          >
            <AppRoutes />
          </Suspense>
        </BrowserRouter>
      </AppInitializer>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;