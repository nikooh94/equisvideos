import React from 'react'
import { motion } from 'framer-motion'
import { Film, Trash2, Calendar, Users, Rocket, Globe, UserCircle } from 'lucide-react'
import { Movie } from '@interfaces/movie.interface'
import apiClient from '@api/api.client'

interface MovieCardProps {
    movie: Movie
    isAdmin?: boolean
    onDelete?: () => void
}

export const MovieCard: React.FC<MovieCardProps> = ({
    movie,
    isAdmin = false,
    onDelete = () => { }
}) => {
    const handleDelete = async () => {
        if (!window.confirm(`⚠️ ¿Eliminar "${movie.title}" del archivo galáctico?`)) return

        try {
            await apiClient.delete(`/movies/${movie.id}`)
            onDelete()
        } catch (error) {
            console.error('Error en eliminación:', error)
            alert('❌ Error al eliminar. Verifica tu conexión a la Fuerza.')
        }
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{
                y: -10,
                boxShadow: '0 20px 40px rgba(255, 232, 31, 0.15)',
                borderColor: 'rgba(255, 232, 31, 0.5)'
            }}
            className="relative bg-gradient-to-br from-gray-900/80 to-black/80 border-2 border-gray-800 p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 group overflow-hidden"
        >
            {/* Efecto de fondo sutil */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Header con episodio */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl text-white shadow-lg shadow-yellow-500/20">
                        <Film size={22} />
                    </div>
                    <div>
                        <span className="text-xs font-bold text-yellow-400 tracking-widest uppercase">
                            Episodio {movie.episode_id}
                        </span>
                        <h3 className="text-xl font-bold text-white mt-1">{movie.title}</h3>
                    </div>
                </div>

                {isAdmin && (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleDelete}
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all z-10"
                        title="Eliminar registro"
                    >
                        <Trash2 size={18} />
                    </motion.button>
                )}
            </div>

            {/* Descripción */}
            <p className="text-gray-400 text-sm mb-6 line-clamp-3 italic">
                "{movie.opening_crawl || 'Un registro importante en la historia galáctica...'}"
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400">
                        <Calendar size={14} />
                        <span className="text-xs font-medium">LANZAMIENTO</span>
                    </div>
                    <div className="text-white font-semibold">
                        {new Date(movie.release_date).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400">
                        <Users size={14} />
                        <span className="text-xs font-medium">PERSONAJES</span>
                    </div>
                    <div className="text-white font-semibold">
                        {movie.characters?.length || 0}
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400">
                        <Rocket size={14} />
                        <span className="text-xs font-medium">NAVES</span>
                    </div>
                    <div className="text-white font-semibold">
                        {movie.starships?.length || 0}
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400">
                        <Globe size={14} />
                        <span className="text-xs font-medium">PLANETAS</span>
                    </div>
                    <div className="text-white font-semibold">
                        {movie.planets?.length || 0}
                    </div>
                </div>
            </div>

            {/* Director */}
            <div className="pt-4 border-t border-gray-800">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-800 rounded-lg">
                            <UserCircle size={16} className="text-gray-400" />
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                                Director
                            </div>
                            <div className="text-white font-medium">{movie.director}</div>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 text-gray-300 text-sm font-medium rounded-lg hover:from-gray-700 hover:to-gray-800 hover:text-white transition-all"
                    >
                        Ver detalles
                    </motion.button>
                </div>
            </div>

            {/* Badge de episodio */}
            <div className="absolute -top-2 -right-2 bg-gradient-to-br from-yellow-500 to-orange-600 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                EP {movie.episode_id}
            </div>
        </motion.div>
    )
}