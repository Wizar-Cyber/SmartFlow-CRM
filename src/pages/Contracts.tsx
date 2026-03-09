export default function Contracts() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Gestión de Contratos</h1>
        <p className="text-slate-500 text-sm">Administración y seguimiento de documentos legales firmados.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Contratos', value: '124', color: 'slate' },
          { label: 'Activos', value: '98', color: 'primary' },
          { label: 'En Revisión', value: '12', color: 'orange' },
          { label: 'Valor Total', value: '$458.2k', color: 'slate' },
        ].map((stat, i) => (
          <div key={i} className="bg-navy-card p-4 rounded-xl border border-slate-800 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
            <p className={`text-2xl font-bold mt-1 ${stat.color === 'primary' ? 'text-primary' : stat.color === 'orange' ? 'text-orange-500' : 'text-white'}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button className="px-4 py-1.5 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">Todos</button>
        <button className="px-4 py-1.5 rounded-full bg-navy-card border border-slate-800 text-slate-400 text-xs font-semibold hover:border-primary transition-colors">Firmados</button>
        <button className="px-4 py-1.5 rounded-full bg-navy-card border border-slate-800 text-slate-400 text-xs font-semibold hover:border-primary transition-colors">Pendientes</button>
        <button className="px-4 py-1.5 rounded-full bg-navy-card border border-slate-800 text-slate-400 text-xs font-semibold hover:border-primary transition-colors">Expirados</button>
        <div className="h-4 w-[1px] bg-slate-700 mx-2"></div>
        <button className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
          <span className="material-symbols-outlined text-sm">filter_list</span>
          Filtros Avanzados
        </button>
      </div>

      <div className="bg-navy-card rounded-xl border border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tipo de Contrato</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Fecha de Firma</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Valor ($)</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Adjunto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { client: 'Acme Corp', initials: 'AC', type: 'Servicios IT', date: '12 Oct 2023', value: '$15,000', status: 'Firmado', statusColor: 'emerald' },
                { client: 'Global Tech', initials: 'GT', type: 'Licenciamiento', date: '05 Nov 2023', value: '$8,200', status: 'En Revisión', statusColor: 'blue' },
                { client: 'Industrias Alpha', initials: 'IA', type: 'Consultoría', date: '22 Nov 2023', value: '$12,500', status: 'Firmado', statusColor: 'emerald' },
                { client: 'Startup XYZ', initials: 'SX', type: 'Mantenimiento', date: '01 Dic 2023', value: '$3,000', status: 'Pendiente', statusColor: 'amber' },
              ].map((contract, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-slate-800 flex items-center justify-center text-slate-500 text-xs font-bold">
                        {contract.initials}
                      </div>
                      <span className="text-sm font-semibold text-white">{contract.client}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{contract.type}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{contract.date}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-white">{contract.value}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      contract.statusColor === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' : 
                      contract.statusColor === 'blue' ? 'bg-blue-500/20 text-blue-400' : 
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {contract.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:text-emerald-400 flex items-center justify-end gap-1 ml-auto text-xs font-bold transition-colors">
                      <span className="material-symbols-outlined text-sm">{contract.status === 'Pendiente' ? 'upload' : 'download'}</span>
                      {contract.status === 'Pendiente' ? 'Subir' : 'Descargar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-900/20">
          <span className="text-xs text-slate-500">Mostrando 4 de 124 contratos</span>
          <div className="flex gap-2">
            <button className="p-1 border border-slate-700 rounded hover:bg-slate-800 disabled:opacity-50 transition-colors" disabled>
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="p-1 border border-slate-700 rounded hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
