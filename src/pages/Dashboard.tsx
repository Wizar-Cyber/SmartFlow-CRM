export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-navy-card p-6 rounded-2xl shadow-sm border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
              <span className="material-symbols-outlined">rocket_launch</span>
            </div>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">+12.5%</span>
          </div>
          <p className="text-sm font-medium text-slate-400">Proyectos Activos</p>
          <h3 className="text-3xl font-extrabold mt-1 text-white">24</h3>
          <p className="text-xs text-slate-500 mt-2">4 lanzados esta semana</p>
        </div>

        <div className="bg-navy-card p-6 rounded-2xl shadow-sm border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">+5.4%</span>
          </div>
          <p className="text-sm font-medium text-slate-400">Ingresos Totales</p>
          <h3 className="text-3xl font-extrabold mt-1 text-white">$128,430</h3>
          <p className="text-xs text-slate-500 mt-2">v.s. $121,800 el mes pasado</p>
        </div>

        <div className="bg-navy-card p-6 rounded-2xl shadow-sm border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
              <span className="material-symbols-outlined">description</span>
            </div>
            <span className="text-xs font-bold text-rose-500 bg-rose-500/10 px-2 py-1 rounded-lg">-2%</span>
          </div>
          <p className="text-sm font-medium text-slate-400">Contratos Pendientes</p>
          <h3 className="text-3xl font-extrabold mt-1 text-white">07</h3>
          <p className="text-xs text-slate-500 mt-2">3 esperando firma</p>
        </div>
      </div>

      {/* Middle Section: Projects & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Project Status Table */}
        <div className="lg:col-span-2 bg-navy-card rounded-2xl shadow-sm border border-slate-800 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-white">Estado de Proyectos</h3>
            <button className="text-primary text-sm font-semibold hover:underline">Ver Todo</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900/50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 font-semibold">Nombre del Proyecto</th>
                  <th className="px-6 py-3 font-semibold">Cliente</th>
                  <th className="px-6 py-3 font-semibold">Progreso</th>
                  <th className="px-6 py-3 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {[
                  { name: 'Skyline Mobile App', client: 'TechCorp Inc.', progress: 75, status: 'En Progreso', icon: 'auto_awesome', color: 'blue' },
                  { name: 'E-commerce Rebrand', client: 'Vogue Styles', progress: 100, status: 'Completado', icon: 'shopping_cart', color: 'emerald' },
                  { name: 'Security Audit', client: 'Global Finance', progress: 30, status: 'Revisando', icon: 'shield', color: 'amber' },
                  { name: 'Internal Portal', client: 'SmartFlow', progress: 15, status: 'En Espera', icon: 'web', color: 'slate' },
                ].map((project, i) => (
                  <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary`}>
                          <span className="material-symbols-outlined text-sm">{project.icon}</span>
                        </div>
                        <span className="text-sm font-medium text-white">{project.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">{project.client}</td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-primary rounded-full`} 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold bg-primary/10 text-primary uppercase`}>
                        {project.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-navy-card rounded-2xl shadow-sm border border-slate-800 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-800">
            <h3 className="font-bold text-white">Actividad Reciente</h3>
          </div>
          <div className="p-6 space-y-6">
            {[
              { user: 'Sarah Connor', action: 'completó el', target: 'Design Sprint', time: 'hace 2 horas', icon: 'check', color: 'emerald', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFiGecl19kXyS0DH8E1dUHB64Hhicr3_pUQARMaM6ndrXXg936OoFdzWm3ci5wZLhXAMYAlr6Nnhcz08xdfBnwx57alet1lBhapHwwMsSiCLoZmiZydY0Z66o_2_PSGWeo4K7qMklTu4AYgd9gXVM2CMQjVY7iKGgh3aIgHbuOqk7U6EM1rVBQqKGCYS0pLAhwykCaxYwVg9qnou9o4k5uAg6FSi9pXtOi4w59WCi_dDTYZrRmCzvwvGo8IsgIDOSkDwSP7xeDCzQ' },
              { user: 'Mike Ross', action: 'subió nuevos contratos para', target: 'Global Finance', time: 'hace 4 horas', icon: 'upload_file', color: 'blue', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbN1uThTtFNMIHNzf2VrNFcKQG9thGo88sJ914jEI4A8UzmUFGhoKy-8wwfCIBDNNMiTeWPETzWrKfaSA8WW9iw6wAYjocISs6dYJBsTqggGQ60meen8XOadYEgCgEXDDL2TiQq6vSFdpd0HuEKClpnKopJQV_P7YzlleTmbKuimAew3pMwHdW86oXnjShDK4a5aWQV3OjCPOdKxESz5ombaS5UR1mkNpuSkOup6feU68zUfg_7wc15WlvZmIjaztAyl-JY8J-mNE' },
              { user: 'Harvey Specter', action: 'solicitó revisión en', target: 'Factura #8842', time: 'Ayer', icon: 'error', color: 'amber', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNiYEn_Wpaf-mKFBEJE67RRI2gPjnPQg8qqhKAcIZsjsHAaOiQxfDc6yf2CcQQL1EOcLO_7c_LIBKqEumd_s0F7sU9SX_KOe_0atI33o3UkfBua3WNfIeskBywYIPnFOK0zULSBVwTgymu2FPcWjT9oLEDJ81N-R88jsMsM8IhMHmAZP9gBGcA4BQ-2Q5Rrbu3GpUC09MZNFzG9nj8r0BtBdDZYXLkfrboFQ7KWK6HNmTduKRyuq830mcRcJxqpxVATw7wASLLL2A' },
              { user: 'Donna Paulsen', action: 'añadió un nuevo cliente:', target: 'NextGen Robotics', time: 'Ayer', icon: 'add', color: 'primary', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBz2GOM6SSm27MoQRO7eTPqbNPA2FAxCZjmtrR8Imx4URbfEfOdJxi4kDAgAPk2qT-vvpbC18bgwPy2BDxT5SfEqwYb_mABRFDbyf11Z7gBh3WLvcyxL2I3c7vGpnmSSQh_J2HPTUJ3Wfvs7s7J88yPXDjBzerao7Tf7PL_p3hv4B5vopyQJPR434S4T6bLysY6d8Rt2OsfhrIcs9y-ZOJYnh7CdBzwaz46dQw7qphDt69Yibg70G_33Pc9nw-VZyrVobVf_y2hQiI' },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className="relative flex-shrink-0">
                  <img 
                    src={activity.img} 
                    alt={activity.user} 
                    className="w-10 h-10 rounded-full border border-slate-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute -bottom-1 -right-1 bg-primary border-2 border-navy-dark rounded-full p-0.5`}>
                    <span className="material-symbols-outlined text-[10px] text-white">{activity.icon}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-300">
                    <span className="font-bold text-white">{activity.user}</span> {activity.action} <span className="text-primary font-medium">{activity.target}</span>.
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
