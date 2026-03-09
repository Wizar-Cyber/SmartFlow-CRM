export default function Projects() {
  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-navy-card p-6 rounded-xl border border-slate-800 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg">
              <span className="material-symbols-outlined">pending_actions</span>
            </div>
            <span className="text-xs font-bold text-primary">+2% este mes</span>
          </div>
          <p className="text-sm font-medium text-slate-400">En Desarrollo</p>
          <h3 className="text-3xl font-bold mt-1 text-white">12</h3>
        </div>
        <div className="bg-navy-card p-6 rounded-xl border border-slate-800 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
              <span className="material-symbols-outlined">bolt</span>
            </div>
            <span className="text-xs font-bold text-rose-500">-5% este mes</span>
          </div>
          <p className="text-sm font-medium text-slate-400">Activos</p>
          <h3 className="text-3xl font-bold mt-1 text-white">45</h3>
        </div>
        <div className="bg-navy-card p-6 rounded-xl border border-slate-800 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
              <span className="material-symbols-outlined">task_alt</span>
            </div>
            <span className="text-xs font-bold text-primary">+12% este mes</span>
          </div>
          <p className="text-sm font-medium text-slate-400">Finalizados</p>
          <h3 className="text-3xl font-bold mt-1 text-white">128</h3>
        </div>
      </div>

      {/* Tabs & Filters */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 bg-slate-900/50 p-1 rounded-lg">
          <button className="px-4 py-1.5 bg-slate-800 shadow-sm rounded-md text-sm font-bold text-white">Todos</button>
          <button className="px-4 py-1.5 text-slate-500 text-sm font-medium hover:text-slate-300 transition-colors">Prioritarios</button>
          <button className="px-4 py-1.5 text-slate-500 text-sm font-medium hover:text-slate-300 transition-colors">Recientes</button>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-sm">filter_list</span> Filtrar
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-sm">download</span> Exportar
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-navy-card rounded-xl border border-slate-800 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-900/50 border-b border-slate-800">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Proyecto & Cliente</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Servicio</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Estado</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Fechas</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Responsable</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {[
              { name: 'Rediseño UI/UX App Móvil', client: 'TechCorp Solutions', service: 'Diseño Digital', status: 'En Desarrollo', statusColor: 'orange', start: '12 May 2024', est: '30 Jun 2024', responsible: 'Ana Martínez', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALK7RvKb22OnTROI8zQxf9I5qjxT08Wbelab0qNG1EfRZgZvd3YX_BGzrm0neknhDxXBZYZ-8Vc5N9rvkWmXfc_xhOKSTDbcThYTp9GEUNW4SxcMA8yuJZcWmZ7vb5znZ61-vmuJR-FTP_32sNj2l-k2VykBwoqJjx-SavM_wXSomDmZ5wNc4qhDKUAsE0u64tsYmlqtRqkrcY504McXOsRMA0u5pYCmiYyxDVpnIaCnjEdkFQrHj7aB6nhOvv0HLD4EiHMgrEpo8' },
              { name: 'Implementación CRM Global', client: 'Logistics Hub SA', service: 'Consultoría TI', status: 'Activo', statusColor: 'primary', start: '01 Abr 2024', est: '15 Ago 2024', responsible: 'Carlos Ruiz', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDf3z5h581AVX7ptM4MMbbNMVp_jlrX3WX3aaqTGorm5N_KtL8kOqPLswbnl4stSEl4FNHz-yiPpHLdssa6wSYsLLenHSUHmVrUfqhtXmcHKcX-SIt9MkWxCfFsHLiKj786CIlRJWSdL7R9z-JNHZXDcKzxqyalEbka6ltX21KpqnfS_fvEGu5cCNFFMS_KeVvgo-oui-7N92yLXo3ha-xiwCgwGFeBoKURyALeXaK5dKwh-5q58q4JzBswFrUzCSCyBbUByWPSIiE' },
              { name: 'Auditoría de Seguridad Q1', client: 'Bank Financial', service: 'Seguridad', status: 'Finalizado', statusColor: 'slate', start: '10 Ene 2024', est: '15 Mar 2024', responsible: 'Elena G.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPc6uzdhZbk6i6WOhQhV06ki4dAID4em-ShBrtyPXfia1dTPM_t80TAFHtFUzxTmoUccs-oiDsWjbPWW4x0esSZ_Dw25a8_OPejIxVF8dBlUlhcANstoAOV6S8JgOh-Zrja8WhSR2TAdaxqzBOxdFRgOdwKhKfACiAK7caieRo83T_sbgmI-tu3gFYMnMWOB2Je8VbIj5cXbJBIhxtx4cK94FtpMyo1rP6X2hK5pQLcw_vz5F0XN8MIQ5or_ifsXKd4eLQnPosrfg' },
              { name: 'Campaña Marketing Verano', client: 'Sunset Resorts', service: 'Marketing', status: 'Activo', statusColor: 'primary', start: '01 Jun 2024', est: '31 Ago 2024', responsible: 'Diego Luna', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATRG6vnDmARXIXlG7zlpyQNe4tH7W_r2BBdwgjWi2Se5S0-qdVVOkMmcvOHSQ5v69drQGnVtvBVk5svk-XNBsPeLdyimREzYfjclzj6jLAt8nBk0nJJmBsSywaYNiKoH6QgaB0bqnRQdqfGX_YH0l-vFt1A78ytLESwiFdLUThxIMueHYMjv-TecEUsfa_6E8o5syZ96Lf_MO4sDYUlAo4CUk8moHVgX6g77iVUCdSK0T6eGvqn6wXLR7oifA5rS4DApsKvUxh4jo' },
            ].map((project, i) => (
              <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-white">{project.name}</span>
                    <span className="text-xs text-slate-500">{project.client}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm px-2 py-1 bg-slate-800 rounded text-slate-400">{project.service}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      project.statusColor === 'orange' ? 'bg-orange-500' : 
                      project.statusColor === 'primary' ? 'bg-primary' : 
                      'bg-slate-500'
                    }`}></span>
                    <span className={`text-sm font-medium ${
                      project.statusColor === 'orange' ? 'text-orange-500' : 
                      project.statusColor === 'primary' ? 'text-primary' : 
                      'text-slate-500'
                    }`}>{project.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col text-xs">
                    <span className="text-slate-500">Inicio: {project.start}</span>
                    <span className="text-slate-300 font-medium">Est: {project.est}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <img 
                      src={project.responsible === 'Ana Martínez' ? project.img : project.img} 
                      alt={project.responsible} 
                      className="w-6 h-6 rounded-full border border-slate-700"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-sm font-medium text-slate-300">{project.responsible}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="material-symbols-outlined text-slate-500 hover:text-primary transition-colors">more_horiz</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-900/20">
          <span className="text-xs text-slate-500 font-medium">Mostrando 1-4 de 45 proyectos</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-bold disabled:opacity-50" disabled>Anterior</button>
            <button className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-bold hover:bg-slate-700 transition-colors">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
}
