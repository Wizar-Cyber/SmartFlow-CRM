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
import CalendarPage from './pages/CalendarPage';
import Login from './pages/Login';

export type Page = 'dashboard' | 'clients' | 'projects' | 'contracts' | 'payments' | 'documentation' | 'settings' | 'calendar';

export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function App() {
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  // Validar token real al cargar la app
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsValidating(false);
        return;
      }
      try {
        const response = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const user = await response.json();
          setCurrentUser(user);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token');
        }
      } catch {
        localStorage.removeItem('token');
      } finally {
        setIsValidating(false);
      }
    };
    validateToken();
  }, []);

  const handleLogin = (token: string, user: CurrentUser) => {
    localStorage.setItem('token', token);
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  if (isValidating) {
    return (
      <div className="flex h-screen items-center justify-center bg-navy-dark">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-slate-400 text-sm">Verificando sesión...</p>
        </div>
      </div>
    );
  }

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
      case 'calendar': return <CalendarPage />;
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
        <Header activePage={activePage} onPageChange={setActivePage} currentUser={currentUser} />

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
