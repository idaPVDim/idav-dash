// src/modules/admin/AdminUsersPage.js
import { useEffect, useState } from 'react';
import { createUser, fetchUsers } from '../../api/users';

export default function AdminUsersPage({ token }) {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ email: '', role: 'client', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers(token).then(setUsers).catch(() => setError('Erreur chargement'));
  }, [token]);

  const handleCreate = async e => {
    e.preventDefault();
    try {
      await createUser(form, token);
      setForm({ email: '', role: 'client', password: '' });
      fetchUsers(token).then(setUsers);
    } catch {
      setError('Erreur création utilisateur');
    }
  };

  return (
    <div>
      <h3>Utilisateurs</h3>
      <form onSubmit={handleCreate}>
        <input type="email" placeholder="Email" value={form.email}
               onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Mot de passe" value={form.password}
               onChange={e => setForm({ ...form, password: e.target.value })} required />
        <select value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value="client">Client</option>
          <option value="technicien">Technicien</option>
          <option value="commercant">Commerçant</option>
        </select>
        <button type="submit">Créer</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.email} - {u.role}</li>
        ))}
      </ul>
    </div>
  );
}
