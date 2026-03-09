export default function Payments() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-3xl font-black tracking-tight text-white">Panel Financiero</h3>
        <p className="text-slate-500 mt-1">Monitorea el flujo de caja y estados de facturación en tiempo real.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-navy-card p-6 rounded-xl border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="p-2 bg-primary/10 text-primary rounded-lg material-symbols-outlined">trending_up</span>
            <span className="text-xs font-bold text-primary flex items-center bg-primary/10 px-2 py-1 rounded-full">
              +15.2% <span className="material-symbols-outlined text-xs ml-0.5">arrow_upward</span>
            </span>
          </div>
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Ingresos Totales</p>
          <h4 className="text-3xl font-bold mt-1 text-white">$45,280.00</h4>
          <p className="text-xs text-slate-500 mt-2">Mes actual (Octubre)</p>
        </div>

        <div className="bg-navy-card p-6 rounded-xl border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="p-2 bg-amber-500/10 text-amber-500 rounded-lg material-symbols-outlined">pending_actions</span>
            <span className="text-xs font-bold text-red-500 flex items-center bg-red-500/10 px-2 py-1 rounded-full">
              -4.3% <span className="material-symbols-outlined text-xs ml-0.5">arrow_downward</span>
            </span>
          </div>
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Pagos Pendientes</p>
          <h4 className="text-3xl font-bold mt-1 text-white">$12,450.00</h4>
          <p className="text-xs text-slate-500 mt-2">12 facturas por vencer</p>
        </div>

        <div className="bg-navy-card p-6 rounded-xl border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="p-2 bg-blue-500/10 text-blue-500 rounded-lg material-symbols-outlined">group</span>
          </div>
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Clientes Activos</p>
          <h4 className="text-3xl font-bold mt-1 text-white">142</h4>
          <p className="text-xs text-slate-500 mt-2">+8 nuevos este mes</p>
        </div>
      </div>

      <div className="bg-navy-card rounded-xl border border-slate-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h5 className="font-bold text-white">Historial de Transacciones</h5>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-semibold bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors text-slate-300">Exportar CSV</button>
            <button className="px-3 py-1.5 text-xs font-semibold bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors text-slate-300">Filtrar</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Servicio</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Monto</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Estado</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Método</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { client: 'Agencia Mova', initials: 'AM', service: 'Consultoría Estratégica', amount: '$2,400.00', status: 'Pagado', method: 'Transferencia', icon: 'credit_card', date: 'Oct 24, 2023' },
                { client: 'SkyTech Corp', initials: 'ST', service: 'Mantenimiento Cloud', amount: '$1,150.00', status: 'Pendiente', method: 'Efectivo', icon: 'payments', date: 'Oct 22, 2023' },
                { client: 'Logística Prime', initials: 'LP', service: 'Desarrollo Custom', amount: '$8,200.00', status: 'Pagado', method: 'Stripe', icon: 'credit_card', date: 'Oct 20, 2023' },
                { client: 'Blue Ridge', initials: 'BR', service: 'Suscripción Anual', amount: '$450.00', status: 'Pendiente', method: 'Bank Transfer', icon: 'account_balance', date: 'Oct 19, 2023' },
                { client: 'Nexus K', initials: 'NK', service: 'Auditoría IT', amount: '$3,700.00', status: 'Pagado', method: 'Stripe', icon: 'credit_card', date: 'Oct 18, 2023' },
              ].map((tx, i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-400">
                        {tx.initials}
                      </div>
                      <span className="font-semibold text-sm text-white">{tx.client}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{tx.service}</td>
                  <td className="px-6 py-4 text-sm font-bold text-right text-white">{tx.amount}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 text-[10px] font-black uppercase rounded-full border ${
                      tx.status === 'Pagado' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <span className="material-symbols-outlined text-sm">{tx.icon}</span> {tx.method}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{tx.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="material-symbols-outlined text-slate-500 hover:text-primary transition-colors">more_vert</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between text-sm text-slate-500 bg-slate-900/20">
          <p>Mostrando 1-5 de 24 transacciones</p>
          <div className="flex gap-1">
            <button className="size-8 flex items-center justify-center rounded-lg border border-slate-700 hover:bg-slate-800 disabled:opacity-50" disabled>
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button className="size-8 flex items-center justify-center rounded-lg bg-primary text-navy-dark font-bold">1</button>
            <button className="size-8 flex items-center justify-center rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors">2</button>
            <button className="size-8 flex items-center justify-center rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors">3</button>
            <button className="size-8 flex items-center justify-center rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
