import React, { useState } from 'react';
import { motion } from 'motion/react';

interface LoginProps {
  onLogin: (token: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('admin@smartflow.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.token);
      } else {
        setError(data.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-dark flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-navy-card border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVQR5gsJaTnl8Ryaks0LYjt9ch1jaNn7Rm68h67Ig_0zYz164bXQSgz_KHDwy2K3UOe35jFlFPvb6EpxOptqHpvKUBTQNMBHntJguZe2A8aPXbZ4TPGREx3_1oACaS1ib-cfdYSxfQiTdqhFPYJTES_NZTYIKnS6wXDBSasshNVUOVMcPNLGOtNaZU_mecWr1kzfAqjISdZcynSzIz7ayrPSFw1w8-nBUhapUDrglgaQY62as9n-A6RoxYWs5cVMpYIFQiBNUNN3g" 
              alt="SmartFlow Logo" 
              className="w-10 h-10 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-2xl font-bold text-white">SmartFlow</h1>
          <p className="text-slate-400 text-sm">Enterprise CRM Solutions</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Correo Electrónico</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl">mail</span>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-2xl text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                placeholder="tu@ejemplo.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Contraseña</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl">lock</span>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-2xl text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-primary focus:ring-primary" />
              Recuérdame
            </label>
            <a href="#" className="text-primary hover:underline font-medium">¿Olvidaste tu contraseña?</a>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-4 bg-primary text-navy-dark font-bold rounded-2xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-navy-dark border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Iniciar Sesión</span>
                <span className="material-symbols-outlined">login</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-sm">
            ¿No tienes una cuenta? <a href="#" className="text-primary hover:underline font-medium">Contactar a Ventas</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
