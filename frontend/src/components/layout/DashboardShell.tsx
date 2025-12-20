import { motion } from 'framer-motion';

export const DashboardShell = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-[#0a0a0c] text-slate-100 font-sans selection:bg-yellow-500/30">
            {/* Fondo con efecto de estrellas sutil */}
            <div className="fixed inset-0 bg-[url('/stars.png')] opacity-20 pointer-events-none" />

            <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="text-xl font-bold tracking-tighter bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                        SW-ARCHIVE
                    </div>
                    <button
                        onClick={() => { localStorage.clear(); window.location.href = '/'; }}
                        className="text-sm font-medium hover:text-yellow-400 transition-colors"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </nav>

            <main className="container mx-auto px-6 py-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
};