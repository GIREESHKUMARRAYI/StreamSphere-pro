import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ContentContext = createContext(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

const API_URL = 'http://localhost:5000/api';

export const ContentProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [history, setHistory] = useState([]);

  // Fetch videos from database
  const fetchVideos = async () => {
    try {
      setLoading(true);
      console.log('Fetching videos from API...');
      const response = await axios.get(`${API_URL}/videos`);
      console.log('Raw API response:', response.data);
      
      // Transform database videos to match the expected format
      const transformedVideos = response.data.map(video => ({
        id: video._id,
        title: video.title,
        description: video.description,
        thumbnail: video.thumbnail,
        duration: video.duration,
        genre: video.genre || [],
        language: video.language,
        releaseDate: video.releaseDate,
        rating: video.rating,
        videoUrl: video.videoUrl,
        sections: video.sections || [],
        // Add category flags based on sections
        isTopPick: video.sections?.includes('Top Picks'),
        isLatest: video.sections?.includes('Latest'),
        isAnime: video.sections?.includes('Anime'),
        isKids: video.sections?.includes('Kids'),
        isTrending: video.sections?.includes('Trending')
      }));
      
      console.log('Transformed videos:', transformedVideos);
      console.log('Sample video thumbnail:', transformedVideos[0]?.thumbnail);
      setVideos(transformedVideos);
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError(err.message);
      // Fallback to mock data if API fails
      setVideos(getMockVideos());
    } finally {
      setLoading(false);
    }
  };

  // Fallback mock data
  const getMockVideos = () => [
    {
      id: '1',
      title: 'Inception',
      description: 'A mind-bending thriller about dreams within dreams',
      thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop',
      duration: '2h 28m',
      genre: ['Sci-Fi', 'Thriller'],
      language: 'English',
      releaseDate: '2010',
      rating: 8.8,
      videoUrl: '#',
      isTopPick: true,
      isLatest: false
    },
    {
      id: '2',
      title: 'Your Name',
      description: 'A romantic supernatural drama anime film',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
      duration: '1h 46m',
      genre: ['Romance', 'Drama'],
      language: 'Japanese',
      releaseDate: '2016',
      rating: 8.2,
      videoUrl: '#',
      isAnime: true,
      isLatest: true
    }
  ];

  useEffect(() => {
    fetchVideos();
  }, []);

  const addToWatchlist = (videoId) => {
    setWatchlist(prev => [...new Set([...prev, videoId])]);
  };

  const removeFromWatchlist = (videoId) => {
    setWatchlist(prev => prev.filter(id => id !== videoId));
  };

  const addToHistory = (videoId) => {
    setHistory(prev => [videoId, ...prev.filter(id => id !== videoId)]);
  };

  const searchVideos = (query) => {
    if (!query) return videos;
    return videos.filter(video => 
      video.title.toLowerCase().includes(query.toLowerCase()) ||
      video.genre.some(g => g.toLowerCase().includes(query.toLowerCase())) ||
      video.language.toLowerCase().includes(query.toLowerCase())
    );
  };

  const getVideosByGenre = (genre) => {
    return videos.filter(video => 
      video.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    );
  };

  const getVideosByCategory = (category) => {
    switch (category.toLowerCase()) {
      case 'top picks':
        return videos.filter(video => video.isTopPick || video.sections?.includes('Top Picks'));
      case 'latest':
        return videos.filter(video => video.isLatest || video.sections?.includes('Latest'));
      case 'anime':
        return videos.filter(video => video.isAnime || video.sections?.includes('Anime'));
      case 'kids':
        return videos.filter(video => video.isKids || video.sections?.includes('Kids'));
      case 'trending':
        return videos.filter(video => video.isTrending || video.sections?.includes('Trending'));
      case 'action':
        return videos.filter(video => video.sections?.includes('Action'));
      case 'sci-fi':
        return videos.filter(video => video.sections?.includes('Sci-Fi'));
      case 'comedy':
        return videos.filter(video => video.sections?.includes('Comedy'));
      case 'international':
        return videos.filter(video => video.sections?.includes('International'));
      default:
        return videos;
    }
  };

  const refreshVideos = () => {
    fetchVideos();
  };

  return (
    <ContentContext.Provider value={{
      videos,
      loading,
      error,
      watchlist,
      history,
      addToWatchlist,
      removeFromWatchlist,
      addToHistory,
      searchVideos,
      getVideosByGenre,
      getVideosByCategory,
      refreshVideos
    }}>
      {children}
    </ContentContext.Provider>
  );
}; 