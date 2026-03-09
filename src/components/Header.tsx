import { useState, useEffect, useRef, useCallback } from 'react';
import { Page, CurrentUser } from '../App';

interface HeaderProps {
  activePage: Page;
  onPageChange: (page: Page) => void;
  currentUser: CurrentUser | null;
}

interface SearchResults {
  clients: { id: number; name: string; company: string; status: string }[];
  projects: { id: number; name: string; client_name: string; status: string }[];
  contracts: { id: number; client_name: string; type: string; status: string }[];
}

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

const pageTitles: Record<Page, string> = {
  dashboard: 'Dashboard',
  clients: 'Gestión de Clientes',
  projects: 'Gestión de Proyectos',
  contracts: 'Gestión de Contratos',
  payments: 'Gestión de Cobros',
  documentation: 'Repositorio de Archivos',
  settings: 'Configuración del Sistema',
  calendar: 'Calendario de Operaciones',
};

const STATUS_COLORS: Record<string, string> = {
  Activo: 'text-primary',
  Lead: 'text-amber-400',
  Inactivo: 'text-slate-500',
  'En Progreso': 'text-blue-400',
  Completado: 'text-primary',
  Firmado: 'text-primary',
  'En Revisión': 'text-amber-400',
};

export default function Header({ activePage, onPageChange, currentUser }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch notifications on mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifPanel(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      const data = await res.json();
      setNotifications(data);
    } catch {
      // silently fail
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await fetch(`/api/notifications/${id}/read`, { method: 'PUT' });
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, is_read: true } : n)
      );
    } catch {
      // silently fail
    }
  };

  const markAllAsRead = async () => {
    const unread = notifications.filter(n => !n.is_read);
    await Promise.all(unread.map(n => markAsRead(n.id)));
  };

  const doSearch = useCallback(async (q: string) => {
    if (q.length < 2) {
      setSearchResults(null);
      return;
    }
    setIsSearching(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setSearchResults(data);
    } catch {
      setSearchResults(null);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setShowSearchDropdown(true);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (value.length < 2) {
      setSearchResults(null);
      return;
    }
    searchTimeout.current = setTimeout(() => doSearch(value), 300);
  };

  const handleResultClick = (page: Page) => {
    onPageChange(page);
    setShowSearchDropdown(false);
    setSearchQuery('');
    setSearchResults(null);
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const hasResults = searchResults &&
    (searchResults.clients.length + searchResults.projects.length + searchResults.contracts.length) > 0;

  const notifTypeIcon = (type: string) => {
    if (type === 'success') return { icon: 'check_circle', cls: 'text-primary bg-primary/10' };
    if (type === 'warning') return { icon: 'warning', cls: 'text-amber-400 bg-amber-400/10' };
    if (type === 'error') return { icon: 'error', cls: 'text-red-400 bg-red-400/10' };
    return { icon: 'info', cls: 'text-blue-400 bg-blue-400/10' };
  };

  return (
    <header className="sticky top-0 z-30 bg-navy-dark/80 backdrop-blur-md border-b border-slate-800 px-8 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-white">{pageTitles[activePage]}</h2>
        <p className="text-sm text-slate-500">
          {currentUser ? `Bienvenido, ${currentUser.name}` : 'Bienvenido de nuevo'} — {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Global Search */}
        <div className="relative hidden md:block" ref={searchRef}>
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
          {isSearching && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              <span className="w-3.5 h-3.5 border-2 border-primary/30 border-t-primary rounded-full animate-spin block"></span>
            </span>
          )}
          <input
            type="text"
            placeholder="Buscar clientes, proyectos, contratos..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => searchQuery.length >= 2 && setShowSearchDropdown(true)}
            className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-primary focus:border-transparent w-72 transition-all outline-none"
          />

          {/* Search Dropdown */}
          {showSearchDropdown && searchQuery.length >= 2 && (
            <div className="absolute top-full mt-2 left-0 w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[480px] overflow-y-auto">
              {!searchResults && !isSearching && (
                <div className="px-4 py-6 text-center text-slate-500 text-sm">Buscando...</div>
              )}
              {searchResults && !hasResults && (
                <div className="px-4 py-6 text-center">
                  <span className="material-symbols-outlined text-3xl text-slate-700">search_off</span>
                  <p className="text-slate-500 text-sm mt-2">Sin resultados para "{searchQuery}"</p>
                </div>
              )}
              {searchResults && hasResults && (
                <div>
                  {searchResults.clients.length > 0 && (
                    <div>
                      <div className="px-4 py-2 bg-slate-800/60 border-b border-slate-700">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-xs">group</span> Clientes
                        </span>
                      </div>
                      {searchResults.clients.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => handleResultClick('clients')}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 transition-colors text-left cursor-pointer"
                        >
                          <div className="w-7 h-7 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {c.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{c.name}</p>
                            <p className="text-xs text-slate-500 truncate">{c.company}</p>
                          </div>
                          <span className={`ml-auto text-[10px] font-bold flex-shrink-0 ${STATUS_COLORS[c.status] || 'text-slate-400'}`}>
                            {c.status}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                  {searchResults.projects.length > 0 && (
                    <div>
                      <div className="px-4 py-2 bg-slate-800/60 border-b border-t border-slate-700">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-xs">work</span> Proyectos
                        </span>
                      </div>
                      {searchResults.projects.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => handleResultClick('projects')}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 transition-colors text-left cursor-pointer"
                        >
                          <div className="w-7 h-7 bg-blue-500/10 text-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-sm">work</span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{p.name}</p>
                            <p className="text-xs text-slate-500 truncate">{p.client_name}</p>
                          </div>
                          <span className={`ml-auto text-[10px] font-bold flex-shrink-0 ${STATUS_COLORS[p.status] || 'text-slate-400'}`}>
                            {p.status}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                  {searchResults.contracts.length > 0 && (
                    <div>
                      <div className="px-4 py-2 bg-slate-800/60 border-b border-t border-slate-700">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-xs">description</span> Contratos
                        </span>
                      </div>
                      {searchResults.contracts.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => handleResultClick('contracts')}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 transition-colors text-left cursor-pointer"
                        >
                          <div className="w-7 h-7 bg-amber-500/10 text-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-sm">description</span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{c.client_name} — {c.type}</p>
                          </div>
                          <span className={`ml-auto text-[10px] font-bold flex-shrink-0 ${STATUS_COLORS[c.status] || 'text-slate-400'}`}>
                            {c.status}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="px-4 py-2 border-t border-slate-800 bg-slate-900/80">
                    <p className="text-[10px] text-slate-600 text-center">
                      {(searchResults.clients.length + searchResults.projects.length + searchResults.contracts.length)} resultado(s) para "{searchQuery}"
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifPanel(!showNotifPanel)}
            className="p-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg relative transition-colors cursor-pointer"
            title="Notificaciones"
            aria-label="Abrir panel de notificaciones"
          >
            <span className="material-symbols-outlined">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 bg-red-500 rounded-full border-2 border-navy-dark flex items-center justify-center text-[9px] font-black text-white px-0.5">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown Panel */}
          {showNotifPanel && (
            <div className="absolute top-full right-0 mt-2 w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">Notificaciones</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-black bg-red-500/20 text-red-400 border border-red-500/20 rounded-full px-1.5 py-0.5">
                      {unreadCount} nueva(s)
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-primary hover:underline font-semibold cursor-pointer"
                  >
                    Marcar todas
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-10 text-center">
                    <span className="material-symbols-outlined text-3xl text-slate-700">notifications_off</span>
                    <p className="text-slate-500 text-sm mt-2">Sin notificaciones</p>
                  </div>
                ) : (
                  notifications.map((n) => {
                    const { icon, cls } = notifTypeIcon(n.type);
                    return (
                      <div
                        key={n.id}
                        className={`flex items-start gap-3 px-4 py-3 border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors ${!n.is_read ? 'bg-slate-800/20' : ''}`}
                      >
                        <div className={`mt-0.5 p-1.5 rounded-lg flex-shrink-0 ${cls}`}>
                          <span className="material-symbols-outlined text-sm">{icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold ${n.is_read ? 'text-slate-400' : 'text-white'}`}>
                            {n.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{n.message}</p>
                        </div>
                        {!n.is_read && (
                          <button
                            onClick={() => markAsRead(n.id)}
                            className="flex-shrink-0 w-2 h-2 mt-2 bg-primary rounded-full hover:bg-primary/60 transition-colors cursor-pointer"
                            title="Marcar como leída"
                            aria-label="Marcar como leída"
                          />
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              <div className="px-4 py-2.5 border-t border-slate-800 bg-slate-900/80">
                <button
                  onClick={() => { onPageChange('settings'); setShowNotifPanel(false); }}
                  className="w-full text-xs text-center text-slate-500 hover:text-primary transition-colors cursor-pointer"
                >
                  Ver todas las notificaciones en Configuración
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <button
          onClick={() => onPageChange('settings')}
          className="p-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors cursor-pointer"
          title="Configuración"
          aria-label="Ir a configuración"
        >
          <span className="material-symbols-outlined">settings</span>
        </button>

        {/* Avatar */}
        <button
          onClick={() => onPageChange('settings')}
          className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 overflow-hidden hover:ring-2 hover:ring-primary transition-all cursor-pointer"
          title={currentUser?.name || 'Perfil'}
          aria-label="Ir a perfil"
        >
          <span className="text-primary font-bold text-sm">{currentUser?.name?.charAt(0) || 'A'}</span>
        </button>
      </div>
    </header>
  );
}
