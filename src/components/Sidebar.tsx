import { Page } from '../App';

interface SidebarProps {
  activePage: Page;
  onPageChange: (page: Page) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onLogout: () => void;
}

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'clients', label: 'Clientes', icon: 'group' },
  { id: 'projects', label: 'Proyectos', icon: 'work' },
  { id: 'contracts', label: 'Contratos', icon: 'description' },
  { id: 'payments', label: 'Pagos', icon: 'payments' },
  { id: 'calendar', label: 'Calendario', icon: 'calendar_month' },
  { id: 'documentation', label: 'Documentación', icon: 'folder' },
  { id: 'settings', label: 'Configuración', icon: 'settings' },
];

export default function Sidebar({ activePage, onPageChange, isCollapsed, onToggleCollapse, onLogout }: SidebarProps) {
  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} flex-shrink-0 bg-navy-dark border-r border-slate-800 flex flex-col hidden md:flex transition-all duration-300 relative`}>
      {/* Toggle Button */}
      <button 
        onClick={onToggleCollapse}
        className="absolute -right-3 top-10 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-navy-dark shadow-lg z-20 hover:scale-110 transition-transform"
      >
        <span className="material-symbols-outlined text-sm font-bold">
          {isCollapsed ? 'chevron_right' : 'chevron_left'}
        </span>
      </button>

      <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} overflow-hidden`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
            <img
              src="/LOgo.png"
              alt="SmartFlow Logo"
              className="w-full h-full object-contain p-1"
            />
          </div>
          {!isCollapsed && (
            <div className="whitespace-nowrap">
              <h1 className="text-white font-bold leading-none">SmartFlow</h1>
              <p className="text-[10px] text-primary uppercase tracking-wider font-semibold">Enterprise CRM</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4 overflow-hidden">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            title={isCollapsed ? item.label : ''}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-3'} py-2.5 rounded-xl transition-all ${
              activePage === item.id
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 overflow-hidden">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 p-2 bg-white/5 rounded-xl border border-white/10'}`}>
          <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary/30 flex-shrink-0 flex items-center justify-center">
            <span className="text-primary font-bold text-sm">A</span>
          </div>
          {!isCollapsed && (
            <>
              <div className="overflow-hidden whitespace-nowrap">
                <p className="text-sm font-semibold text-white truncate">Alex Henderson</p>
                <p className="text-xs text-slate-400 truncate">Admin del Sistema</p>
              </div>
              <button 
                onClick={onLogout}
                className="ml-auto text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-xl">logout</span>
              </button>
            </>
          )}
          {isCollapsed && (
            <button 
              onClick={onLogout}
              className="absolute -top-12 text-slate-400 hover:text-white"
              title="Cerrar Sesión"
            >
              <span className="material-symbols-outlined text-xl">logout</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
