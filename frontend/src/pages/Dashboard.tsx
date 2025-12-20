import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MovieCard } from '@components/movies/MovieCard'
import { DashboardShell } from '@components/layout/DashboardShell'
import { useMovies } from '@api/useMovies'
import { InteractiveStats } from '@components/ui/InteractiveStats'
import { AnimatedSearch } from '@components/ui/AnimatedSearch'
import {
    Film,
    Zap,
    Sparkles,
    Search,
    Filter,
    ChevronRight,
    Trash2,
    ShieldCheck,
    Star
} from 'lucide-react'

// --- Configuración Galáctica ---
const STAR_COUNT = 40;
const EPISODES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function Dashboard() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null)
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [showFilters, setShowFilters] = useState(false)

    const {
        movies,
        isLoading,
        error,
        deleteMovie,
        refetch
    } = useMovies({
        search: searchTerm,
        episode: selectedEpisode || undefined
    })

    // Stats interactivos
    const statsData = [
        {
            id: 1,
            number: "9",
            label: "Películas",
            color: "from-blue-500 to-cyan-500",
            icon: "🎬",
            description: "Saga completa de la trilogía original, precuelas y secuelas"
        },
        {
            id: 2,
            number: "200+",
            label: "Personajes",
            color: "from-purple-500 to-pink-500",
            icon: "👥",
            description: "Héroes, villanos y personajes memorables de toda la galaxia"
        },
        {
            id: 3,
            number: "50+",
            label: "Naves",
            color: "from-green-500 to-emerald-500",
            icon: "🚀",
            description: "Naves espaciales icónicas desde el Halcón Milenario"
        },
        {
            id: 4,
            number: "60+",
            label: "Planetas",
            color: "from-orange-500 to-red-500",
            icon: "🪐",
            description: "Mundos diversos desde Tatooine hasta Coruscant"
        }
    ]

    const handleDeleteMovie = async (id: number) => {
        const success = await deleteMovie(id)
        if (success) {
            // Mostrar toast de éxito (implementar después)
            console.log('Película eliminada')
        }
    }

    // Efecto para animación de partículas
    useEffect(() => {
        const createStar = () => {
            const star = document.createElement('div')
            star.className = 'absolute w-1 h-1 bg-yellow-400 rounded-full opacity-30'
            star.style.left = `${Math.random() * 100}%`
            star.style.top = `${Math.random() * 100}%`
            document.getElementById('hero-stars')?.appendChild(star)

            // Animación
            star.animate([
                { opacity: 0.3, transform: 'scale(1)' },
                { opacity: 1, transform: 'scale(1.5)' },
                { opacity: 0.3, transform: 'scale(1)' }
            ], {
                duration: Math.random() * 2000 + 1000,
                iterations: Infinity
            })
        }

        // Crear estrellas
        for (let i = 0; i < 50; i++) {
            setTimeout(createStar, i * 100)
        }
    }, [])

    if (error) {
        return (
            <DashboardShell>
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">❌</div>
                    <h2 className="text-2xl font-bold text-red-400 mb-2">Error de conexión</h2>
                    <p className="text-gray-400 mb-4">{error}</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => refetch()}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all"
                    >
                        Reintentar conexión
                    </motion.button>
                </div>
            </DashboardShell>
        )
    }

    return (
        <DashboardShell>
            {/* Header Hero con efectos especiales */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 py-24 px-6 rounded-3xl mb-12"
            >
                {/* Fondo con estrellas animadas */}
                <div id="hero-stars" className="absolute inset-0 overflow-hidden" />

                {/* Efecto de luz */}
                <motion.div
                    animate={{
                        x: ['0%', '100%', '0%'],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent"
                />

                <div className="container mx-auto max-w-7xl relative z-10 text-center">
                    {/* Badge animado */}
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border-2 border-yellow-500/30 text-yellow-300 px-8 py-4 rounded-2xl text-xl font-bold mb-10 backdrop-blur-xl shadow-2xl"
                    >
                        <Sparkles className="animate-pulse" />
                        <span className="tracking-widest">GALACTIC DATABANK</span>
                        <Sparkles className="animate-pulse" />
                    </motion.div>

                    {/* Título principal con efectos */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, type: "spring" }}
                        className="relative"
                    >
                        <h1 className="text-7xl md:text-9xl font-bold mb-8 tracking-tighter"
                            style={{
                                background: 'linear-gradient(135deg, #FFE81F 0%, #FF6B00 50%, #FFE81F 100%)',
                                backgroundSize: '200% auto',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                animation: 'shimmer 3s linear infinite'
                            }}
                        >
                            STAR WARS
                            <br />
                            <span className="text-5xl md:text-7xl">ARCHIVE</span>
                        </h1>

                        {/* Efecto de brillo */}
                        <motion.div
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent blur-xl opacity-50"
                            style={{ backgroundSize: '200% 100%' }}
                        />
                    </motion.div>

                    {/* Subtítulo */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-2xl md:text-3xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light"
                    >
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-bold">
                            Acceso exclusivo
                        </span>{' '}
                        a los registros históricos de películas y eventos de la galaxia.
                        <br />
                        <span className="text-lg text-gray-400 mt-2 block">
                            Datos verificados por la Orden Jedi • Actualización en tiempo real
                        </span>
                    </motion.p>

                    {/* Stats Interactivos */}
                    <InteractiveStats stats={statsData} />

                    {/* Botón de exploración */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-16"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                                boxShadow: [
                                    '0 10px 30px rgba(255, 232, 31, 0.3)',
                                    '0 20px 50px rgba(255, 232, 31, 0.5)',
                                    '0 10px 30px rgba(255, 232, 31, 0.3)'
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="group px-10 py-5 bg-gradient-to-r from-yellow-600 via-orange-600 to-yellow-600 text-white text-xl font-bold rounded-2xl flex items-center gap-4 mx-auto hover:from-yellow-500 hover:via-orange-500 hover:to-yellow-500 transition-all"
                            style={{ backgroundSize: '200% auto' }}
                        >
                            <Zap className="group-hover:animate-spin" />
                            EXPLORAR ARCHIVOS
                            <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                        </motion.button>
                    </motion.div>
                </div>
            </motion.section>

            {/* Panel de control interactivo */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <div className="bg-gradient-to-br from-gray-900/80 via-black/80 to-gray-900/80 backdrop-blur-xl border-2 border-gray-800 rounded-3xl p-8 shadow-2xl">
                    <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
                        {/* Búsqueda animada */}
                        <div className="flex-1 w-full">
                            <div className="flex items-center gap-3 mb-4">
                                <Search className="text-yellow-500 animate-pulse" />
                                <label className="block text-lg font-bold text-white">
                                    BUSCAR EN LOS ARCHIVOS
                                </label>
                            </div>
                            <AnimatedSearch
                                value={searchTerm}
                                onChange={setSearchTerm}
                                placeholder="Ej: 'A New Hope', 'George Lucas', 'Tatooine'..."
                                onClear={() => setSearchTerm('')}
                            />
                        </div>

                        {/* Filtros avanzados */}
                        <motion.div
                            animate={{
                                scale: showFilters ? 1.05 : 1
                            }}
                            className="space-y-6"
                        >
                            {/* Botón para mostrar/ocultar filtros */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-3 px-6 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl text-white hover:border-yellow-500 transition-all"
                            >
                                <Filter size={20} />
                                {showFilters ? 'OCULTAR FILTROS' : 'MOSTRAR FILTROS'}
                                <ChevronRight className={`transition-transform ${showFilters ? 'rotate-90' : ''}`} />
                            </motion.button>

                            {/* Filtros expandibles */}
                            <AnimatePresence>
                                {showFilters && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-4"
                                    >
                                        {/* Filtro por episodio */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                EPISODIO
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(ep => (
                                                    <motion.button
                                                        key={ep}
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => setSelectedEpisode(selectedEpisode === ep ? null : ep)}
                                                        className={`px-4 py-2 rounded-lg transition-all ${selectedEpisode === ep
                                                            ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg'
                                                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                                            }`}
                                                    >
                                                        Ep {ep}
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Modo de vista */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                VISTA
                                            </label>
                                            <div className="flex gap-2">
                                                {(['grid', 'list'] as const).map(mode => (
                                                    <motion.button
                                                        key={mode}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => setViewMode(mode)}
                                                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${viewMode === mode
                                                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                                                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                                            }`}
                                                    >
                                                        {mode === 'grid' ? '🧱 Grid' : '📋 Lista'}
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Botón de acción principal */}
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                rotate: [0, 5, -5, 0]
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="group px-8 py-4 bg-gradient-to-r from-yellow-600 via-orange-600 to-yellow-600 text-white font-bold rounded-xl flex items-center gap-3 shadow-2xl hover:shadow-yellow-500/30 transition-all"
                        >
                            <Star className="group-hover:animate-ping" />
                            NUEVO REGISTRO
                            <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                        </motion.button>
                    </div>
                </div>
            </motion.section>

            {/* Sección de películas con animaciones */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-16"
            >
                {/* Header de sección */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-3 flex items-center gap-3">
                            <Film className="text-yellow-500" />
                            ARCHIVO CINEMATOGRÁFICO
                        </h2>
                        <p className="text-gray-400">
                            <span className="text-yellow-400 font-bold">{movies.length}</span> registros encontrados
                            {searchTerm && (
                                <span className="ml-2">
                                    para "<span className="text-white">{searchTerm}</span>"
                                </span>
                            )}
                        </p>
                    </div>

                    {/* Contador animado */}
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            backgroundColor: ['rgba(255,232,31,0.1)', 'rgba(255,232,31,0.2)', 'rgba(255,232,31,0.1)']
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="px-6 py-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl"
                    >
                        <span className="text-2xl font-bold text-yellow-400">{movies.length}</span>
                        <span className="text-gray-300 ml-2">películas</span>
                    </motion.div>
                </div>

                {/* Grid de películas con animaciones */}
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center h-96"
                        >
                            {/* Loading animado */}
                            <div className="relative">
                                {[...Array(4)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                            delay: i * 0.1,
                                            ease: "linear"
                                        }}
                                        style={{ opacity: 1 - (i * 0.2) }}
                                    />
                                ))}
                                <div className="w-16 h-16 flex items-center justify-center text-2xl">
                                    🎬
                                </div>
                            </div>
                            <p className="mt-8 text-gray-400 text-lg">Cargando registros galácticos...</p>
                        </motion.div>
                    ) : movies.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="text-center py-20 bg-gradient-to-br from-gray-900/30 to-black/30 backdrop-blur-sm rounded-3xl border-2 border-gray-800"
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-8xl mb-6"
                            >
                                🤖
                            </motion.div>
                            <h3 className="text-3xl font-bold text-gray-300 mb-4">
                                ¡Por los Sith!
                            </h3>
                            <p className="text-gray-500 text-lg max-w-md mx-auto mb-8">
                                No encontramos registros con esos criterios.
                                <br />
                                Prueba con otros términos o explora todos los archivos.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setSearchTerm('')
                                    setSelectedEpisode(null)
                                }}
                                className="px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-gray-700 text-white rounded-xl hover:border-yellow-500 transition-all"
                            >
                                Mostrar todos los registros
                            </motion.button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="movies"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={`grid gap-8 ${viewMode === 'grid'
                                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                : 'grid-cols-1'
                                }`}
                        >
                            <AnimatePresence>
                                {movies.map((movie, index) => (
                                    <motion.div
                                        key={movie.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{
                                            delay: index * 0.1,
                                            type: "spring",
                                            stiffness: 100
                                        }}
                                        whileHover={{
                                            y: -10,
                                            transition: { duration: 0.3 }
                                        }}
                                        layout
                                    >
                                        <MovieCard
                                            movie={movie}
                                            isAdmin={true}
                                            onDelete={() => handleDeleteMovie(movie.id)}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.section>

            {/* Sección de estadísticas avanzadas */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mt-24"
            >
                <div className="bg-gradient-to-br from-gray-900/50 via-black/50 to-gray-900/50 backdrop-blur-xl border-2 border-gray-800 rounded-3xl p-10">
                    <h3 className="text-3xl font-bold text-center text-white mb-12">
                        ANÁLISIS DEL HOLOCRON
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Precisión de Datos",
                                value: "99.98%",
                                color: "text-green-400",
                                icon: "📊",
                                description: "Verificado por droides astromecánicos",
                                trend: "+0.02%"
                            },
                            {
                                title: "Tiempo de Respuesta",
                                value: "0.4s",
                                color: "text-blue-400",
                                icon: "⚡",
                                description: "Velocidad hiperespacial",
                                trend: "-0.1s"
                            },
                            {
                                title: "Disponibilidad",
                                value: "99.99%",
                                color: "text-yellow-400",
                                icon: "🛡️",
                                description: "Protegido por escudos deflectores",
                                trend: "100%"
                            }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.title}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                whileHover={{ scale: 1.05 }}
                                className="text-center p-8 bg-gradient-to-b from-gray-900/80 to-black/80 rounded-2xl border border-gray-700 hover:border-yellow-500/50 transition-all"
                            >
                                <div className="text-4xl mb-4">{stat.icon}</div>
                                <div className={`text-5xl font-bold ${stat.color} mb-2`}>
                                    {stat.value}
                                </div>
                                <div className="text-xl font-semibold text-white mb-3">
                                    {stat.title}
                                </div>
                                <div className="text-gray-400 text-sm mb-2">
                                    {stat.description}
                                </div>
                                <div className="text-green-400 text-xs font-bold">
                                    {stat.trend} este ciclo
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Gráfico animado (simulado) */}
                    <motion.div
                        className="mt-12 h-2 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 2 }}
                    />
                </div>
            </motion.section>

            {/* Efectos de CSS para animaciones */}
            <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #FFE81F 0%, #FF6B00 50%, #FFE81F 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
      `}</style>
        </DashboardShell>
    )
}

export default Dashboard;