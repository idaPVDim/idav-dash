// src/modules/technicien/TechnicienDashboard.js
import Navbar from '../../components/common/Navbar';
import './TechnicienDashboard.css';

export default function TechnicienDashboard() {
  return (
    <div>
      <Navbar userType="Technicien" />
      <div className="dashboard-container">
        <h1>Tableau de bord Technicien</h1>
        <div className="widget">Installations assignées</div>
        <div className="widget">Interventions à venir</div>
        <div className="widget">Historique des maintenances</div>
      </div>
    </div>
  );
}
