import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Documentation() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { icon: 'description', label: 'Contratos' },
    { icon: 'gavel', label: 'Legal' },
    { icon: 'group', label: 'Expedientes' },
    { icon: 'receipt_long', label: 'Facturas' },
  ];

  const folders = [
    { label: 'Contratos', files: 124, size: '1.2 GB', icon: 'description' },
    { label: 'Legal', files: 45, size: '450 MB', icon: 'gavel' },
    { label: 'Expedientes', files: 210, size: '3.1 GB', icon: 'group' },
    { label: 'Facturas', files: 560, size: '890 MB', icon: 'receipt_long' },
  ];

  const recentFiles = [
    { name: 'Contrato_Servicios_TechCorp.pdf', client: 'TechCorp Inc.', type: 'Contrato', date: 'Hace 2 horas', icon: 'picture_as_pdf', iconColor: 'text-red-500' },
    { name: 'Factura_A-4509_Gomez.docx', client: 'Carlos Gómez', type: 'Factura', date: 'Hoy, 10:45 AM', icon: 'description', iconColor: 'text-primary' },
    { name: 'Acuerdo_Confidencialidad_V2.pdf', client: 'Nexus Solutions', type: 'Legal', date: 'Ayer, 4:20 PM', icon: 'gavel', iconColor: 'text-orange-500' },
    { name: 'Expediente_Anual_2023.zip', client: 'TechCorp Inc.', type: 'Expediente', date: '12 Oct 2023', icon: 'inventory', iconColor: 'text-blue-500' },
  ];

  const filteredFiles = activeCategory === 'Todos' 
    ? recentFiles 
    : recentFiles.filter(f => f.type === activeCategory || (activeCategory === 'Contratos' && f.type === 'Contrato') || (activeCategory === 'Facturas' && f.type === 'Factura'));

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      // Simular subida
      setTimeout(() => {
        setIsUploading(false);
        alert(`Archivo "${e.target.files![0].name}" subido con éxito.`);
      }, 1500);
    }
  };

  return (
    <div className="space-y-8">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-white">Documentación General</h3>
          <p className="text-slate-500">Gestiona contratos, facturas y archivos legales de clientes</p>
        </div>
        <button 
          onClick={handleUploadClick}
          disabled={isUploading}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-navy-dark rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <span className="material-symbols-outlined">
            {isUploading ? 'sync' : 'upload_file'}
          </span>
          {isUploading ? 'Subiendo...' : 'Subir Archivo'}
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        <button 
          onClick={() => setActiveCategory('Todos')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
            activeCategory === 'Todos' 
              ? 'bg-primary text-navy-dark' 
              : 'bg-navy-card border border-slate-700 text-slate-300 hover:border-primary'
          }`}
        >
          <span className="material-symbols-outlined text-lg">grid_view</span> Todos
        </button>
        {categories.map((cat, i) => (
          <button 
            key={i} 
            onClick={() => setActiveCategory(cat.label)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
              activeCategory === cat.label 
                ? 'bg-primary text-navy-dark font-bold' 
                : 'bg-navy-card border border-slate-700 text-slate-300 hover:border-primary'
            }`}
          >
            <span className={`material-symbols-outlined text-lg ${activeCategory === cat.label ? 'text-navy-dark' : 'text-primary'}`}>
              {cat.icon}
            </span> 
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {folders.map((folder, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -5 }}
            onClick={() => setActiveCategory(folder.label)}
            className={`p-5 rounded-xl border transition-all cursor-pointer group ${
              activeCategory === folder.label 
                ? 'bg-primary/10 border-primary shadow-lg shadow-primary/10' 
                : 'bg-navy-card border-slate-700 hover:border-primary'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${activeCategory === folder.label ? 'bg-primary text-navy-dark' : 'bg-primary/10 text-primary'}`}>
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  folder
                </span>
              </div>
              <button className="p-1 hover:bg-slate-700 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-slate-500 group-hover:text-primary">more_vert</span>
              </button>
            </div>
            <h4 className={`font-bold text-lg mb-1 ${activeCategory === folder.label ? 'text-primary' : 'text-white'}`}>
              {folder.label}
            </h4>
            <p className="text-sm text-slate-500">{folder.files} archivos • {folder.size}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-navy-card rounded-xl border border-slate-700 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center bg-slate-900/30">
          <h4 className="font-bold text-lg text-white">
            {activeCategory === 'Todos' ? 'Archivos Recientes' : `Archivos de ${activeCategory}`}
          </h4>
          <button className="text-primary text-sm font-bold hover:underline transition-all">Ver todos</button>
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
              <AnimatePresence mode="popLayout">
                {filteredFiles.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-slate-500 italic">
                      No hay archivos recientes en esta categoría.
                    </td>
                  </tr>
                ) : filteredFiles.map((file, i) => (
                  <motion.tr 
                    key={file.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-slate-800/50 transition-colors text-slate-300 group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined ${file.iconColor}`}>{file.icon}</span>
                        <span className="text-sm font-medium group-hover:text-white transition-colors">{file.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{file.client}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-primary/10 text-primary">
                        {file.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{file.date}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-500 hover:text-primary transition-all">
                          <span className="material-symbols-outlined text-lg">download</span>
                        </button>
                        <button className="p-2 hover:bg-red-500/10 rounded-lg text-slate-500 hover:text-red-500 transition-all">
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
