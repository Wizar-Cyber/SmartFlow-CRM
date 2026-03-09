import React from 'react';

export default function SecuritySettings() {
  const loginHistory = [
    { device: 'Chrome en Windows', location: 'Madrid, España', date: 'Hoy, 14:25', status: 'Sesión Actual' },
    { device: 'Safari en iPhone', location: 'Barcelona, España', date: 'Ayer, 09:12', status: 'Activo' },
    { device: 'Firefox en macOS', location: 'Valencia, España', date: '05 Mar, 2026', status: 'Desconectado' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-navy-card p-6 rounded-2xl border border-slate-800 shadow-sm">
        <h3 className="font-bold text-lg mb-6 text-white">Cambiar Contraseña</h3>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contraseña Actual</label>
            <input 
              type="password" 
              className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-sm text-white focus:ring-primary focus:border-primary"
              placeholder="Ingrese su contraseña actual"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nueva Contraseña</label>
              <input 
                type="password" 
                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-sm text-white focus:ring-primary focus:border-primary"
                placeholder="Mínimo 8 caracteres"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Confirmar Nueva Contraseña</label>
              <input 
                type="password" 
                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-sm text-white focus:ring-primary focus:border-primary"
                placeholder="Repita la nueva contraseña"
              />
            </div>
          </div>
          <div className="pt-4 flex justify-end">
            <button className="px-6 py-2.5 bg-primary text-navy-dark font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">Actualizar Contraseña</button>
          </div>
        </div>
      </div>

      <div className="bg-navy-card p-6 rounded-2xl border border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-lg text-white">Autenticación de Dos Factores (2FA)</h3>
            <p className="text-sm text-slate-500 mt-1">Añada una capa extra de seguridad a su cuenta.</p>
          </div>
          <div className="w-12 h-6 bg-slate-700 rounded-full relative cursor-pointer">
            <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white"></div>
          </div>
        </div>
        <div className="p-4 bg-slate-900/30 rounded-xl border border-dashed border-slate-700">
          <p className="text-xs text-slate-400 leading-relaxed">
            Al activar la autenticación de dos factores, deberá proporcionar un código de seguridad adicional al iniciar sesión. Recomendamos el uso de aplicaciones como Google Authenticator o Authy.
          </p>
        </div>
      </div>

      <div className="bg-navy-card p-6 rounded-2xl border border-slate-800 shadow-sm">
        <h3 className="font-bold text-lg mb-6 text-white">Historial de Accesos</h3>
        <div className="space-y-4">
          {loginHistory.map((login, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-400">devices</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{login.device}</p>
                  <p className="text-xs text-slate-500">{login.location} • {login.date}</p>
                </div>
              </div>
              <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${
                login.status === 'Sesión Actual' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-800 text-slate-400'
              }`}>
                {login.status}
              </span>
            </div>
          ))}
        </div>
        <button className="w-full mt-6 py-2.5 text-sm font-bold text-rose-500 hover:bg-rose-500/5 rounded-xl transition-colors">Cerrar sesión en todos los demás dispositivos</button>
      </div>
    </div>
  );
}
