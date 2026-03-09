import { useState, useEffect } from 'react';

interface ActivityLog {
  id: number;
  user: string;
  action: string;
  entity: string;
  detail: string;
  ip?: string;
  created_at: string;
}

const ACTION_STYLES: Record<string, string> = {
  LOGIN:  'bg-blue-500/10 text-blue-400 border-blue-500/20',
  CREATE: 'bg-primary/10 text-primary border-primary/20',
  UPDATE: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  DELETE: 'bg-red-500/10 text-red-400 border-red-500/20',
};

const ACTION_ICONS: Record<string, string> = {
  LOGIN:  'login',
  CREATE: 'add_circle',
  UPDATE: 'edit',
  DELETE: 'delete',
};

export default function ActivityLogs() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('Todos');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/activity?limit=100');
      const data = await res.json();
      setLogs(data);
    } catch (error) {
      console.error('Error fetching activity logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = async () => {
    if (!confirm('¿Eliminar todos los registros de actividad? Esta acción no se puede deshacer.')) return;
    try {
      await fetch('/api/activity', { method: 'DELETE' });
      setLogs([]);
    } catch (error) {
      console.error('Error clearing logs:', error);
    }
  };

  const filtered = filter === 'Todos' ? logs : logs.filter(l => l.action === filter);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">Registros de Actividad</h3>
          <p className="text-slate-500 text-sm mt-0.5">Historial de todas las acciones realizadas en el sistema.</p>
        </div>
        <button
          onClick={handleClear}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl text-sm font-semibold hover:bg-red-500/20 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">delete_sweep</span>
          Limpiar
        </button>
      </div>

      <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-xl w-fit">
        {['Todos', 'LOGIN', 'CREATE', 'UPDATE', 'DELETE'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              filter === f ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <span className="material-symbols-outlined text-4xl text-slate-700">history</span>
            <p className="text-slate-500 mt-2 text-sm">No hay registros de actividad.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-800">
            {filtered.map((log) => (
              <div key={log.id} className="flex items-start gap-4 px-5 py-4 hover:bg-slate-800/30 transition-colors">
                <div className={`mt-0.5 p-1.5 rounded-lg border ${ACTION_STYLES[log.action] || 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                  <span className="material-symbols-outlined text-sm">
                    {ACTION_ICONS[log.action] || 'info'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${ACTION_STYLES[log.action] || 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                      {log.action}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">{log.entity}</span>
                  </div>
                  <p className="text-sm text-white mt-1">{log.detail}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">person</span>
                      {log.user}
                    </span>
                    {log.ip && (
                      <span className="text-[11px] text-slate-600">{log.ip}</span>
                    )}
                  </div>
                </div>
                <span className="text-[11px] text-slate-600 whitespace-nowrap flex-shrink-0 mt-1">
                  {formatDate(log.created_at)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-slate-600">
        Mostrando {filtered.length} de {logs.length} registros. Los logs se almacenan en memoria y se reinician con el servidor.
      </p>
    </div>
  );
}
