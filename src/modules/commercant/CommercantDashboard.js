// src/modules/commercant/CommercantDashboard.js
import Navbar from '../../components/common/Navbar';
import './CommercantDashboard.css';

export default function CommercantDashboard() {
  return (
    <div>
      <Navbar userType="Commerçant" />
      <div className="dashboard-container">
        <h1>Tableau de bord Commerçant</h1>
        <div className="widget">Mes boutiques</div>
        <div className="widget">Gestion des produits</div>
        <div className="widget">Alertes stock</div>
      </div>
    </div>
  );
}
