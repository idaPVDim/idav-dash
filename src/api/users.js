// src/api/users.js
const API_URL = 'http://localhost:8000/user';

// Connexion (login)
export async function login(email, password) {
  const response = await fetch(`${API_URL}/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) throw new Error('Échec de connexion');
  return response.json(); // { access: ..., refresh: ... }
}

// Récupérer la liste des utilisateurs
export async function fetchUsers(token) {
  const response = await fetch(`${API_URL}/`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Impossible de charger les utilisateurs');
  return response.json();
}

// Créer un nouvel utilisateur
export async function createUser(data, token) {
  const response = await fetch(`${API_URL}/register/`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Erreur lors de la création');
  return response.json();
}

// Modifier un utilisateur existant
export async function updateUser(id, data, token) {
  const response = await fetch(`${API_URL}/${id}/`, {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Erreur lors de la modification');
  return response.json();
}

// Supprimer un utilisateur
export async function deleteUser(id, token) {
  const response = await fetch(`${API_URL}/${id}/`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Erreur lors de la suppression');
}
