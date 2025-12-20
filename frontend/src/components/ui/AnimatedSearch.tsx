import { motion } from 'framer-motion'
import { Search, Filter, X } from 'lucide-react'
import { useState } from 'react'

interface AnimatedSearchProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    onClear?: () => void
}

export const AnimatedSearch = ({
    value,
    onChange,
    placeholder = "Buscar en los archivos...",
    onClear
}: AnimatedSearchProps) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <motion.div
            animate={{
                scale: isFocused ? 1.02 : 1,
                borderColor: isFocused
                    ? 'rgba(255, 232, 31, 0.5)'
                    : 'rgba(55, 65, 81, 0.5)'
            }}
            className="relative w-full"
        >
            <div className="relative">
                <motion.div
                    animate={{
                        rotate: isFocused ? [0, 5, -5, 0] : 0
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
                >
                    <Search size={20} />
                </motion.div>

                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className="w-full pl-14 pr-12 py-4 bg-gray-900/80 border-2 border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 backdrop-blur-sm transition-all"
                />

                {value && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            onChange('')
                            onClear?.()
                        }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                        <X size={18} />
                    </motion.button>
                )}

                {/* Efecto de partículas al escribir */}
                {isFocused && value && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-yellow-500 rounded-full"
                                initial={{
                                    x: Math.random() * 100 - 50 + '%',
                                    y: '50%',
                                    scale: 0
                                }}
                                animate={{
                                    y: ['50%', '-50%'],
                                    scale: [0, 1, 0],
                                    opacity: [1, 0.5, 0]
                                }}
                                transition={{
                                    duration: 1,
                                    delay: i * 0.2,
                                    repeat: Infinity
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </div>

            {/* Sugerencias animadas */}
            {value && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full mt-2 w-full bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-xl p-4 shadow-2xl z-50"
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Sugerencias:</span>
                        <Filter size={14} className="text-gray-500" />
                    </div>
                    <div className="space-y-2">
                        {['A New Hope', 'George Lucas', 'Tatooine', 'Luke Skywalker']
                            .filter(suggestion =>
                                suggestion.toLowerCase().includes(value.toLowerCase())
                            )
                            .map((suggestion, index) => (
                                <motion.button
                                    key={suggestion}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ x: 5, backgroundColor: 'rgba(255,232,31,0.1)' }}
                                    onClick={() => onChange(suggestion)}
                                    className="w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:text-white transition-all text-sm"
                                >
                                    🔍 {suggestion}
                                </motion.button>
                            ))
                        }
                    </div>
                </motion.div>
            )}
        </motion.div>
    )
}