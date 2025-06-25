import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Mic, User, Bell, Menu, X, Home as HomeIcon, Tv, Zap, Users, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Tooltip } from '@/components/ui/tooltip';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Home', path: '/dashboard', icon: HomeIcon },
    { name: 'Movies', path: '/movies', icon: Tv },
    { name: 'TV Shows', path: '/tv-shows', icon: Tv },
    { name: 'Anime', path: '/anime', icon: Zap },
    { name: 'Kids', path: '/kids', icon: Users },
    { name: 'My List', path: '/watchlist', icon: Star },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      recognition.onstart = () => {
        setIsListening(true);
      };
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        navigate(`/search?q=${encodeURIComponent(transcript)}`);
        setIsListening(false);
      };
      recognition.onerror = () => {
        setIsListening(false);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
      recognition.start();
    } else {
      alert('Speech recognition is not supported in this browser');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar-root">
      <div className="navbar-container">
        <div className="navbar-inner">
          {/* Logo */}
          <div className="navbar-logo-group">
            <Link to="/dashboard" className="navbar-logo-link">
              <div className="navbar-logo-icon">
                <span className="navbar-logo-s">S</span>
              </div>
              <span className="navbar-logo-title">StreamSphere</span>
            </Link>
          </div>
          {/* Icon Menu */}
          <div className="navbar-desktop-menu">
            {menuItems.map((item) => (
              <Tooltip key={item.path} content={item.name} placement="bottom">
                <Link
                  to={item.path}
                  className={`navbar-menu-icon-btn ${location.pathname === item.path ? 'navbar-menu-item-active' : ''}`}
                  aria-label={item.name}
                >
                  <item.icon className="navbar-menu-icon" />
                </Link>
              </Tooltip>
            ))}
          </div>
          {/* Responsive Search Bar */}
          <div className="navbar-search-bar">
            <form onSubmit={handleSearch} className="navbar-search-form">
              <Input
                type="text"
                placeholder="Search movies, shows, anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="navbar-search-input"
              />
              <div className="navbar-search-actions">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={handleVoiceSearch}
                  className={`navbar-voice-btn ${isListening ? 'navbar-voice-btn-listening' : ''}`}
                  aria-label="Voice Search"
                >
                  <Mic className="navbar-voice-icon" />
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  variant="ghost"
                  className="navbar-search-btn"
                  aria-label="Search"
                >
                  <Search className="navbar-search-icon" />
                </Button>
              </div>
            </form>
          </div>
          {/* User Menu & Mobile Controls */}
          <div className="navbar-user-menu">
            <Button
              variant="ghost"
              size="sm"
              className="navbar-search-mobile-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Open Search"
            >
              <Search className="navbar-search-mobile-icon" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="navbar-bell-btn"
              aria-label="Notifications"
            >
              <Bell className="navbar-bell-icon" />
            </Button>
            <div className="navbar-user-group">
              <Button
                variant="ghost"
                size="sm"
                className="navbar-user-btn"
                aria-label="User Menu"
              >
                <User className="navbar-user-icon" />
                {user && <span className="navbar-user-name">{user.username}</span>}
              </Button>
              <div className="navbar-user-dropdown">
                <div className="navbar-user-dropdown-inner">
                  <Link
                    to="/profile"
                    className="navbar-user-dropdown-link"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/account"
                    className="navbar-user-dropdown-link"
                  >
                    Account
                  </Link>
                  <Link
                    to="/plans"
                    className="navbar-user-dropdown-link"
                  >
                    Subscription Plans
                  </Link>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="navbar-user-dropdown-link"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="navbar-user-dropdown-link navbar-user-dropdown-signout"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="navbar-mobile-toggle-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="navbar-mobile-toggle-icon" /> : <Menu className="navbar-mobile-toggle-icon" />}
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Menu & Search Overlay */}
      {isMenuOpen && (
        <div className="navbar-mobile-menu">
          <div className="navbar-mobile-menu-inner">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="navbar-mobile-search-form">
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="navbar-mobile-search-input"
                autoFocus
              />
              <Button type="submit" size="sm" variant="ghost" aria-label="Search">
                <Search />
              </Button>
            </form>
            {/* Mobile Nav Icons */}
            <div className="navbar-mobile-menu-icons">
              {menuItems.map((item) => (
                <Tooltip key={item.path} content={item.name} placement="bottom">
                  <Link
                    to={item.path}
                    className={`navbar-mobile-menu-icon-btn ${location.pathname === item.path ? 'navbar-menu-item-active' : ''}`}
                    aria-label={item.name}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="navbar-menu-icon" />
                  </Link>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 