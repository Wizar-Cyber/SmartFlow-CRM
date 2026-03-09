export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-black text-white">Configurações</h2>
        <p className="text-slate-500 mt-1">Gerencie sua conta, preferências e integrações do sistema.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <nav className="space-y-1">
            {[
              { label: 'Perfil', icon: 'person', active: true },
              { label: 'Notificações', icon: 'notifications', active: false },
              { label: 'Segurança', icon: 'security', active: false },
              { label: 'Faturamento', icon: 'payments', active: false },
              { label: 'Integrações', icon: 'extension', active: false },
              { label: 'Equipe', icon: 'group', active: false },
            ].map((item, i) => (
              <button 
                key={i} 
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  item.active ? 'bg-primary text-navy-dark' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-navy-card p-6 rounded-2xl border border-slate-800 shadow-sm">
            <h3 className="font-bold text-lg mb-6 text-white">Informações do Perfil</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-6 mb-8">
                <img 
                  src="https://lh3.googleusercontent.com/a/ACg8ocL_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X=s96-c" 
                  alt="Avatar" 
                  className="w-20 h-20 rounded-2xl border-2 border-primary shadow-lg shadow-primary/20"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <button className="px-4 py-2 bg-slate-800 text-white text-sm font-bold rounded-xl hover:bg-slate-700 transition-colors">Alterar Foto</button>
                  <p className="text-xs text-slate-500 mt-2">JPG, GIF ou PNG. Tamanho máximo de 800K.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nome Completo</label>
                  <input 
                    type="text" 
                    defaultValue="Reiber Lozano" 
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-sm text-white focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">E-mail</label>
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
                    defaultValue="Diretor Executivo" 
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-sm text-white focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Telefone</label>
                  <input 
                    type="text" 
                    defaultValue="+55 (11) 98765-4321" 
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-sm text-white focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button className="px-6 py-2.5 bg-primary text-navy-dark font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">Salvar Alterações</button>
              </div>
            </div>
          </div>

          <div className="bg-navy-card p-6 rounded-2xl border border-slate-800 shadow-sm">
            <h3 className="font-bold text-lg mb-4 text-white">Preferências de Idioma</h3>
            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">language</span>
                <div>
                  <p className="text-sm font-bold text-white">Português (Brasil)</p>
                  <p className="text-xs text-slate-500">Idioma padrão do sistema</p>
                </div>
              </div>
              <button className="text-primary text-sm font-bold hover:underline">Alterar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
