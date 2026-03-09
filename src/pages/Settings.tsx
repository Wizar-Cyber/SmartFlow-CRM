import { useState } from 'react';
import ProfileSettings from '../components/settings/ProfileSettings';
import NotificationsSettings from '../components/settings/NotificationsSettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import BillingSettings from '../components/settings/BillingSettings';
import IntegrationsSettings from '../components/settings/IntegrationsSettings';
import TeamSettings from '../components/settings/TeamSettings';
import ActivityLogs from '../components/settings/ActivityLogs';

type SettingsTab = 'profile' | 'notifications' | 'security' | 'billing' | 'integrations' | 'team' | 'activity';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: 'person' },
    { id: 'notifications', label: 'Notificaciones', icon: 'notifications' },
    { id: 'security', label: 'Seguridad', icon: 'security' },
    { id: 'activity', label: 'Actividad', icon: 'history' },
    { id: 'billing', label: 'Facturación', icon: 'payments' },
    { id: 'integrations', label: 'Integraciones', icon: 'extension' },
    { id: 'team', label: 'Equipo', icon: 'group' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return <ProfileSettings />;
      case 'notifications': return <NotificationsSettings />;
      case 'security': return <SecuritySettings />;
      case 'activity': return <ActivityLogs />;
      case 'billing': return <BillingSettings />;
      case 'integrations': return <IntegrationsSettings />;
      case 'team': return <TeamSettings />;
      default: return <ProfileSettings />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-black text-white">Configuración</h2>
        <p className="text-slate-500 mt-1">Gestione su cuenta, preferencias e integraciones del sistema.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <nav className="space-y-1 sticky top-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-primary text-navy-dark shadow-lg shadow-primary/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="md:col-span-2">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
