import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { exportToCSV } from '../utils/export';

interface Payment {
  id: number;
  client_id: number;
  client_name?: string;
  service: string;
  amount: number;
  status: string;
  method: string;
  payment_date: string;
}

interface Client {
  id: number;
  name: string;
}

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [formData, setFormData] = useState({
    client_id: 0,
    service: '',
    amount: 0,
    status: 'Pendiente',
    method: 'Transferencia',
    payment_date: ''
  });

  useEffect(() => {
    fetchPayments();
    fetchClients();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await fetch('/api/payments');
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.service.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'Todos' || payment.status === statusFilter;
    
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
    const url = editingPayment ? `/api/payments/${editingPayment.id}` : '/api/payments';
    const method = editingPayment ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchPayments();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving payment:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este pago?')) return;

    try {
      const response = await fetch(`/api/payments/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchPayments();
      }
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

  const openModal = (payment: Payment | null = null) => {
    if (payment) {
      setEditingPayment(payment);
      setFormData({
        client_id: payment.client_id,
        service: payment.service,
        amount: payment.amount,
        status: payment.status,
        method: payment.method,
        payment_date: payment.payment_date
      });
    } else {
      setEditingPayment(null);
      setFormData({
        client_id: clients[0]?.id || 0,
        service: '',
        amount: 0,
        status: 'Pendiente',
        method: 'Transferencia',
        payment_date: new Date().toISOString().split('T')[0]
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPayment(null);
  };

  const handleExport = () => {
    exportToCSV(filteredPayments, 'pagos', {
      client_name: 'Cliente',
      service: 'Servicio',
      amount: 'Monto',
      status: 'Estado',
      method: 'Método',
      payment_date: 'Fecha',
    });
  };

  const totalIncome = payments.filter(p => p.status === 'Pagado').reduce((acc, p) => acc + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'Pendiente').reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-3xl font-black tracking-tight text-white">Panel Financiero</h3>
          <p className="text-slate-500 mt-1">Monitorea el flujo de caja y estados de facturación en tiempo real.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2.5 px-5 rounded-xl transition-all border border-slate-700 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">download</span>
            <span>Exportar CSV</span>
          </button>
          <button
            onClick={() => openModal()}
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-primary/20 cursor-pointer"
          >
            <span className="material-symbols-outlined">add_card</span>
            <span>Registrar Pago</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-navy-card p-6 rounded-xl border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="p-2 bg-primary/10 text-primary rounded-lg material-symbols-outlined">trending_up</span>
          </div>
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Ingresos Totales</p>
          <h4 className="text-3xl font-bold mt-1 text-white">${totalIncome.toLocaleString()}</h4>
          <p className="text-xs text-slate-500 mt-2">Pagos confirmados</p>
        </div>

        <div className="bg-navy-card p-6 rounded-xl border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="p-2 bg-amber-500/10 text-amber-500 rounded-lg material-symbols-outlined">pending_actions</span>
          </div>
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Pagos Pendientes</p>
          <h4 className="text-3xl font-bold mt-1 text-white">${pendingAmount.toLocaleString()}</h4>
          <p className="text-xs text-slate-500 mt-2">{payments.filter(p => p.status === 'Pendiente').length} facturas por cobrar</p>
        </div>

        <div className="bg-navy-card p-6 rounded-xl border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="p-2 bg-blue-500/10 text-blue-500 rounded-lg material-symbols-outlined">group</span>
          </div>
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Clientes con Pagos</p>
          <h4 className="text-3xl font-bold mt-1 text-white">{new Set(payments.map(p => p.client_id)).size}</h4>
          <p className="text-xs text-slate-500 mt-2">Base de clientes activos</p>
        </div>
      </div>

      <div className="bg-navy-card p-4 rounded-2xl shadow-sm border border-slate-800 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">search</span>
          <input 
            type="text" 
            placeholder="Buscar transacciones..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-xl text-sm focus:ring-primary focus:border-primary text-slate-200 outline-none"
          />
        </div>
        <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-xl">
          {['Todos', 'Pagado', 'Pendiente', 'Cancelado'].map((status) => (
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
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h5 className="font-bold text-white">Historial de Transacciones</h5>
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
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-slate-500">Cargando pagos...</td>
                </tr>
              ) : filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-slate-500">No se encontraron transacciones.</td>
                </tr>
              ) : filteredPayments.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-400">
                        {tx.client_name?.charAt(0) || 'C'}
                      </div>
                      <span className="font-semibold text-sm text-white">{tx.client_name || 'Sin Cliente'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{tx.service}</td>
                  <td className="px-6 py-4 text-sm font-bold text-right text-white">${tx.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 text-[10px] font-black uppercase rounded-full border ${
                      tx.status === 'Pagado' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <span className="material-symbols-outlined text-sm">
                        {tx.method === 'Transferencia' ? 'account_balance' : tx.method === 'Stripe' ? 'credit_card' : 'payments'}
                      </span> 
                      {tx.method}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{tx.payment_date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => openModal(tx)}
                        className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(tx.id)}
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

      {/* Modal de Pago */}
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
                  {editingPayment ? 'Editar Pago' : 'Registrar Pago'}
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
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Servicio / Concepto</label>
                  <input 
                    type="text" 
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Ej: Consultoría, Suscripción..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Monto ($)</label>
                    <input 
                      type="number" 
                      required
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value)})}
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Fecha</label>
                    <input 
                      type="date" 
                      required
                      value={formData.payment_date}
                      onChange={(e) => setFormData({...formData, payment_date: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Estado</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-primary focus:border-transparent outline-none appearance-none"
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Pagado">Pagado</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Método</label>
                    <select 
                      value={formData.method}
                      onChange={(e) => setFormData({...formData, method: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-primary focus:border-transparent outline-none appearance-none"
                    >
                      <option value="Transferencia">Transferencia</option>
                      <option value="Stripe">Stripe</option>
                      <option value="Efectivo">Efectivo</option>
                      <option value="PayPal">PayPal</option>
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
                    {editingPayment ? 'Guardar Cambios' : 'Registrar Pago'}
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
