// src/components/Sidebar.js
import './sidebar.css';

const menu = [
 {
    label: 'Statistiques',
    icon: (
      <svg width="22" height="22" fill="none"><rect x="5" y="10" width="3" height="7" rx="1" fill="#fff"/><rect x="9.5" y="6" width="3" height="11" rx="1" fill="#fff"/><rect x="14" y="13" width="3" height="4" rx="1" fill="#fff"/></svg>
    ),
    key: 'stats'
  },
  {
    label: 'Utilisateurs',
    icon: (
      <svg width="22" height="22" fill="none"><path d="M11 13c2.67 0 8 1.34 8 4v2H3v-2c0-2.66 5.33-4 8-4z" fill="#fff"/><circle cx="11" cy="7" r="4" fill="#fff"/></svg>
    ),
    key: 'users'
  },
  {
    label: 'Boutiques',
    icon: (
      <svg width="22" height="22" fill="none"><rect x="3" y="8" width="16" height="9" rx="2" fill="#fff"/><rect x="7" y="3" width="8" height="5" rx="1" fill="#fff"/></svg>
    ),
    key: 'boutiques'
  },
  {
    label: 'Équipements',
    icon: (
      <svg width="22" height="22" fill="none"><circle cx="11" cy="11" r="8" stroke="#fff" strokeWidth="2"/><rect x="10" y="6" width="2" height="6" rx="1" fill="#fff"/></svg>
    ),
    key: 'equipements'
  },
  
  {
    label: 'Incidents',
    icon: (
      <svg width="22" height="22" fill="none"><circle cx="11" cy="11" r="10" stroke="#fff" strokeWidth="2"/><rect x="10" y="6" width="2" height="7" rx="1" fill="#fff"/><rect x="10" y="15" width="2" height="2" rx="1" fill="#fff"/></svg>
    ),
    key: 'incidents'
  },
  {
    label: 'Devis',
    icon: (
      <svg width="22" height="22" fill="none"><rect x="4" y="4" width="14" height="16" rx="2" fill="#fff"/><rect x="7" y="8" width="8" height="2" rx="1" fill="#1a237e"/><rect x="7" y="12" width="8" height="2" rx="1" fill="#1a237e"/></svg>
    ),
    key: 'devis'
  },
  {
    label: 'Paramètres',
    icon: (
      <svg width="22" height="22" fill="none"><circle cx="11" cy="11" r="3" stroke="#fff" strokeWidth="2"/><path d="M11 2v2M11 20v2M4.22 4.22l1.42 1.42M16.36 16.36l1.42 1.42M2 11h2M20 11h2M4.22 17.78l1.42-1.42M16.36 7.64l1.42-1.42" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    key: 'settings'
  }
];

export default function Sidebar({ onNavigate, active, open }) {
  return (
    <aside className={`sidebar${open ? ' open' : ''}`}>
      <div className="sidebar-title">Admin Panel</div>
      <ul>
        {menu.map(item => (
          <li key={item.key} className={active === item.key ? 'active' : ''}>
            <button onClick={() => onNavigate(item.key)}>
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
