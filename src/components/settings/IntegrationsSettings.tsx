import React from 'react';

export default function IntegrationsSettings() {
  const integrations = [
    { name: 'Slack', description: 'Reciba notificaciones de proyectos directamente en su Slack.', icon: 'forum', connected: true },
    { name: 'Google Drive', description: 'Sincronice documentos y archivos de proyectos automáticamente.', icon: 'cloud', connected: true },
    { name: 'WhatsApp API', description: 'Envíe actualizaciones de estado a sus clientes vía WhatsApp.', icon: 'chat', connected: false },
    { name: 'Stripe', description: 'Gestione pagos y facturas de forma integrada.', icon: 'payments', connected: false },
    { name: 'Calendly', description: 'Sincronice reuniones y citas con su calendario.', icon: 'calendar_today', connected: false },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-navy-card p-6 rounded-2xl border border-slate-800 shadow-sm">
        <h3 className="font-bold text-lg mb-2 text-white">Integraciones Disponibles</h3>
        <p className="text-sm text-slate-500 mb-8">Conecte SmartFlow con las herramientas que ya utiliza.</p>

        <div className="grid grid-cols-1 gap-4">
          {integrations.map((app, idx) => (
            <div key={idx} className="flex items-center justify-between p-5 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors group">
              <div className="flex items-center gap-5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  app.connected ? 'bg-primary/10 text-primary' : 'bg-slate-800 text-slate-500'
                }`}>
                  <span className="material-symbols-outlined text-2xl">{app.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-white flex items-center gap-2">
                    {app.name}
                    {app.connected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-md">{app.description}</p>
                </div>
              </div>
              <button className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                app.connected 
                  ? 'bg-slate-800 text-slate-400 hover:bg-rose-500/10 hover:text-rose-500' 
                  : 'bg-primary text-navy-dark hover:opacity-90'
              }`}>
                {app.connected ? 'Desconectar' : 'Conectar'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-navy-card p-6 rounded-2xl border border-slate-800 shadow-sm">
        <h3 className="font-bold text-lg mb-4 text-white">API de Desarrollador</h3>
        <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Su Clave de API</span>
            <button className="text-primary text-xs font-bold hover:underline">Generar Nueva Clave</button>
          </div>
          <div className="flex items-center gap-3">
            <code className="flex-1 bg-black/30 p-3 rounded-lg text-xs text-emerald-500 font-mono overflow-hidden whitespace-nowrap">
              sf_live_51N8h2KAn9X0mZ...
            </code>
            <button className="p-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors">
              <span className="material-symbols-outlined text-lg">content_copy</span>
            </button>
          </div>
        </div>
        <p className="text-[10px] text-slate-600 mt-4 leading-relaxed">
          Mantenga su clave de API en secreto. Con ella, es posible acceder a todos los datos de su cuenta vía integración programática. Consulte nuestra documentación para saber más.
        </p>
      </div>
    </div>
  );
}
