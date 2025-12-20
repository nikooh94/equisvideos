import { motion, useAnimation } from 'framer-motion'
import { useState } from 'react'

interface Stat {
    id: number
    number: string
    label: string
    color: string
    icon: string
    description: string
}

interface InteractiveStatsProps {
    stats: Stat[]
}

export const InteractiveStats = ({ stats }: InteractiveStatsProps) => {
    const [selectedStat, setSelectedStat] = useState<number | null>(null)
    const controls = useAnimation()

    const handleHover = async (id: number) => {
        setSelectedStat(id)
        await controls.start({
            scale: 1.05,
            transition: { duration: 0.2 }
        })
    }

    const handleLeave = async () => {
        setSelectedStat(null)
        await controls.start({
            scale: 1,
            transition: { duration: 0.2 }
        })
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat) => (
                <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{
                        opacity: 1,
                        scale: selectedStat === stat.id ? 1.05 : 1,
                        y: 0,
                        boxShadow: selectedStat === stat.id
                            ? '0 25px 50px -12px rgba(255, 232, 31, 0.3)'
                            : '0 10px 30px -10px rgba(0, 0, 0, 0.3)'
                    }}
                    whileHover={{
                        scale: 1.08,
                        rotateY: 5,
                        transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => handleHover(stat.id)}
                    onHoverEnd={handleLeave}
                    onClick={() => handleHover(stat.id)}
                    className={`relative cursor-pointer p-6 rounded-2xl backdrop-blur-sm border-2 transition-all duration-300 ${selectedStat === stat.id
                            ? 'border-yellow-500/50 bg-gradient-to-br from-gray-900/80 to-black/80'
                            : 'border-transparent bg-gradient-to-br from-gray-900/50 to-black/50'
                        }`}
                >
                    {/* Efecto de partículas al hacer hover */}
                    {selectedStat === stat.id && (
                        <motion.div
                            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,232,31,0.1),transparent_50%)]"
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        />
                    )}

                    <div className="relative z-10 text-center">
                        <motion.div
                            className="text-4xl mb-3"
                            animate={{
                                rotate: selectedStat === stat.id ? [0, 10, -10, 0] : 0
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            {stat.icon}
                        </motion.div>

                        <motion.div
                            className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                            animate={{
                                backgroundPosition: selectedStat === stat.id ? ['0%', '100%'] : '0%'
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            style={{
                                backgroundSize: '200% auto'
                            }}
                        >
                            {stat.number}
                        </motion.div>

                        <div className="text-sm font-medium text-gray-300 mb-2">
                            {stat.label}
                        </div>

                        {selectedStat === stat.id && (
                            <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-xs text-gray-400 mt-2"
                            >
                                {stat.description}
                            </motion.p>
                        )}
                    </div>

                    {/* Indicador de selección */}
                    {selectedStat === stat.id && (
                        <motion.div
                            className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-500 rounded-full"
                            animate={{
                                scale: [1, 1.5, 1],
                                boxShadow: ['0 0 0 0 rgba(255,232,31,0.4)', '0 0 0 10px rgba(255,232,31,0)', '0 0 0 0 rgba(255,232,31,0)']
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatDelay: 1
                            }}
                        />
                    )}
                </motion.div>
            ))}
        </div>
    )
}