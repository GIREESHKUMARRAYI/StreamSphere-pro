
import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoCard from './VideoCard';

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

interface ContentRowProps {
  title: string;
  videos: Video[];
  size?: 'small' | 'medium' | 'large';
}

const ContentRow: React.FC<ContentRowProps> = ({ title, videos, size = 'medium' }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Approximate width of one card plus margin
      const newScrollLeft = direction === 'left'
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  if (!videos.length) return null;

  return (
    <div className="relative group mb-8">
      {/* Section Title */}
      <h2 className="text-white text-xl font-semibold mb-4 px-4 md:px-8 animate-slide-in">
        {title}
      </h2>

      {/* Scroll Container */}
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <Button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full w-12 h-12 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            variant="ghost"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <Button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full w-12 h-12 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            variant="ghost"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}

        {/* Cards Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 md:px-8 pb-4 custom-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="animate-fade-in-up"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <VideoCard video={video} size={size} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentRow;
