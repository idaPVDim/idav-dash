// src/modules/client/ClientDashboard.js
import Navbar from '../../components/common/Navbar';
import './ClientDashboard.css';

export default function ClientDashboard() {
  return (
    <div>
      <Navbar userType="Client" />
      <div className="dashboard-container">
        <h1>Tableau de bord Client</h1>
        <div className="widget">Mes installations</div>
        <div className="widget">Signaler un incident</div>
        <div className="widget">Historique des interventions</div>
      </div>
    </div>
  );
}
