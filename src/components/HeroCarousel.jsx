import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './HeroSection.css';

const HeroCarousel = ({ movies }) => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const slideCount = movies.length;

  // Auto-slide every 8 seconds
  useEffect(() => {
    const next = () => setCurrent((prev) => (prev + 1) % slideCount);
    timeoutRef.current = setTimeout(next, 8000);
    return () => clearTimeout(timeoutRef.current);
  }, [current, slideCount]);

  // Manual navigation
  const goTo = (idx) => {
    setCurrent(idx);
    clearTimeout(timeoutRef.current);
  };
  const prevSlide = () => goTo((current - 1 + slideCount) % slideCount);
  const nextSlide = () => goTo((current + 1) % slideCount);

  if (!movies.length) return null;
  const video = movies[current];

  return (
    <div className="herosection-root" style={{ position: 'relative' }}>
      {/* Slides */}
      <div className="herosection-bg">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="herosection-bg-img"
        />
        <div className="herosection-bg-gradient1" />
        <div className="herosection-bg-gradient2" />
      </div>
      <div className="herosection-content">
        <div className="herosection-content-inner">
          <div className="herosection-content-max">
            <h1 className="herosection-title">{video.title}</h1>
            <div className="herosection-rating-genres">
              <div className="herosection-rating">
                <span className="herosection-star">★</span>
                <span className="herosection-rating-value">{video.rating}</span>
              </div>
              <div className="herosection-genres">
                {video.genre?.slice(0, 3).map((genre) => (
                  <span key={genre} className="herosection-genre-badge">{genre}</span>
                ))}
              </div>
            </div>
            <p className="herosection-desc">{video.description}</p>
            <div className="herosection-actions">
              {/* You can add Play, Info, Watchlist buttons here if needed */}
            </div>
          </div>
        </div>
      </div>
      {/* Arrows */}
      <button className="herocarousel-arrow herocarousel-arrow-left" onClick={prevSlide} aria-label="Previous Slide">
        <ChevronLeft size={36} />
      </button>
      <button className="herocarousel-arrow herocarousel-arrow-right" onClick={nextSlide} aria-label="Next Slide">
        <ChevronRight size={36} />
      </button>
      {/* Dots */}
      <div className="herocarousel-dots">
        {movies.map((_, idx) => (
          <button
            key={idx}
            className={`herocarousel-dot${idx === current ? ' active' : ''}`}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel; 