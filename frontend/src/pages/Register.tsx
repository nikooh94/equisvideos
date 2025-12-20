import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '@api/auth.service';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'regular' as 'admin' | 'regular'
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await authService.register(formData);
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al registrar usuario');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
            <div className="max-w-md w-full bg-slate-900 p-8 rounded-xl border border-blue-500/30 shadow-2xl">
                <h2 className="text-3xl font-bold text-blue-400 uppercase text-center mb-6">Unirse a la Alianza</h2>

                {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4">{error}</div>}
                {success && <div className="bg-green-500/10 border border-green-500 text-green-500 p-3 rounded mb-4">¡Registro exitoso! Redirigiendo...</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-slate-300 mb-1 text-sm">Email</label>
                        <input
                            type="email"
                            className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white focus:border-blue-500 outline-none"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-slate-300 mb-1 text-sm">Contraseña</label>
                        <input
                            type="password"
                            className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white focus:border-blue-500 outline-none"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-slate-300 mb-1 text-sm">Rol</label>
                        <select
                            className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white outline-none"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                        >
                            <option value="regular">Usuario Regular</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded mt-4 transition-colors">
                        Registrarse
                    </button>
                </form>
                <p className="text-center text-slate-500 mt-6 text-sm">
                    ¿Ya tienes cuenta? <Link to="/login" className="text-blue-400">Inicia sesión</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;