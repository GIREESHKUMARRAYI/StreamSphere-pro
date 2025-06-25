import React, { useState } from 'react';
import { Play, Plus, Check, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContent } from '@/contexts/ContentContext';
import { useNavigate } from 'react-router-dom';
import './VideoCard.css';

const VideoCard = ({ video, size = 'medium', showInfo = true }) => {
  const { watchlist, addToWatchlist, removeFromWatchlist, addToHistory } = useContent();
  const navigate = useNavigate();
  const isInWatchlist = watchlist.includes(video.id);
  const [imageError, setImageError] = useState(false);

  const handlePlay = () => {
    addToHistory(video.id);
    navigate(`/watch/${video.id}`);
  };

  const handleWatchlistToggle = (e) => {
    e.stopPropagation();
    if (isInWatchlist) {
      removeFromWatchlist(video.id);
    } else {
      addToWatchlist(video.id);
    }
  };

  const handleMoreInfo = (e) => {
    e.stopPropagation();
    navigate(`/video/${video.id}`);
  };

  const handleImageError = () => {
    console.error('Image failed to load:', video.thumbnail);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log('Image loaded successfully:', video.thumbnail);
  };

  const sizeClasses = {
    small: 'videocard-small',
    medium: 'videocard-medium',
    large: 'videocard-large'
  };

  // Fallback image URL
  const fallbackImage = `https://via.placeholder.com/300x200/374151/FFFFFF?text=${encodeURIComponent(video.title)}`;

  return (
    <div className={`videocard-root ${sizeClasses[size]}`}>
      <div className="videocard-inner">
        {/* Thumbnail */}
        <img
          src={imageError ? fallbackImage : video.thumbnail}
          alt={video.title}
          className="videocard-thumbnail"
          loading="lazy"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        {/* Gradient Overlay */}
        <div className="videocard-gradient" />
        {/* Play Button Overlay */}
        <div className="videocard-play-overlay">
          <Button
            onClick={handlePlay}
            size="lg"
            className="videocard-play-btn"
          >
            <Play className="videocard-play-icon" fill="white" />
          </Button>
        </div>
        {/* Rating Badge */}
        <div className="videocard-rating">
          ★ {video.rating}
        </div>
        {/* Duration Badge */}
        <div className="videocard-duration">
          {video.duration}
        </div>
        {/* Info Panel - Shows on Hover */}
        {showInfo && (
          <div className="videocard-info-panel">
            <h3 className="videocard-title">
              {video.title}
            </h3>
            <p className="videocard-desc">
              {video.description}
            </p>
            {/* Genres */}
            <div className="videocard-genres">
              {video.genre.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="videocard-genre-badge"
                >
                  {genre}
                </span>
              ))}
            </div>
            {/* Action Buttons */}
            <div className="videocard-actions">
              <Button
                onClick={handlePlay}
                size="sm"
                className="videocard-action-play"
              >
                <Play className="videocard-action-play-icon" />
                Play
              </Button>
              <Button
                onClick={handleWatchlistToggle}
                size="sm"
                variant="ghost"
                className="videocard-action-watchlist"
              >
                {isInWatchlist ? (
                  <Check className="videocard-action-icon" />
                ) : (
                  <Plus className="videocard-action-icon" />
                )}
              </Button>
              <Button
                onClick={handleMoreInfo}
                size="sm"
                variant="ghost"
                className="videocard-action-info"
              >
                <Info className="videocard-action-icon" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard; 