// src/components/Topbar.js
import '../styles/topbar.css';

export default function Topbar({ onToggleSidebar }) {
  return (
    <header className="topbar">
  
      <div className="topbar-title">Admin Panel</div>
      <div className="topbar-user">
        <span className="avatar">A</span>
      </div>
    </header>
  );
}