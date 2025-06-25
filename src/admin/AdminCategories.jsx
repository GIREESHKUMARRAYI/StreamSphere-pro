import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './admin.css';

const API_URL = 'http://localhost:5000/api';

const AdminCategories = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API_URL}/videos`);
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

  // Get all unique categories from videos
  const getAllCategories = () => {
    const allSections = videos.flatMap(video => video.sections || []);
    return [...new Set(allSections)].sort();
  };

  // Get videos by category
  const getVideosByCategory = (category) => {
    if (category === 'all') return videos;
    return videos.filter(video => video.sections?.includes(category));
  };

  const categories = getAllCategories();
  const filteredVideos = getVideosByCategory(selectedCategory);

  const handleEditVideo = (videoId) => {
    navigate(`/admin/edit-video/${videoId}`);
  };

  if (error) {
    return (
      <div>
        <h2 style={{ marginBottom: '1.5rem' }}>Video Categories</h2>
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
      <h2 style={{ marginBottom: '1.5rem' }}>Video Categories</h2>
      
      {/* Category Filter */}
      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
          Filter by Category:
        </label>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: '0.375rem',
            border: '1px solid #23272f',
            background: '#23272f',
            color: '#fff',
            minWidth: '200px'
          }}
        >
          <option value="all">All Categories ({videos.length} videos)</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category} ({getVideosByCategory(category).length} videos)
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center' }}>Loading categories...</div>
      ) : (
        <div>
          {/* Category Summary */}
          <div style={{ marginBottom: '2rem', padding: '1rem', background: '#181c23', borderRadius: '0.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Category Summary</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {categories.map(category => (
                <div key={category} style={{ 
                  padding: '1rem', 
                  background: '#23272f', 
                  borderRadius: '0.375rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>
                    {getVideosByCategory(category).length}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                    {category}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Videos in Selected Category */}
          <div>
            <h3 style={{ marginBottom: '1rem' }}>
              {selectedCategory === 'all' ? 'All Videos' : `Videos in "${selectedCategory}"`} 
              ({filteredVideos.length})
            </h3>
            
            <div className="admin-video-grid">
              {filteredVideos.map(video => (
                <div key={video._id} className="admin-video-card">
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
                          onClick={() => handleEditVideo(video._id)}
                          className="admin-video-card-btn edit"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="admin-video-card-content">
                    <h3 className="admin-video-card-title">{video.title}</h3>
                    <p className="admin-video-card-duration">{video.duration}</p>
                    <div className="admin-video-card-genres">
                      {video.sections?.map((section, index) => (
                        <span key={index} className="admin-video-card-genre">{section}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories; 