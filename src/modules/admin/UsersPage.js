import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash, FaPlus, FaStore, FaTrash, FaUser, FaUserEdit, FaUserTie } from 'react-icons/fa';
import { createUser, deleteUser, fetchUsers, updateUser } from '../../api/users';
import './UsersPage.css';

export default function UsersPage({ token }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({ email: '', role: 'client', password: '' });

  // Chargement initial
  useEffect(() => {
    setLoading(true);
    fetchUsers(token)
      .then(setUsers)
      .catch(() => setError('Erreur de chargement'))
      .finally(() => setLoading(false));
  }, [token]);

  // CRUD handlers
  const handleOpenAdd = () => { setForm({ email: '', role: 'client', password: '' }); setShowAdd(true); };
  const handleAdd = async e => {
    e.preventDefault();
    try {
      await createUser(form, token);
      setShowAdd(false);
      setLoading(true);
      fetchUsers(token).then(setUsers).finally(() => setLoading(false));
    } catch {
      setError('Erreur lors de la création');
    }
  };

  const handleOpenEdit = user => { setEditUser(user); setForm({ ...user, password: '' }); setShowEdit(true); };
  const handleEdit = async e => {
    e.preventDefault();
    try {
      await updateUser(editUser.id, form, token);
      setShowEdit(false);
      setLoading(true);
      fetchUsers(token).then(setUsers).finally(() => setLoading(false));
    } catch {
      setError('Erreur lors de la modification');
    }
  };

  const handleToggleActive = async user => {
    try {
      await updateUser(user.id, { is_active: !user.is_active }, token);
      setLoading(true);
      fetchUsers(token).then(setUsers).finally(() => setLoading(false));
    } catch {
      setError('Erreur lors du changement de statut');
    }
  };

  const handleDelete = async user => {
    if (window.confirm('Supprimer cet utilisateur ?')) {
      try {
        await deleteUser(user.id, token);
        setLoading(true);
        fetchUsers(token).then(setUsers).finally(() => setLoading(false));
      } catch {
        setError('Erreur lors de la suppression');
      }
    }
  };

  // Statistiques
  const stats = [
    { label: 'Techniciens', value: users.filter(u => u.role === 'technicien').length, icon: <FaUserTie color="#3949ab" /> },
    { label: 'Clients', value: users.filter(u => u.role === 'client').length, icon: <FaUser color="#43a047" /> },
    { label: 'Commerçants', value: users.filter(u => u.role === 'commercant').length, icon: <FaStore color="#ffa000" /> },
    { label: 'Actifs', value: users.filter(u => u.is_active).length, icon: <FaEye color="#43a047" /> },
    { label: 'Inactifs', value: users.filter(u => !u.is_active).length, icon: <FaEyeSlash color="#d32f2f" /> },
  ];

  return (
    <div className="users-page">
      <h2 className="users-title">Gestion des utilisateurs</h2>
      <div className="users-stats-cards">
        {stats.map(s => (
          <div className="users-card" key={s.label}>
            <span className="users-card-icon">{s.icon}</span>
            <span>{s.label}</span>
            <b>{s.value}</b>
          </div>
        ))}
      </div>
      <button className="users-add-btn" onClick={handleOpenAdd}>
        <FaPlus style={{ marginRight: 6 }} /> Ajouter un utilisateur
      </button>
      {error && <div className="users-error">{error}</div>}
      <div className="users-table-container">
        {loading ? (
          <div>Chargement...</div>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Rôle</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.email}</td>
                  <td>
                    {u.role === 'technicien' && <FaUserTie color="#3949ab" title="Technicien" />}
                    {u.role === 'client' && <FaUser color="#43a047" title="Client" />}
                    {u.role === 'commercant' && <FaStore color="#ffa000" title="Commerçant" />}
                    <span style={{ marginLeft: 7 }}>{u.role.charAt(0).toUpperCase() + u.role.slice(1)}</span>
                  </td>
                  <td>
                    {u.is_active
                      ? <span className="badge active"><FaEye /> Actif</span>
                      : <span className="badge inactive"><FaEyeSlash /> Inactif</span>
                    }
                  </td>
                  <td>
                    <button className="btn-icon" title="Éditer" onClick={() => handleOpenEdit(u)}><FaUserEdit /></button>
                    <button className="btn-icon" title={u.is_active ? "Désactiver" : "Activer"} onClick={() => handleToggleActive(u)}>
                      {u.is_active ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <button className="btn-icon" title="Supprimer" onClick={() => handleDelete(u)}><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Modal ajout */}
      {showAdd && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Ajouter un utilisateur</h3>
            <form onSubmit={handleAdd}>
              <input type="email" name="email" placeholder="Email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              <input type="password" name="password" placeholder="Mot de passe" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
              <select name="role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                <option value="client">Client</option>
                <option value="technicien">Technicien</option>
                <option value="commercant">Commerçant</option>
              </select>
              <div className="modal-actions">
                <button type="submit" className="btn-modal-ok">Ajouter</button>
                <button type="button" className="btn-modal-cancel" onClick={() => setShowAdd(false)}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal édition */}
      {showEdit && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Modifier l'utilisateur</h3>
            <form onSubmit={handleEdit}>
              <input type="email" name="email" placeholder="Email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              <select name="role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                <option value="client">Client</option>
                <option value="technicien">Technicien</option>
                <option value="commercant">Commerçant</option>
              </select>
              <div className="modal-actions">
                <button type="submit" className="btn-modal-ok">Enregistrer</button>
                <button type="button" className="btn-modal-cancel" onClick={() => setShowEdit(false)}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
