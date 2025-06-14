// src/modules/admin/AdminLoginPage.js
import { useState } from 'react';
import { login } from '../../api/users';
import './AdminLoginPage.css';

export default function AdminLoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      onLogin(data.access); // Stocke le token dans le parent
    } catch (err) {
      setError('Identifiants invalides');
    }
  };

  return (
    <div className="login-bg">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Connexion Administrateur</h2>
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
        {error && <div className="login-error">{error}</div>}
      </form>
    </div>
  );
}