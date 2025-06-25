import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './admin.css';

const API_URL = 'http://localhost:5000/api';

const AdminVideoForm = ({ editMode }) => {
  const [form, setForm] = useState({
    title: '', description: '', duration: '', genre: '', language: '', releaseDate: '', rating: '', videoUrl: '', sections: '', thumbnail: null, featured: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (editMode && id) {
      axios.get(`${API_URL}/videos`).then(res => {
        const video = res.data.find(v => v._id === id);
        if (video) setForm({ ...video, genre: video.genre?.join(','), sections: video.sections?.join(','), thumbnail: null, featured: !!video.featured });
      });
    }
  }, [editMode, id]);

  const handleChange = e => {
    const { name, value, files, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : (files ? files[0] : value) }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => v !== undefined && v !== null && data.append(k, v));
      let videoId = id;
      if (editMode) {
        await axios.put(`${API_URL}/videos/${id}`, data);
      } else {
        const res = await axios.post(`${API_URL}/videos`, data);
        videoId = res.data._id;
      }
      navigate(`/admin/preview-video/${videoId}`);
    } catch (err) {
      setError('Failed to save video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: '100%', minHeight: 'calc(100vh - 4rem)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="admin-form" style={{
        width: '100%',
        maxWidth: 500,
        background: 'rgba(24,28,35,0.95)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        borderRadius: 16,
        padding: '2rem',
        margin: '2rem',
        zIndex: 2,
      }}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', fontWeight: 700, letterSpacing: 1 }}>{editMode ? 'Edit Video' : 'Add Video'}</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>Title</label>
          <input name="title" value={form.title} onChange={handleChange} required />
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} required />
          <label>Duration</label>
          <input name="duration" value={form.duration} onChange={handleChange} required />
          <label>Genres (comma separated)</label>
          <input name="genre" value={form.genre} onChange={handleChange} required />
          <label>Language</label>
          <input name="language" value={form.language} onChange={handleChange} required />
          <label>Release Date</label>
          <input name="releaseDate" value={form.releaseDate} onChange={handleChange} required />
          <label>Rating</label>
          <input name="rating" value={form.rating} onChange={handleChange} required type="number" step="0.1" min="0" max="10" />
          <label>Video URL</label>
          <input name="videoUrl" value={form.videoUrl} onChange={handleChange} required />
          <label>Sections (comma separated)</label>
          <input name="sections" value={form.sections} onChange={handleChange} />
          <label>Thumbnail Image</label>
          <input name="thumbnail" type="file" accept="image/*" onChange={handleChange} />
          <div style={{ margin: '1rem 0' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" name="featured" checked={!!form.featured} onChange={handleChange} />
              Show in Hero Section
            </label>
          </div>
          {error && <div style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</div>}
          <button type="submit" disabled={loading} style={{ width: '100%', marginTop: 8, fontSize: 18 }}>
            {loading ? 'Saving...' : (editMode ? 'Update Video' : 'Add Video')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminVideoForm; 