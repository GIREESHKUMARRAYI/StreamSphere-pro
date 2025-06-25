import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import './HorizontalCardRow.css';

const HorizontalCardRow = ({ title, children }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 280;
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

  return (
    <div className="hcr-root">
      <h2 className="hcr-title">
        {title}
      </h2>
      <div className="hcr-inner">
        {showLeftArrow && (
          <Button
            onClick={() => scroll('left')}
            className="hcr-arrow hcr-arrow-left"
            variant="ghost"
          >
            <ChevronLeft className="hcr-arrow-icon" />
          </Button>
        )}
        {showRightArrow && (
          <Button
            onClick={() => scroll('right')}
            className="hcr-arrow hcr-arrow-right"
            variant="ghost"
          >
            <ChevronRight className="hcr-arrow-icon" />
          </Button>
        )}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="hcr-scroll"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCardRow; 