
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  genre: string[];
  language: string;
  releaseDate: string;
  rating: number;
  videoUrl: string;
  isTopPick?: boolean;
  isLatest?: boolean;
  isAnime?: boolean;
  isKids?: boolean;
}

interface ContentContextType {
  videos: Video[];
  watchlist: string[];
  history: string[];
  addToWatchlist: (videoId: string) => void;
  removeFromWatchlist: (videoId: string) => void;
  addToHistory: (videoId: string) => void;
  searchVideos: (query: string) => Video[];
  getVideosByGenre: (genre: string) => Video[];
  getVideosByCategory: (category: string) => Video[];
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

// Mock data for demonstration
const mockVideos: Video[] = [
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
  },
  {
    id: '3',
    title: 'Frozen 2',
    description: 'Elsa and Anna embark on a new adventure',
    thumbnail: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=600&fit=crop',
    duration: '1h 43m',
    genre: ['Animation', 'Family'],
    language: 'English',
    releaseDate: '2019',
    rating: 6.8,
    videoUrl: '#',
    isKids: true
  },
  {
    id: '4',
    title: 'Parasite',
    description: 'A dark comedy thriller about class conflict',
    thumbnail: 'https://images.unsplash.com/photo-1489599735066-c1bb2f16afb6?w=400&h=600&fit=crop',
    duration: '2h 12m',
    genre: ['Thriller', 'Drama'],
    language: 'Korean',
    releaseDate: '2019',
    rating: 8.6,
    videoUrl: '#',
    isTopPick: true
  },
  {
    id: '5',
    title: 'Spirited Away',
    description: 'A girl enters a world ruled by gods and witches',
    thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    duration: '2h 5m',
    genre: ['Animation', 'Family'],
    language: 'Japanese',
    releaseDate: '2001',
    rating: 9.3,
    videoUrl: '#',
    isAnime: true,
    isKids: true
  },
  {
    id: '6',
    title: 'The Dark Knight',
    description: 'Batman faces the Joker in Gotham City',
    thumbnail: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop',
    duration: '2h 32m',
    genre: ['Action', 'Crime'],
    language: 'English',
    releaseDate: '2008',
    rating: 9.0,
    videoUrl: '#',
    isTopPick: true
  }
];

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
  const [videos] = useState<Video[]>(mockVideos);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  const addToWatchlist = (videoId: string) => {
    setWatchlist(prev => [...new Set([...prev, videoId])]);
  };

  const removeFromWatchlist = (videoId: string) => {
    setWatchlist(prev => prev.filter(id => id !== videoId));
  };

  const addToHistory = (videoId: string) => {
    setHistory(prev => [videoId, ...prev.filter(id => id !== videoId)]);
  };

  const searchVideos = (query: string): Video[] => {
    if (!query) return videos;
    return videos.filter(video => 
      video.title.toLowerCase().includes(query.toLowerCase()) ||
      video.genre.some(g => g.toLowerCase().includes(query.toLowerCase())) ||
      video.language.toLowerCase().includes(query.toLowerCase())
    );
  };

  const getVideosByGenre = (genre: string): Video[] => {
    return videos.filter(video => 
      video.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    );
  };

  const getVideosByCategory = (category: string): Video[] => {
    switch (category.toLowerCase()) {
      case 'top picks':
        return videos.filter(video => video.isTopPick);
      case 'latest':
        return videos.filter(video => video.isLatest);
      case 'anime':
        return videos.filter(video => video.isAnime);
      case 'kids':
        return videos.filter(video => video.isKids);
      default:
        return videos;
    }
  };

  return (
    <ContentContext.Provider value={{
      videos,
      watchlist,
      history,
      addToWatchlist,
      removeFromWatchlist,
      addToHistory,
      searchVideos,
      getVideosByGenre,
      getVideosByCategory
    }}>
      {children}
    </ContentContext.Provider>
  );
};
