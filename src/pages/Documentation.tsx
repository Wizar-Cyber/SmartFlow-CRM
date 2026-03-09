export default function Documentation() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-white">Documentación General</h3>
          <p className="text-slate-500">Gestiona contratos, facturas y archivos legales de clientes</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-navy-dark rounded-xl font-bold hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined">upload_file</span>
          Subir Archivo
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary font-bold text-sm text-white">
          <span className="material-symbols-outlined text-lg">grid_view</span> Todos
        </button>
        {[
          { icon: 'description', label: 'Contratos' },
          { icon: 'gavel', label: 'Legal' },
          { icon: 'group', label: 'Expedientes' },
          { icon: 'receipt_long', label: 'Facturas' },
        ].map((cat, i) => (
          <button key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-card border border-slate-700 font-medium text-sm text-slate-300 hover:border-primary transition-colors">
            <span className="material-symbols-outlined text-lg text-primary">{cat.icon}</span> {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Contratos', files: 124, size: '1.2 GB' },
          { label: 'Legal', files: 45, size: '450 MB' },
          { label: 'Expedientes', files: 210, size: '3.1 GB' },
          { label: 'Facturas', files: 560, size: '890 MB' },
        ].map((folder, i) => (
          <div key={i} className="bg-navy-card p-5 rounded-xl border border-slate-700 hover:shadow-xl transition-all cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>folder</span>
              </div>
              <span className="material-symbols-outlined text-slate-500 group-hover:text-primary transition-colors">more_vert</span>
            </div>
            <h4 className="font-bold text-lg mb-1 text-white">{folder.label}</h4>
            <p className="text-sm text-slate-500">{folder.files} archivos • {folder.size}</p>
          </div>
        ))}
      </div>

      <div className="bg-navy-card rounded-xl border border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center">
          <h4 className="font-bold text-lg text-white">Archivos Recientes</h4>
          <button className="text-primary text-sm font-bold hover:underline">Ver todos</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 font-semibold">Nombre del Archivo</th>
                <th className="px-6 py-3 font-semibold">Cliente</th>
                <th className="px-6 py-3 font-semibold">Tipo</th>
                <th className="px-6 py-3 font-semibold">Fecha</th>
                <th className="px-6 py-3 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {[
                { name: 'Contrato_Servicios_TechCorp.pdf', client: 'TechCorp Inc.', type: 'Contrato', typeColor: 'blue', date: 'Hace 2 horas', icon: 'picture_as_pdf', iconColor: 'text-red-500' },
                { name: 'Factura_A-4509_Gomez.docx', client: 'Carlos Gómez', type: 'Factura', typeColor: 'emerald', date: 'Hoy, 10:45 AM', icon: 'description', iconColor: 'text-primary' },
                { name: 'Acuerdo_Confidencialidad_V2.pdf', client: 'Nexus Solutions', type: 'Legal', typeColor: 'orange', date: 'Ayer, 4:20 PM', icon: 'gavel', iconColor: 'text-orange-500' },
                { name: 'Expediente_Anual_2023.zip', client: 'TechCorp Inc.', type: 'Expediente', typeColor: 'purple', date: '12 Oct 2023', icon: 'inventory', iconColor: 'text-blue-500' },
              ].map((file, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-colors text-slate-300">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined ${file.iconColor}`}>{file.icon}</span>
                      <span className="text-sm font-medium">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{file.client}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-primary/10 text-primary`}>
                      {file.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{file.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-500 hover:text-primary transition-colors"><span className="material-symbols-outlined">download</span></button>
                    <button className="ml-2 text-slate-500 hover:text-red-500 transition-colors"><span className="material-symbols-outlined">delete</span></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
