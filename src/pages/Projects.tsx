import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Project {
  id: number;
  name: string;
  client_id: number;
  client_name?: string;
  status: string;
  progress: number;
  deadline: string;
  budget: number;
}

interface Client {
  id: number;
  name: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [formData, setFormData] = useState({
    name: '',
    client_id: 0,
    status: 'En Progreso',
    progress: 0,
    deadline: '',
    budget: 0
  });

  useEffect(() => {
    fetchProjects();
    fetchClients();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProjects = projects
    .filter(project => {
      const matchesSearch = 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client_name?.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (statusFilter === 'Todos' || statusFilter === 'Prioritarios' || statusFilter === 'Recientes') {
        return matchesSearch;
      }
      
      return matchesSearch && project.status === statusFilter;
    })
    .sort((a, b) => {
      if (statusFilter === 'Prioritarios') {
        return b.budget - a.budget;
      }
      if (statusFilter === 'Recientes') {
        return b.id - a.id; // Assuming higher ID is more recent
      }
      return 0;
    });

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/clients');
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
    const method = editingProject ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchProjects();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este proyecto?')) return;

    try {
      const response = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchProjects();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const openModal = (project: Project | null = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        name: project.name,
        client_id: project.client_id,
        status: project.status,
        progress: project.progress,
        deadline: project.deadline,
        budget: project.budget
      });
    } else {
      setEditingProject(null);
      setFormData({
        name: '',
        client_id: clients[0]?.id || 0,
        status: 'En Progreso',
        progress: 0,
        deadline: '',
        budget: 0
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  return (
    <div className="space-y-8">
      {/* Header & New Project Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Proyectos</h2>
          <p className="text-slate-500 mt-1">Gestión y seguimiento de proyectos activos y finalizados.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined">add_task</span>
          <span>Nuevo Proyecto</span>
        </button>
      </div>

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
          <h3 className="text-3xl font-bold mt-1 text-white">{projects.filter(p => p.status === 'En Progreso').length}</h3>
        </div>
        <div className="bg-navy-card p-6 rounded-xl border border-slate-800 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
              <span className="material-symbols-outlined">bolt</span>
            </div>
            <span className="text-xs font-bold text-rose-500">-5% este mes</span>
          </div>
          <p className="text-sm font-medium text-slate-400">Activos</p>
          <h3 className="text-3xl font-bold mt-1 text-white">{projects.length}</h3>
        </div>
        <div className="bg-navy-card p-6 rounded-xl border border-slate-800 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
              <span className="material-symbols-outlined">task_alt</span>
            </div>
            <span className="text-xs font-bold text-primary">+12% este mes</span>
          </div>
          <p className="text-sm font-medium text-slate-400">Finalizados</p>
          <h3 className="text-3xl font-bold mt-1 text-white">{projects.filter(p => p.status === 'Completado').length}</h3>
        </div>
      </div>

      <div className="bg-navy-card p-4 rounded-2xl shadow-sm border border-slate-800 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">search</span>
          <input 
            type="text" 
            placeholder="Buscar proyectos..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-xl text-sm focus:ring-primary focus:border-primary text-slate-200 outline-none"
          />
        </div>
        <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-xl">
          {['Todos', 'Prioritarios', 'Recientes', 'En Progreso', 'Completado'].map((status) => (
            <button 
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                statusFilter === status 
                  ? 'bg-slate-700 shadow-sm text-white' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 font-bold rounded-xl hover:bg-slate-700 transition-all">
          <span className="material-symbols-outlined text-lg">download</span>
          <span>Exportar</span>
        </button>
      </div>

      {/* Projects Table */}
      <div className="bg-navy-card rounded-xl border border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-800">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Proyecto & Cliente</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Estado</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Progreso</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Fecha Límite</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Presupuesto</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500">Cargando proyectos...</td>
                </tr>
              ) : filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500">No se encontraron proyectos.</td>
                </tr>
              ) : filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-white">{project.name}</span>
                      <span className="text-xs text-slate-500">{project.client_name || 'Sin Cliente'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        project.status === 'En Progreso' ? 'bg-orange-500' : 
                        project.status === 'Completado' ? 'bg-primary' : 
                        'bg-slate-500'
                      }`}></span>
                      <span className={`text-sm font-medium ${
                        project.status === 'En Progreso' ? 'text-orange-500' : 
                        project.status === 'Completado' ? 'text-primary' : 
                        'text-slate-500'
                      }`}>{project.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full max-w-[100px] bg-slate-800 rounded-full h-1.5">
                      <div 
                        className="bg-primary h-1.5 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block">{project.progress}% completado</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{project.deadline}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-white">
                    ${project.budget.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => openModal(project)}
                        className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(project.id)}
                        className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Proyecto */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-navy-card border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                <h3 className="text-xl font-bold text-white">
                  {editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}
                </h3>
                <button onClick={closeModal} className="text-slate-500 hover:text-white transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nombre del Proyecto</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Cliente</label>
                    <select 
                      value={formData.client_id}
                      onChange={(e) => setFormData({...formData, client_id: parseInt(e.target.value)})}
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-primary focus:border-transparent outline-none appearance-none"
                    >
                      <option value={0}>Seleccionar Cliente</option>
                      {clients.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Estado</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-primary focus:border-transparent outline-none appearance-none"
                    >
                      <option value="En Progreso">En Progreso</option>
                      <option value="Completado">Completado</option>
                      <option value="Pausado">Pausado</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Progreso (%)</label>
                    <input 
                      type="number" 
                      min="0"
                      max="100"
                      value={formData.progress}
                      onChange={(e) => setFormData({...formData, progress: parseInt(e.target.value)})}
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Fecha Límite</label>
                    <input 
                      type="date" 
                      value={formData.deadline}
                      onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Presupuesto ($)</label>
                  <input 
                    type="number" 
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: parseFloat(e.target.value)})}
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={closeModal}
                    className="flex-1 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-all"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
                  >
                    {editingProject ? 'Guardar Cambios' : 'Crear Proyecto'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
