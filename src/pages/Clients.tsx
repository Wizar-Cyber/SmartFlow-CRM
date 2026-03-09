export default function Clients() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Clientes</h2>
          <p className="text-slate-500 mt-1">Gerencie leads, acompanhe contratos e histórico de clientes ativos.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined">person_add</span>
          <span>Novo Cliente</span>
        </button>
      </div>

      <div className="bg-navy-card p-4 rounded-2xl shadow-sm border border-slate-800 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">search</span>
          <input 
            type="text" 
            placeholder="Buscar por nome, empresa, e-mail..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border-slate-700 rounded-xl text-sm focus:ring-primary focus:border-primary text-slate-200"
          />
        </div>
        <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-xl">
          <button className="px-4 py-1.5 text-xs font-bold rounded-lg bg-slate-700 shadow-sm text-white">Todos</button>
          <button className="px-4 py-1.5 text-xs font-bold rounded-lg text-slate-500 hover:text-slate-300 transition-colors">Ativo</button>
          <button className="px-4 py-1.5 text-xs font-bold rounded-lg text-slate-500 hover:text-slate-300 transition-colors">Lead</button>
          <button className="px-4 py-1.5 text-xs font-bold rounded-lg text-slate-500 hover:text-slate-300 transition-colors">Inativo</button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-700 rounded-xl text-sm font-semibold text-slate-400 hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-lg">filter_list</span>
          Filtros
        </button>
      </div>

      <div className="bg-navy-card rounded-2xl shadow-sm border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Empresa</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contato</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Serviço</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { name: 'Ana Martins', initials: 'AM', company: 'TechNova Solutions', email: 'ana.martins@technova.com', phone: '(11) 98765-4321', service: 'Cloud Migration', status: 'Ativo', date: '12 Out 2023', color: 'primary' },
                { name: 'Ricardo Santos', initials: 'RS', company: 'Logistics Corp', email: 'ricardo@logistics.co', phone: '(21) 99888-1122', service: 'Premium Support', status: 'Lead', date: '05 Nov 2023', color: 'amber' },
                { name: 'Luísa Costa', initials: 'LC', company: 'GreenDesign Studio', email: 'luisa@greendesign.com', phone: '(31) 97766-5544', service: 'Monthly SEO', status: 'Inativo', date: '22 Ago 2023', color: 'slate' },
                { name: 'Bruno Pereira', initials: 'BP', company: 'FinTech Hub', email: 'bruno@fintechhub.com', phone: '(11) 91234-5678', service: 'API Integration', status: 'Ativo', date: '18 Dez 2023', color: 'primary' },
              ].map((client, i) => (
                <tr key={i} className="hover:bg-slate-800/40 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                        {client.initials}
                      </div>
                      <span className="text-sm font-semibold text-white">{client.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{client.company}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-white">{client.phone}</div>
                    <div className="text-xs text-slate-500">{client.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300">
                      {client.service}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      client.status === 'Ativo' ? 'bg-primary/10 text-primary' : 
                      client.status === 'Lead' ? 'bg-amber-500/10 text-amber-500' : 
                      'bg-slate-800 text-slate-500'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        client.status === 'Ativo' ? 'bg-primary' : 
                        client.status === 'Lead' ? 'bg-amber-500' : 
                        'bg-slate-500'
                      }`}></span>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{client.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-colors">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-900/20">
          <span className="text-sm text-slate-500">Exibindo 1-4 de 128 clientes</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-700 rounded-lg text-sm disabled:opacity-50" disabled>Anterior</button>
            <button className="px-3 py-1 bg-slate-800 text-white font-bold rounded-lg text-sm">1</button>
            <button className="px-3 py-1 hover:bg-slate-800 rounded-lg text-sm transition-colors">2</button>
            <button className="px-3 py-1 hover:bg-slate-800 rounded-lg text-sm transition-colors">3</button>
            <button className="px-3 py-1 border border-slate-700 rounded-lg text-sm hover:bg-slate-800 transition-colors">Próximo</button>
          </div>
        </div>
      </div>
    </div>
  );
}
