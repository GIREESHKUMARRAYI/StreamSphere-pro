import React from 'react';
import { useContent } from '@/contexts/ContentContext';
import VideoCard from '@/components/VideoCard';
import ContentRow from '@/components/ContentRow';

const TestPage = () => {
  const { videos, loading, error } = useContent();

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Loading videos...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
        <h1>Error loading videos: {error}</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', background: '#0f0f0f', minHeight: '100vh', color: 'white' }}>
      <h1>Video Thumbnail Test Page</h1>
      <p>Total videos loaded: {videos.length}</p>
      
      {videos.length > 0 && (
        <div>
          <h2>Sample Video Data:</h2>
          <pre style={{ background: '#1a1a1a', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
            {JSON.stringify(videos[0], null, 2)}
          </pre>
          
          <h2>All Videos:</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
          
          <h2>Content Row Test:</h2>
          <ContentRow title="Test Videos" videos={videos} />
        </div>
      )}
      
      {videos.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h2>No videos found</h2>
          <p>Check the console for any errors</p>
        </div>
      )}
    </div>
  );
};

export default TestPage; 