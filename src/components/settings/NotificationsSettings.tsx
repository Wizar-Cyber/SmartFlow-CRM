import React, { useState, useEffect } from 'react';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

export default function NotificationsSettings() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications');
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await fetch(`/api/notifications/${id}/read`, { method: 'PUT' });
      fetchNotifications();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-navy-card p-6 rounded-2xl border border-slate-800 shadow-sm">
        <h3 className="font-bold text-lg mb-6 text-white">Centro de Notificaciones</h3>
        <p className="text-sm text-slate-500 mb-8">Revise las últimas actividades y alertas del sistema.</p>

        <div className="space-y-4">
          {isLoading ? (
            <p className="text-center text-slate-500 py-4">Cargando notificaciones...</p>
          ) : notifications.length === 0 ? (
            <p className="text-center text-slate-500 py-4">No hay notificaciones nuevas.</p>
          ) : notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-4 rounded-xl border transition-all ${
                notif.is_read ? 'bg-slate-900/30 border-slate-800 opacity-60' : 'bg-slate-900/60 border-primary/20 shadow-lg shadow-primary/5'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <span className={`material-symbols-outlined mt-0.5 ${
                    notif.type === 'success' ? 'text-emerald-500' : 
                    notif.type === 'warning' ? 'text-amber-500' : 
                    notif.type === 'error' ? 'text-rose-500' : 'text-blue-500'
                  }`}>
                    {notif.type === 'success' ? 'check_circle' : 
                     notif.type === 'warning' ? 'warning' : 
                     notif.type === 'error' ? 'error' : 'info'}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{notif.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{notif.message}</p>
                    <p className="text-[10px] text-slate-500 mt-2">{new Date(notif.created_at).toLocaleString()}</p>
                  </div>
                </div>
                {!notif.is_read && (
                  <button 
                    onClick={() => markAsRead(notif.id)}
                    className="text-[10px] font-black uppercase text-primary hover:underline"
                  >
                    Marcar como leída
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
