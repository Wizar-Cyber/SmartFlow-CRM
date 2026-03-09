import { Page } from '../App';

interface HeaderProps {
  activePage: Page;
}

const pageTitles: Record<Page, string> = {
  dashboard: 'Dashboard Overview',
  clients: 'Gerenciamento de Clientes',
  projects: 'Gestión de Proyectos',
  contracts: 'Gestión de Contratos',
  payments: 'Gestión de Cobros',
  documentation: 'Repositorio de Archivos',
  settings: 'Configuración del Sistema',
};

export default function Header({ activePage }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-navy-dark/80 backdrop-blur-md border-b border-slate-800 px-8 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-white">{pageTitles[activePage]}</h2>
        <p className="text-sm text-slate-500">Welcome back, here's what's happening today.</p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
          <input 
            type="text" 
            placeholder="Search data..." 
            className="pl-10 pr-4 py-2 bg-slate-800 border-none rounded-xl text-sm text-white focus:ring-2 focus:ring-primary w-64 transition-all"
          />
        </div>
        
        <button className="p-2 text-slate-500 hover:bg-slate-800 rounded-lg relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-navy-dark"></span>
        </button>
        
        <button className="p-2 text-slate-500 hover:bg-slate-800 rounded-lg">
          <span className="material-symbols-outlined">settings</span>
        </button>
        
        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 overflow-hidden">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaPB-VjC1nSJNhONAqtoZqkvdAQF-J7eEhRa53dmGEpwkNvvkrKESi-xXRlL-z67iUVM2RXwfpTR7X2xh8shuvtVDQq1zJJeT-g6P1yniCsM5522Cctfi-eXpx6TR8wzq0eXTab2DnVlShEwJklYyq1ZjU_3lejzwU7JpYdOv36F471UO-u-KU0Kk3YceLTM_b2mdIFHDjnHd28QCEVt1Oy7adlRZmoqr1lCPPOxRATn7gysqaphQRTPBVuVEIQsjEN2k7bir_GOM" 
            alt="Avatar" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
}
