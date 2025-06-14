import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import StatsPage from './StatsPage';
// ... autres imports
import UsersPage from './UsersPage';
export default function AdminDashboard() {
  // On supprime l'état sidebarOpen, la sidebar est toujours ouverte
  const [page, setPage] = useState('stats'); // Statistiques par défaut

  return (
    <div>
      <Topbar />
      {/* SUPPRIMER le ToggleButton ici */}
      <Sidebar onNavigate={setPage} active={page} open={true} />
      <main
        style={{
          marginLeft: 230,
          padding: '2.5rem 3rem',
          background: '#f6f8fa',
          minHeight: '100vh',
          transition: 'margin-left 0.25s'
        }}
      >
        {page === 'stats' && <StatsPage />}
       {page === 'users' && <UsersPage />}
        {page === 'boutiques' && <h1>Gestion des boutiques</h1>}
        {page === 'equipements' && <h1>Gestion des équipements</h1>}
        {page === 'incidents' && <h1>Incidents signalés</h1>}
        {page === 'devis' && <h1>Gestion des devis</h1>}
        {page === 'settings' && <h1>Paramètres</h1>}
      </main>
    </div>
  );
}
