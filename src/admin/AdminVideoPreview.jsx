import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './admin.css';

const API_URL = 'http://localhost:5000/api';

const AdminVideoPreview = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${API_URL}/videos`);
        const found = res.data.find(v => v._id === id);
        setVideo(found);
      } catch (err) {
        setError('Failed to load video');
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading preview...</div>;
  if (error || !video) return <div style={{ color: 'red', padding: '2rem', textAlign: 'center' }}>{error || 'Video not found'}</div>;

  return (
    <div className="admin-form" style={{ maxWidth: 600, margin: '2rem auto', background: 'rgba(24,28,35,0.95)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Video Preview</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        <img src={video.thumbnail} alt={video.title} style={{ width: 320, height: 180, objectFit: 'cover', borderRadius: 12, boxShadow: '0 2px 12px #0003' }} />
        <div style={{ width: '100%' }}>
          <h3 style={{ margin: 0 }}>{video.title}</h3>
          <p style={{ color: '#9ca3af', margin: '0.5rem 0' }}>{video.description}</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: 8 }}>
            <span><b>Duration:</b> {video.duration}</span>
            <span><b>Rating:</b> {video.rating}</span>
            <span><b>Language:</b> {video.language}</span>
            <span><b>Release:</b> {video.releaseDate}</span>
          </div>
          <div style={{ marginBottom: 8 }}>
            <b>Genres:</b> {video.genre?.join(', ')}
          </div>
          <div style={{ marginBottom: 8 }}>
            <b>Sections:</b> {video.sections?.join(', ')}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center' }}>
          <button className="admin-video-card-btn edit" onClick={() => navigate(`/admin/edit-video/${video._id}`)}>Edit</button>
          <button className="admin-video-card-btn" style={{ background: '#374151' }} onClick={() => navigate('/admin/videos')}>Back to Videos</button>
        </div>
      </div>
    </div>
  );
};

export default AdminVideoPreview; 