
import React from 'react';
import { Play, Info, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContent } from '@/contexts/ContentContext';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  featuredVideo?: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    genre: string[];
    rating: number;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({ featuredVideo }) => {
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
    <div className="relative h-screen max-h-[80vh] min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up">
              {video.title}
            </h1>

            {/* Rating and Genres */}
            <div className="flex items-center space-x-4 mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400">★</span>
                <span className="text-white font-medium">{video.rating}</span>
              </div>
              <div className="flex space-x-2">
                {video.genre.slice(0, 3).map((genre) => (
                  <span
                    key={genre}
                    className="text-gray-300 text-sm bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-200 text-lg leading-relaxed mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {video.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Button
                onClick={handlePlay}
                size="lg"
                className="bg-white hover:bg-gray-200 text-black font-semibold px-8 py-3 text-lg"
              >
                <Play className="h-6 w-6 mr-2" fill="black" />
                Play Now
              </Button>

              <Button
                onClick={handleMoreInfo}
                size="lg"
                variant="ghost"
                className="bg-gray-500/30 hover:bg-gray-500/50 text-white font-semibold px-8 py-3 text-lg backdrop-blur-sm"
              >
                <Info className="h-6 w-6 mr-2" />
                More Info
              </Button>

              <Button
                onClick={handleWatchlistToggle}
                size="lg"
                variant="ghost"
                className="bg-black/30 hover:bg-black/50 text-white font-semibold px-8 py-3 text-lg backdrop-blur-sm border border-white/20"
              >
                {isInWatchlist ? (
                  <>
                    <Check className="h-6 w-6 mr-2" />
                    In Watchlist
                  </>
                ) : (
                  <>
                    <Plus className="h-6 w-6 mr-2" />
                    Add to List
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
