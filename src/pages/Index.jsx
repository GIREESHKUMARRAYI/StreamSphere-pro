import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Play, Tv, Users, Globe, Star, Zap } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Tagline from '@/components/Tagline';
import './Index.css';

const Index = () => {
  return (
    <div className="main-content index-root">
      <AnimatedBackground />
      <div className="index-content">
        {/* Header */}
        <header className="index-header">
          <div className="index-header-inner">
            <div className="index-logo-group">
              <div className="index-logo-icon">
                <Play className="index-logo-play" fill="white" />
              </div>
              <h1 className="index-logo-title">StreamSphere</h1>
            </div>
            <div className="index-header-actions">
              <Link to="/login">
                <Button variant="ghost" className="index-signin-btn">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="index-getstarted-btn">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </header>
        {/* Hero Section */}
        <section className="index-hero">
          <div className="index-hero-inner">
            <div className="index-hero-anim">
              <h1 className="index-hero-title">
                Stream Without
                <span className="index-hero-title-gradient">Limits</span>
              </h1>
              <Tagline />
              <div className="index-hero-actions">
                <Link to="/signup">
                  <Button size="lg" className="index-hero-start-btn">
                    <Play className="index-hero-play" fill="white" />
                    Start Streaming Now
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="index-hero-signin-btn">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            {/* Features */}
            <div className="index-features">
              <div className="index-feature-card index-feature-delay-1">
                <Tv className="index-feature-icon" />
                <h3 className="index-feature-title">Unlimited Content</h3>
                <p className="index-feature-desc">
                  Access thousands of movies, TV shows, documentaries, and exclusive originals
                </p>
              </div>
              <div className="index-feature-card index-feature-delay-2">
                <Zap className="index-feature-icon" />
                <h3 className="index-feature-title">4K Streaming</h3>
                <p className="index-feature-desc">
                  Enjoy crystal-clear 4K resolution with Dolby Atmos surround sound
                </p>
              </div>
              <div className="index-feature-card index-feature-delay-3">
                <Globe className="index-feature-icon" />
                <h3 className="index-feature-title">Global Library</h3>
                <p className="index-feature-desc">
                  Discover content from around the world in multiple languages
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Stats Section */}
        <section className="index-stats">
          <div className="index-stats-inner">
            <div className="index-stats-grid">
              <div className="index-stat-card">
                <div className="index-stat-value">50M+</div>
                <div className="index-stat-label">Active Users</div>
              </div>
              <div className="index-stat-card index-stat-delay-1">
                <div className="index-stat-value">10K+</div>
                <div className="index-stat-label">Movies & Shows</div>
              </div>
              <div className="index-stat-card index-stat-delay-2">
                <div className="index-stat-value">190+</div>
                <div className="index-stat-label">Countries</div>
              </div>
              <div className="index-stat-card index-stat-delay-3">
                <div className="index-stat-value">4.8★</div>
                <div className="index-stat-label">User Rating</div>
              </div>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="index-cta">
          <div className="index-cta-inner">
            <h2 className="index-cta-title">Ready to Start Your Journey?</h2>
            <p className="index-cta-desc">
              Join millions of viewers who have made StreamSphere their home for entertainment
            </p>
            <Link to="/signup">
              <Button size="lg" className="index-cta-btn">
                <Play className="index-cta-play" fill="white" />
                Start Free Trial
              </Button>
            </Link>
          </div>
        </section>
        {/* Footer */}
        <footer className="index-footer">
          <div className="index-footer-inner">
            <div className="index-footer-logo-group">
              <div className="index-footer-logo-icon">
                <Play className="index-footer-play" fill="white" />
              </div>
              <span className="index-footer-title">StreamSphere</span>
            </div>
            <p className="index-footer-desc">
              Your premium streaming destination for unlimited entertainment
            </p>
            <div className="index-footer-links">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Contact Us</span>
              <span>About</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index; 