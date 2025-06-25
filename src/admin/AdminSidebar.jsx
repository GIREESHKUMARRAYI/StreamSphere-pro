import React from 'react';
import { NavLink } from 'react-router-dom';
import './admin.css';

const linkClass = ({ isActive }) => isActive ? 'active' : '';

const AdminSidebar = () => (
  <aside className="admin-sidebar">
    <div className="admin-sidebar-header">
      <h3>Admin Panel</h3>
    </div>
    <nav className="admin-sidebar-nav">
      <NavLink to="/dashboard" className={linkClass}>🏠 Home</NavLink>
      <NavLink to="/admin/videos" className={linkClass}>📹 Videos</NavLink>
      <NavLink to="/admin/categories" className={linkClass}>🏷️ Categories</NavLink>
      <NavLink to="/admin/users" className={linkClass}>👥 Users</NavLink>
      <NavLink to="/admin/add-video" className={linkClass}>➕ Add Video</NavLink>
      <NavLink to="/admin/login" className={linkClass}>🚪 Logout</NavLink>
    </nav>
  </aside>
);

export default AdminSidebar; 