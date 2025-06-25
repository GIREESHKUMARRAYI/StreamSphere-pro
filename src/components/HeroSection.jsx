import React from 'react';
import { Play, Info, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContent } from '@/contexts/ContentContext';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = ({ featuredVideo }) => {
  const { watchlist, addToWatchlist, removeFromWatchlist, addToHistory } = useContent();
  const navigate = useNavigate();

  const defaultVideo = {
    id: '1',
    title: 'Inception',
    description: 'A skilled thief, the absolute best in the dangerous art of extraction, steals valuable secrets from deep within the subconscious during the dream state when the mind is at its most vulnerable.',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=600&fit=crop',
    genre: ['Sci-Fi', 'Thriller', 'Action'],
    rating: 8.8
  };

  const video = featuredVideo || defaultVideo;
  const isInWatchlist = watchlist.includes(video.id);

  const handlePlay = () => {
    addToHistory(video.id);
    navigate(`/watch/${video.id}`);
  };

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      removeFromWatchlist(video.id);
    } else {
      addToWatchlist(video.id);
    }
  };

  const handleMoreInfo = () => {
    navigate(`/video/${video.id}`);
  };

  return (
    <div className="herosection-root">
      {/* Background Image */}
      <div className="herosection-bg">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="herosection-bg-img"
        />
        {/* Gradient Overlays */}
        <div className="herosection-bg-gradient1" />
        <div className="herosection-bg-gradient2" />
      </div>
      {/* Content */}
      <div className="herosection-content">
        <div className="herosection-content-inner">
          <div className="herosection-content-max">
            {/* Title */}
            <h1 className="herosection-title">
              {video.title}
            </h1>
            {/* Rating and Genres */}
            <div className="herosection-rating-genres">
              <div className="herosection-rating">
                <span className="herosection-star">★</span>
                <span className="herosection-rating-value">{video.rating}</span>
              </div>
              <div className="herosection-genres">
                {video.genre.slice(0, 3).map((genre) => (
                  <span
                    key={genre}
                    className="herosection-genre-badge"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            {/* Description */}
            <p className="herosection-desc">
              {video.description}
            </p>
            {/* Action Buttons */}
            <div className="herosection-actions">
              <Button
                onClick={handlePlay}
                size="lg"
                className="herosection-play-btn"
              >
                <Play className="herosection-play-icon" fill="black" />
                Play Now
              </Button>
              <Button
                onClick={handleMoreInfo}
                size="lg"
                variant="ghost"
                className="herosection-info-btn"
              >
                <Info className="herosection-info-icon" />
                More Info
              </Button>
              <Button
                onClick={handleWatchlistToggle}
                size="lg"
                variant="ghost"
                className="herosection-watchlist-btn"
              >
                {isInWatchlist ? (
                  <>
                    <Check className="herosection-watchlist-icon" />
                    In Watchlist
                  </>
                ) : (
                  <>
                    <Plus className="herosection-watchlist-icon" />
                    Add to List
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="herosection-scroll-indicator">
        <div className="herosection-scroll-indicator-outer">
          <div className="herosection-scroll-indicator-inner" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 