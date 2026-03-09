import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Components
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Projects from './pages/Projects';
import Contracts from './pages/Contracts';
import Payments from './pages/Payments';
import Documentation from './pages/Documentation';
import Settings from './pages/Settings';
import Login from './pages/Login';

export type Page = 'dashboard' | 'clients' | 'projects' | 'contracts' | 'payments' | 'documentation' | 'settings';

export default function App() {
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar si hay un token al cargar (Simulación)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'clients': return <Clients />;
      case 'projects': return <Projects />;
      case 'contracts': return <Contracts />;
      case 'payments': return <Payments />;
      case 'documentation': return <Documentation />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-navy-dark">
      <Sidebar 
        activePage={activePage} 
        onPageChange={setActivePage} 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onLogout={handleLogout}
      />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header activePage={activePage} onPageChange={setActivePage} />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-7xl mx-auto w-full"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
