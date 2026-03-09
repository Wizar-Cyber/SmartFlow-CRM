import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Contract {
  id: number;
  client_id: number;
  client_name?: string;
  type: string;
  sign_date: string;
  value: number;
  status: string;
}

interface Client {
  id: number;
  name: string;
}

export default function Contracts() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [formData, setFormData] = useState({
    client_id: 0,
    type: '',
    sign_date: '',
    value: 0,
    status: 'Pendiente'
  });

  useEffect(() => {
    fetchContracts();
    fetchClients();
  }, []);

  const fetchContracts = async () => {
    try {
      const response = await fetch('/api/contracts');
      const data = await response.json();
      setContracts(data);
    } catch (error) {
      console.error('Error fetching contracts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = 
      contract.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'Todos' || contract.status === statusFilter;
    
    return matchesSearch && matchesStatus;
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
    const url = editingContract ? `/api/contracts/${editingContract.id}` : '/api/contracts';
    const method = editingContract ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchContracts();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving contract:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este contrato?')) return;

    try {
      const response = await fetch(`/api/contracts/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchContracts();
      }
    } catch (error) {
      console.error('Error deleting contract:', error);
    }
  };

  const openModal = (contract: Contract | null = null) => {
    if (contract) {
      setEditingContract(contract);
      setFormData({
        client_id: contract.client_id,
        type: contract.type,
        sign_date: contract.sign_date,
        value: contract.value,
        status: contract.status
      });
    } else {
      setEditingContract(null);
      setFormData({
        client_id: clients[0]?.id || 0,
        type: '',
        sign_date: '',
        value: 0,
        status: 'Pendiente'
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingContract(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Gestión de Contratos</h1>
          <p className="text-slate-500 text-sm">Administración y seguimiento de documentos legales firmados.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined">add_notes</span>
          <span>Nuevo Contrato</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Contratos', value: contracts.length.toString(), color: 'slate' },
          { label: 'Activos', value: contracts.filter(c => c.status === 'Firmado').length.toString(), color: 'primary' },
          { label: 'En Revisión', value: contracts.filter(c => c.status === 'En Revisión').length.toString(), color: 'orange' },
          { label: 'Valor Total', value: `$${contracts.reduce((acc, c) => acc + c.value, 0).toLocaleString()}`, color: 'slate' },
        ].map((stat, i) => (
          <div key={i} className="bg-navy-card p-4 rounded-xl border border-slate-800 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
            <p className={`text-2xl font-bold mt-1 ${stat.color === 'primary' ? 'text-primary' : stat.color === 'orange' ? 'text-orange-500' : 'text-white'}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-navy-card p-4 rounded-2xl shadow-sm border border-slate-800 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">search</span>
          <input 
            type="text" 
            placeholder="Buscar contratos..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-xl text-sm focus:ring-primary focus:border-primary text-slate-200 outline-none"
          />
        </div>
        <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-xl">
          {['Todos', 'Pendiente', 'En Revisión', 'Firmado'].map((status) => (
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
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500">Cargando contratos...</td>
                </tr>
              ) : filteredContracts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500">No se encontraron contratos.</td>
                </tr>
              ) : filteredContracts.map((contract) => (
                <tr key={contract.id} className="hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-slate-800 flex items-center justify-center text-slate-500 text-xs font-bold">
                        {contract.client_name?.charAt(0) || 'C'}
                      </div>
                      <span className="text-sm font-semibold text-white">{contract.client_name || 'Sin Cliente'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{contract.type}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{contract.sign_date}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-white">${contract.value.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      contract.status === 'Firmado' ? 'bg-emerald-500/20 text-emerald-400' : 
                      contract.status === 'En Revisión' ? 'bg-blue-500/20 text-blue-400' : 
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {contract.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => openModal(contract)}
                        className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(contract.id)}
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

      {/* Modal de Contrato */}
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
                  {editingContract ? 'Editar Contrato' : 'Nuevo Contrato'}
                </h3>
                <button onClick={closeModal} className="text-slate-500 hover:text-white transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Tipo de Contrato</label>
                  <input 
                    type="text" 
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Ej: Servicios IT, Consultoría..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Fecha de Firma</label>
                    <input 
                      type="date" 
                      value={formData.sign_date}
                      onChange={(e) => setFormData({...formData, sign_date: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Valor ($)</label>
                    <input 
                      type="number" 
                      value={formData.value}
                      onChange={(e) => setFormData({...formData, value: parseFloat(e.target.value)})}
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Estado</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-primary focus:border-transparent outline-none appearance-none"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Revisión">En Revisión</option>
                    <option value="Firmado">Firmado</option>
                    <option value="Expirado">Expirado</option>
                  </select>
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
                    {editingContract ? 'Guardar Cambios' : 'Crear Contrato'}
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
