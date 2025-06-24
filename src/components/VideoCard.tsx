
import React from 'react';
import { Play, Plus, Check, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContent } from '@/contexts/ContentContext';
import { useNavigate } from 'react-router-dom';

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
}

interface VideoCardProps {
  video: Video;
  size?: 'small' | 'medium' | 'large';
  showInfo?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ 
  video, 
  size = 'medium', 
  showInfo = true 
}) => {
  const { watchlist, addToWatchlist, removeFromWatchlist, addToHistory } = useContent();
  const navigate = useNavigate();
  const isInWatchlist = watchlist.includes(video.id);

  const handlePlay = () => {
    addToHistory(video.id);
    navigate(`/watch/${video.id}`);
  };

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWatchlist) {
      removeFromWatchlist(video.id);
    } else {
      addToWatchlist(video.id);
    }
  };

  const handleMoreInfo = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/video/${video.id}`);
  };

  const sizeClasses = {
    small: 'w-48 h-72',
    medium: 'w-56 h-80',
    large: 'w-64 h-96'
  };

  return (
    <div className={`${sizeClasses[size]} flex-shrink-0 relative group cursor-pointer card-hover`}>
      <div className="relative h-full bg-gray-900 rounded-lg overflow-hidden">
        {/* Thumbnail */}
        <img
          src={video.thumbnail}
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            onClick={handlePlay}
            size="lg"
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white/50 rounded-full w-16 h-16 p-0"
          >
            <Play className="h-6 w-6 ml-1" fill="white" />
          </Button>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
          ★ {video.rating}
        </div>

        {/* Duration Badge */}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
          {video.duration}
        </div>

        {/* Info Panel - Shows on Hover */}
        {showInfo && (
          <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
            <h3 className="text-white font-semibold text-lg mb-1 truncate">
              {video.title}
            </h3>
            <p className="text-gray-300 text-sm mb-2 line-clamp-2">
              {video.description}
            </p>
            
            {/* Genres */}
            <div className="flex flex-wrap gap-1 mb-3">
              {video.genre.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="text-xs bg-red-600/80 text-white px-2 py-1 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                onClick={handlePlay}
                size="sm"
                className="bg-white hover:bg-gray-200 text-black flex-1"
              >
                <Play className="h-4 w-4 mr-1" />
                Play
              </Button>
              
              <Button
                onClick={handleWatchlistToggle}
                size="sm"
                variant="ghost"
                className="bg-black/40 hover:bg-black/60 text-white border border-white/50"
              >
                {isInWatchlist ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </Button>
              
              <Button
                onClick={handleMoreInfo}
                size="sm"
                variant="ghost"
                className="bg-black/40 hover:bg-black/60 text-white border border-white/50"
              >
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
