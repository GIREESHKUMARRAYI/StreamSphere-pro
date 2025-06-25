import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoCard from './VideoCard';
import './ContentRow.css';

const ContentRow = ({ title, videos, size = 'medium' }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
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
    <div className="contentrow-root">
      {/* Section Title */}
      <h2 className="contentrow-title">
        {title}
      </h2>
      {/* Scroll Container */}
      <div className="contentrow-inner">
        {/* Left Arrow */}
        {showLeftArrow && (
          <Button
            onClick={() => scroll('left')}
            className="contentrow-arrow contentrow-arrow-left"
            variant="ghost"
          >
            <ChevronLeft className="contentrow-arrow-icon" />
          </Button>
        )}
        {/* Right Arrow */}
        {showRightArrow && (
          <Button
            onClick={() => scroll('right')}
            className="contentrow-arrow contentrow-arrow-right"
            variant="ghost"
          >
            <ChevronRight className="contentrow-arrow-icon" />
          </Button>
        )}
        {/* Cards Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="contentrow-scroll"
        >
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="contentrow-card-anim"
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