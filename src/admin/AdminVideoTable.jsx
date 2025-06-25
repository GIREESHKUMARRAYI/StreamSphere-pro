import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './admin.css';

const API_URL = 'http://localhost:5000/api';

const AdminVideoTable = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const navigate = useNavigate();

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching videos from:', `${API_URL}/videos`);
      const res = await axios.get(`${API_URL}/videos`);
      console.log('Videos response:', res.data);
      setVideos(res.data);
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError(err.message || 'Failed to fetch videos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchVideos(); 
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this video?')) return;
    try {
      await axios.delete(`${API_URL}/videos/${id}`);
      fetchVideos();
    } catch (err) {
      console.error('Error deleting video:', err);
      alert('Failed to delete video');
    }
  };

  const VideoCard = ({ video }) => (
    <div className="admin-video-card">
      <div className="admin-video-card-image">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200/666/fff?text=No+Image';
          }}
        />
        <div className="admin-video-card-overlay">
          <div className="admin-video-card-actions">
            <button 
              onClick={() => navigate(`/admin/edit-video/${video._id}`)}
              className="admin-video-card-btn edit"
            >
              Edit
            </button>
            <button 
              onClick={() => handleDelete(video._id)}
              className="admin-video-card-btn delete"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="admin-video-card-content">
        <h3 className="admin-video-card-title">{video.title}</h3>
        <p className="admin-video-card-duration">{video.duration}</p>
        <div className="admin-video-card-genres">
          {video.genre?.slice(0, 2).map((genre, index) => (
            <span key={index} className="admin-video-card-genre">{genre}</span>
          ))}
          {video.genre?.length > 2 && (
            <span className="admin-video-card-genre">+{video.genre.length - 2}</span>
          )}
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div>
        <h2 style={{ marginBottom: '1.5rem' }}>All Videos</h2>
        <div style={{ color: 'red', padding: '1rem', background: '#fee', borderRadius: '8px' }}>
          Error: {error}
          <br />
          <button onClick={fetchVideos} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>All Videos</h2>
        <div className="admin-view-toggle">
          <button 
            className={viewMode === 'cards' ? 'active' : ''}
            onClick={() => setViewMode('cards')}
          >
            Cards
          </button>
          <button 
            className={viewMode === 'table' ? 'active' : ''}
            onClick={() => setViewMode('table')}
          >
            Table
          </button>
        </div>
      </div>
      
      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center' }}>Loading videos...</div>
      ) : videos.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
          No videos found. 
          <br />
          <button onClick={fetchVideos} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
            Refresh
          </button>
        </div>
      ) : viewMode === 'cards' ? (
        <div className="admin-video-grid">
          {videos.map(video => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Duration</th>
              <th>Genres</th>
              <th>Sections</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map(video => (
              <tr key={video._id}>
                <td>
                  <img 
                    src={video.thumbnail} 
                    alt="thumb" 
                    style={{ width: 80, borderRadius: 8 }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80x60/666/fff?text=No+Image';
                    }}
                  />
                </td>
                <td>{video.title}</td>
                <td>{video.duration}</td>
                <td>{video.genre?.join(', ')}</td>
                <td>{video.sections?.join(', ')}</td>
                <td>
                  <button onClick={() => navigate(`/admin/edit-video/${video._id}`)} style={{ marginRight: 8 }}>Edit</button>
                  <button onClick={() => handleDelete(video._id)} style={{ background: '#23272f' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminVideoTable; 