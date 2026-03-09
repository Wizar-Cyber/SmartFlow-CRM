import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar_url?: string;
}

export default function TeamSettings() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Miembro'
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await fetch('/api/team');
      const data = await response.json();
      setTeam(data);
    } catch (error) {
      console.error('Error fetching team:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/team/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchTeam();
        setIsModalOpen(false);
        setFormData({ name: '', email: '', role: 'Miembro' });
      }
    } catch (error) {
      console.error('Error inviting member:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-navy-card p-6 rounded-2xl border border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-bold text-lg text-white">Miembros del Equipo</h3>
            <p className="text-sm text-slate-500 mt-1">Gestione quién tiene acceso a su espacio de trabajo.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-navy-dark font-bold rounded-xl hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-lg">person_add</span>
            Invitar Miembro
          </button>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <p className="text-center text-slate-500 py-4">Cargando equipo...</p>
          ) : team.length === 0 ? (
            <p className="text-center text-slate-500 py-4">No hay miembros en el equipo.</p>
          ) : team.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-slate-500 border border-slate-700">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{member.name}</p>
                  <p className="text-xs text-slate-500">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right hidden md:block">
                  <p className="text-xs font-bold text-slate-300">{member.role}</p>
                  <p className={`text-[10px] font-black uppercase ${
                    member.status === 'Activo' ? 'text-emerald-500' : 'text-amber-500'
                  }`}>{member.status}</p>
                </div>
                <button className="p-2 text-slate-500 hover:text-white transition-colors">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-navy-card border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                <h3 className="text-xl font-bold text-white">Invitar Miembro</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nombre</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Nombre completo"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-primary focus:border-transparent outline-none"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Rol</label>
                  <select 
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-primary focus:border-transparent outline-none appearance-none"
                  >
                    <option value="Administrador">Administrador</option>
                    <option value="Gerente">Gerente</option>
                    <option value="Miembro">Miembro</option>
                  </select>
                </div>
                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-all"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
                  >
                    Enviar Invitación
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="bg-navy-card p-6 rounded-2xl border border-slate-800 shadow-sm">
        <h3 className="font-bold text-lg mb-6 text-white">Permisos de Funciones</h3>
        <div className="space-y-4">
          {[
            { role: 'Administrador', desc: 'Acceso total a todas las funcionalidades y configuraciones.' },
            { role: 'Gerente', desc: 'Puede gestionar proyectos, clientes y equipo, pero no facturación.' },
            { role: 'Miembro', desc: 'Acceso limitado a proyectos asignados y documentación básica.' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-900/30 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-bold text-white">{item.role}</p>
                <button className="text-primary text-xs font-bold hover:underline">Editar Permisos</button>
              </div>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
