import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './admin.css';

const API_URL = 'http://localhost:5000/api';

const AdminUserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);
  const [role, setRole] = useState('user');
  const [plan, setPlan] = useState('');
  const [expiry, setExpiry] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    const res = await axios.get(`${API_URL}/users`);
    setUsers(res.data);
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    await axios.delete(`${API_URL}/users/${id}`);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditUser(user._id);
    setRole(user.role);
    setPlan(user.subscription?.plan || '');
    setExpiry(user.subscription?.expiryDate || '');
  };

  const handleSave = async (id) => {
    await axios.put(`${API_URL}/users/${id}`, {
      role,
      subscription: { plan, expiryDate: expiry }
    });
    setEditUser(null);
    fetchUsers();
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>All Users</h2>
      {loading ? <div>Loading...</div> : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Plan</th>
              <th>Expiry</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {editUser === user._id ? (
                    <select value={role} onChange={e => setRole(e.target.value)}>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : user.role}
                </td>
                <td>
                  {editUser === user._id ? (
                    <input value={plan} onChange={e => setPlan(e.target.value)} />
                  ) : user.subscription?.plan}
                </td>
                <td>
                  {editUser === user._id ? (
                    <input value={expiry} onChange={e => setExpiry(e.target.value)} />
                  ) : user.subscription?.expiryDate}
                </td>
                <td>
                  {editUser === user._id ? (
                    <>
                      <button onClick={() => handleSave(user._id)} style={{ marginRight: 8 }}>Save</button>
                      <button onClick={() => setEditUser(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(user)} style={{ marginRight: 8 }}>Edit</button>
                      <button onClick={() => handleDelete(user._id)} style={{ background: '#23272f' }}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUserTable; 