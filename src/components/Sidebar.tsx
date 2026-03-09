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
          <div className="w-10 h-10 bg-primary rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVQR5gsJaTnl8Ryaks0LYjt9ch1jaNn7Rm68h67Ig_0zYz164bXQSgz_KHDwy2K3UOe35jFlFPvb6EpxOptqHpvKUBTQNMBHntJguZe2A8aPXbZ4TPGREx3_1oACaS1ib-cfdYSxfQiTdqhFPYJTES_NZTYIKnS6wXDBSasshNVUOVMcPNLGOtNaZU_mecWr1kzfAqjISdZcynSzIz7ayrPSFw1w8-nBUhapUDrglgaQY62as9n-A6RoxYWs5cVMpYIFQiBNUNN3g" 
              alt="SmartFlow Logo" 
              className="w-full h-full object-contain p-1"
              referrerPolicy="no-referrer"
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
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuATz5mYfGQV6eA9fc7Ycq6EmjoKx3ty7MLyoACSOCZfWgVOyLWASATgCAOSYOlka2mDd0x8-P-ZNqfYb2ZkbrXG_fmCGHQIQJU1Q8-z9RH76E9h5ka0L2nnNU4hS_os10lGQ3fsPQ5GU3yYguzfb2S9uTt7Fp1aUMU38f_A3UGiwVAcyoC1Fj4eqpZn3K_DTywTyep_cglyHuReo4xREr-WxueVdrpS8YJrg1zIADGSllQ623FQLCdjP58pbZEVsjamiLAd7fwC53c" 
            alt="Admin Profile" 
            className="w-10 h-10 rounded-full border-2 border-slate-700 flex-shrink-0"
            referrerPolicy="no-referrer"
          />
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
