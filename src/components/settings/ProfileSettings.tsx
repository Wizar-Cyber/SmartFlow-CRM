import React from 'react';

export default function ProfileSettings() {
  return (
    <div className="space-y-6">
      <div className="bg-navy-card p-6 rounded-2xl border border-slate-800 shadow-sm">
        <h3 className="font-bold text-lg mb-6 text-white">Información del Perfil</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-6 mb-8">
            <img 
              src="https://lh3.googleusercontent.com/a/ACg8ocL_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X=s96-c" 
              alt="Avatar" 
              className="w-20 h-20 rounded-2xl border-2 border-primary shadow-lg shadow-primary/20"
              referrerPolicy="no-referrer"
            />
            <div>
              <button className="px-4 py-2 bg-slate-800 text-white text-sm font-bold rounded-xl hover:bg-slate-700 transition-colors">Cambiar Foto</button>
              <p className="text-xs text-slate-500 mt-2">JPG, GIF o PNG. Tamaño máximo de 800K.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nombre Completo</label>
              <input 
                type="text" 
                defaultValue="Reiber Lozano" 
                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-sm text-white focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Correo Electrónico</label>
              <input 
                type="email" 
                defaultValue="lozanoreiber1@gmail.com" 
                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-sm text-white focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cargo</label>
              <input 
                type="text" 
                defaultValue="Director Ejecutivo" 
                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-sm text-white focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Teléfono</label>
              <input 
                type="text" 
                defaultValue="+55 (11) 98765-4321" 
                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-sm text-white focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button className="px-6 py-2.5 bg-primary text-navy-dark font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">Guardar Cambios</button>
          </div>
        </div>
      </div>

      <div className="bg-navy-card p-6 rounded-2xl border border-slate-800 shadow-sm">
        <h3 className="font-bold text-lg mb-4 text-white">Preferencias de Idioma</h3>
        <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-800">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">language</span>
            <div>
              <p className="text-sm font-bold text-white">Español</p>
              <p className="text-xs text-slate-500">Idioma predeterminado del sistema</p>
            </div>
          </div>
          <button className="text-primary text-sm font-bold hover:underline">Cambiar</button>
        </div>
      </div>
    </div>
  );
}
