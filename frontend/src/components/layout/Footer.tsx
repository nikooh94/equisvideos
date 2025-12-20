const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Star Wars App</h3>
                        <p className="text-gray-400">
                            Explora el universo de Star Wars con información detallada de personajes, películas y más.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/" className="hover:text-white transition-colors">Inicio</a></li>
                            <li><a href="/movies" className="hover:text-white transition-colors">Películas</a></li>
                            <li><a href="/about" className="hover:text-white transition-colors">Acerca de</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Contacto</h4>
                        <p className="text-gray-400">
                            ¿Tienes preguntas? Contáctanos en info@starwarsapp.com
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
                    <p>© {new Date().getFullYear()} Star Wars App. Todos los derechos reservados.</p>
                    <p className="text-sm mt-2">Esta aplicación no está afiliada con Disney/Lucasfilm.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;