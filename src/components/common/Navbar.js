// src/components/common/Navbar.js
import './Navbar.css';

export default function Navbar({ userType }) {
  return (
    <nav className="navbar">
      <span className="navbar-title">Dashboard {userType && `- ${userType}`}</span>
    </nav>
  );
}
