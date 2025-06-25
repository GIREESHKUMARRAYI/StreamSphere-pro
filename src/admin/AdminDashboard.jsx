import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminVideoTable from './AdminVideoTable';
import AdminUserTable from './AdminUserTable';
import AdminVideoForm from './AdminVideoForm';
import AdminCategories from './AdminCategories';
import AdminVideoPreview from './AdminVideoPreview';
import AdminLogin from './AdminLogin';
import './admin.css';

const AdminDashboard = () => (
  <div className="admin-dashboard admin-root">
    <AdminSidebar />
    <main className="admin-main">
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/videos" element={<AdminVideoTable />} />
        <Route path="/categories" element={<AdminCategories />} />
        <Route path="/users" element={<AdminUserTable />} />
        <Route path="/add-video" element={<AdminVideoForm />} />
        <Route path="/edit-video/:id" element={<AdminVideoForm editMode />} />
        <Route path="/preview-video/:id" element={<AdminVideoPreview />} />
        <Route path="*" element={<Navigate to="/admin/videos" />} />
      </Routes>
    </main>
  </div>
);

export default AdminDashboard; 