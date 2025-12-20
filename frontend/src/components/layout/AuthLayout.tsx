import { Outlet } from 'react-router-dom';
import { Star } from 'lucide-react';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex">
            {/* Sidebar decorativa */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-800 to-purple-900 p-12 flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <Star className="text-yellow-400" size={32} />
                        <h1 className="text-3xl font-bold text-white">Star Wars</h1>
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Bienvenido al Universo
                    </h2>
                    <p className="text-gray-300 text-lg">
                        Explora películas, personajes y planetas de la galaxia más famosa.
                    </p>
                </div>
                <div className="text-gray-300">
                    <p>"Que la fuerza te acompañe"</p>
                </div>
            </div>

            {/* Área de formulario */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8 lg:hidden">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Star className="text-yellow-400" size={32} />
                            <h1 className="text-3xl font-bold text-white">Star Wars App</h1>
                        </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;