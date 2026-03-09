import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Client {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  status: string;
  created_at?: string;
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    status: 'Lead'
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/clients');
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'Todos' || client.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingClient ? `/api/clients/${editingClient.id}` : '/api/clients';
    const method = editingClient ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchClients();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este cliente?')) return;

    try {
      const response = await fetch(`/api/clients/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchClients();
      }
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const openModal = (client: Client | null = null) => {
    if (client) {
      setEditingClient(client);
      setFormData({
        name: client.name,
        company: client.company,
        email: client.email,
        phone: client.phone,
        service: client.service,
        status: client.status
      });
    } else {
      setEditingClient(null);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: '',
        status: 'Lead'
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingClient(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Clientes</h2>
          <p className="text-slate-500 mt-1">Gestione leads, realice seguimiento de contratos e historial de clientes activos.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined">person_add</span>
          <span>Nuevo Cliente</span>
        </button>
      </div>

      <div className="bg-navy-card p-4 rounded-2xl shadow-sm border border-slate-800 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">search</span>
          <input 
            type="text" 
            placeholder="Buscar por nombre, empresa, e-mail..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-xl text-sm focus:ring-primary focus:border-primary text-slate-200 outline-none"
          />
        </div>
        <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-xl">
          {['Todos', 'Activo', 'Lead', 'Inactivo'].map((status) => (
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
      </div>

      <div className="bg-navy-card rounded-2xl shadow-sm border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Empresa</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contacto</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Servicio</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500">Cargando clientes...</td>
                </tr>
              ) : filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500">No se encontraron clientes.</td>
                </tr>
              ) : filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-800/40 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                        {client.name.charAt(0)}
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
                      client.status === 'Activo' ? 'bg-primary/10 text-primary' : 
                      client.status === 'Lead' ? 'bg-amber-500/10 text-amber-500' : 
                      'bg-slate-800 text-slate-500'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        client.status === 'Activo' ? 'bg-primary' : 
                        client.status === 'Lead' ? 'bg-amber-500' : 
                        'bg-slate-500'
                      }`}></span>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => openModal(client)}
                        className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(client.id)}
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

      {/* Modal de Cliente */}
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
                  {editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}
                </h3>
                <button onClick={closeModal} className="text-slate-500 hover:text-white transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nombre Completo</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Empresa</label>
                    <input 
                      type="text" 
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Teléfono</label>
                    <input 
                      type="text" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Servicio</label>
                    <input 
                      type="text" 
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Estado</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-primary focus:border-transparent outline-none appearance-none"
                    >
                      <option value="Lead">Lead</option>
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                  </div>
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
                    {editingClient ? 'Guardar Cambios' : 'Crear Cliente'}
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
