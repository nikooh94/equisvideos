import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-800">404</h1>
                <h2 className="text-2xl font-semibold text-gray-600 mt-4">Página no encontrada</h2>
                <p className="text-gray-500 mt-2">Lo sentimos, la página que buscas no existe.</p>
                <Link
                    to="/"
                    className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
};

export default NotFound;