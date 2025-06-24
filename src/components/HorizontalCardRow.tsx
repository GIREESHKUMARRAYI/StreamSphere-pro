
import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HorizontalCardRowProps {
  title: string;
  children: React.ReactNode;
}

const HorizontalCardRow: React.FC<HorizontalCardRowProps> = ({ title, children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
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
    <div className="relative group mb-8">
      <h2 className="text-white text-xl font-semibold mb-4 px-4 md:px-8">
        {title}
      </h2>

      <div className="relative">
        {showLeftArrow && (
          <Button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full w-10 h-10 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            variant="ghost"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}

        {showRightArrow && (
          <Button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full w-10 h-10 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            variant="ghost"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        )}

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 md:px-8 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCardRow;
