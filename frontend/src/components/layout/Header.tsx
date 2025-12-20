import { Link } from 'react-router-dom';
import { useAuth } from '../../core/hooks/useAuth';

const Header = () => {
    const { isAuthenticated } = useAuth();

    return (
        <header className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">
                    Star Wars App
                </Link>

                <nav>
                    <ul className="flex gap-6">
                        <li>
                            <Link to="/" className="hover:text-blue-300 transition-colors">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-blue-300 transition-colors">
                                Acerca de
                            </Link>
                        </li>
                        <li>
                            <Link to="/movies" className="hover:text-blue-300 transition-colors">
                                Películas
                            </Link>
                        </li>

                        {isAuthenticated ? (
                            <li>
                                <Link
                                    to="/dashboard"
                                    className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Dashboard
                                </Link>
                            </li>
                        ) : (
                            <li>
                                <Link
                                    to="/login"
                                    className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Iniciar Sesión
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;