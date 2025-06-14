import { useState } from 'react';
import AdminDashboard from './modules/admin/AdminDashboard';
import AdminLoginPage from './modules/admin/AdminLoginPage';

function App() {
  const [token, setToken] = useState(null);

  // Pour la démo, on ne gère que l'admin
  if (!token) return <AdminLoginPage onLogin={setToken} />;
  return <AdminDashboard token={token} />;
}

export default App;
