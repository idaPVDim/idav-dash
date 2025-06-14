// src/components/ToggleButton.js

export default function ToggleButton({ onClick, isOpen }) {
  return (
    <button
      className="sidebar-toggle-btn"
      onClick={onClick}
      aria-label="Ouvrir/fermer le menu"
      style={{
        position: 'fixed',
        top: 64,           // juste sous la topbar (ajuste selon la hauteur de ta topbar)
        left: isOpen ? 230 : 0, // décale si sidebar ouverte
        zIndex: 101,
        background: '#1a237e',
        color: '#fff',
        border: 'none',
        borderRadius: '0 6px 6px 0',
        width: 48,
        height: 48,
        boxShadow: '2px 2px 8px rgba(30,36,90,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'left 0.2s'
      }}
    >
      {/* Icône burger */}
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect y="4" width="24" height="2" rx="1" fill="#fff"/>
        <rect y="11" width="24" height="2" rx="1" fill="#fff"/>
        <rect y="18" width="24" height="2" rx="1" fill="#fff"/>
      </svg>
    </button>
  );
}
