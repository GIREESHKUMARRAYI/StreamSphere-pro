import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Tagline from '@/components/Tagline';
import HeroCarousel from '@/components/HeroCarousel';
import ContentRow from '@/components/ContentRow';
import HorizontalCardRow from '@/components/HorizontalCardRow';
import GenreCard from '@/components/GenreCard';
import LanguageCard from '@/components/LanguageCard';
import SubscriptionPrompt from '@/components/SubscriptionPrompt';
import SubscriptionBanner from '@/components/SubscriptionBanner';
import { useContent } from '@/contexts/ContentContext';
import { useAuth } from '@/contexts/AuthContext';
import './Dashboard.css';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { videos, getVideosByCategory, getVideosByGenre } = useContent();
  const { user } = useAuth();
  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState(false);

  // Check if user is new (has no subscription and hasn't seen the prompt)
  useEffect(() => {
    const hasSeenPrompt = localStorage.getItem('subscriptionPromptSeen');
    const isNewUser = !user?.subscription && !hasSeenPrompt;
    
    if (isNewUser) {
      // Show prompt after a short delay
      const timer = setTimeout(() => {
        setShowSubscriptionPrompt(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleCloseSubscriptionPrompt = () => {
    setShowSubscriptionPrompt(false);
    localStorage.setItem('subscriptionPromptSeen', 'true');
  };

  const topPicks = getVideosByCategory('top picks');
  const latestReleases = getVideosByCategory('latest');
  const animeVideos = getVideosByCategory('anime');
  const kidsVideos = getVideosByCategory('kids');
  const actionMovies = getVideosByGenre('action');
  const sciFiMovies = getVideosByGenre('sci-fi');
  const animationMovies = getVideosByGenre('animation');

  // Use featured videos for the hero carousel, fallback to top picks or all videos
  const featuredVideos = videos.filter(v => v.featured);
  const heroSlides = featuredVideos.length > 0 ? featuredVideos : (topPicks.length > 0 ? topPicks : videos);

  // Mock data for genres
  const genres = [
    { name: 'Action', image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=200&fit=crop', count: 250 },
    { name: 'Comedy', image: 'https://images.unsplash.com/photo-1594736797933-d0d92b4e8df0?w=400&h=200&fit=crop', count: 180 },
    { name: 'Drama', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=200&fit=crop', count: 320 },
    { name: 'Horror', image: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=200&fit=crop', count: 95 },
    { name: 'Romance', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop', count: 140 },
    { name: 'Sci-Fi', image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=200&fit=crop', count: 85 },
    { name: 'Thriller', image: 'https://images.unsplash.com/photo-1489599735066-c1bb2f16afb6?w=400&h=200&fit=crop', count: 160 }
  ];

  // Mock data for languages
  const languages = [
    { name: 'Hindi', nativeName: 'हिंदी', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=200&fit=crop', count: 450 },
    { name: 'English', nativeName: 'English', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=200&fit=crop', count: 380 },
    { name: 'Tamil', nativeName: 'தமிழ்', image: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=400&h=200&fit=crop', count: 220 },
    { name: 'Telugu', nativeName: 'తెలుగు', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop', count: 190 },
    { name: 'Bengali', nativeName: 'বাংলা', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=200&fit=crop', count: 150 },
    { name: 'Marathi', nativeName: 'मराठी', image: 'https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?w=400&h=200&fit=crop', count: 120 },
    { name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=200&fit=crop', count: 85 },
    { name: 'Gujarati', nativeName: 'ગુજરાતી', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=200&fit=crop', count: 75 }
  ];

  // Helper to duplicate videos for demo
  const duplicateVideos = (arr, times = 3) => Array(times).fill(arr).flat().map((v, i) => ({ ...v, id: v.id + '-' + i }));

  return (
    <div className="main-content dashboard-root">
      <Navbar />
      <Tagline />
      {/* Hero Carousel */}
      <HeroCarousel movies={heroSlides} />
      {/* Content Sections */}
      <div className="dashboard-content">
        {/* Show subscription banner for users without subscription or Basic plan users */}
        {(!user?.subscription || user?.subscription?.plan === 'Basic') && <SubscriptionBanner />}
        
        {/* Test button for development - remove in production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
            <p className="text-sm text-yellow-800 mb-2">Development Mode - Test Subscription Flow:</p>
            <div className="flex gap-2">
              <Button 
                onClick={() => setShowSubscriptionPrompt(true)}
                variant="outline"
                size="sm"
              >
                Show Subscription Prompt
              </Button>
              <Button 
                onClick={() => {
                  localStorage.removeItem('subscriptionPromptSeen');
                  setShowSubscriptionPrompt(true);
                }}
                variant="outline"
                size="sm"
              >
                Reset & Show Prompt
              </Button>
            </div>
          </div>
        )}
        
        <div className="dashboard-section-list">
          {/* Genre Cards Section */}
          <HorizontalCardRow title="🎭 Browse by Genre">
            {genres.map((genre) => (
              <GenreCard
                key={genre.name}
                name={genre.name}
                image={genre.image}
                count={genre.count}
              />
            ))}
          </HorizontalCardRow>
          {/* Language Cards Section */}
          <HorizontalCardRow title="🌐 Browse by Language">
            {languages.map((language) => (
              <LanguageCard
                key={language.name}
                name={language.name}
                nativeName={language.nativeName}
                image={language.image}
                count={language.count}
              />
            ))}
          </HorizontalCardRow>
          {/* Existing Content Rows */}
          {topPicks.length > 0 && (
            <ContentRow 
              title="🔥 Top Picks for You" 
              videos={duplicateVideos(topPicks, 5)}
              size="large"
            />
          )}
          {latestReleases.length > 0 && (
            <ContentRow 
              title="�� Latest Releases" 
              videos={duplicateVideos(latestReleases, 5)}
              size="medium"
            />
          )}
          {actionMovies.length > 0 && (
            <ContentRow 
              title="💥 Action & Thrillers" 
              videos={duplicateVideos(actionMovies, 5)}
              size="medium"
            />
          )}
          {animeVideos.length > 0 && (
            <ContentRow 
              title="🌸 Anime Collection" 
              videos={duplicateVideos(animeVideos, 5)}
              size="medium"
            />
          )}
          {sciFiMovies.length > 0 && (
            <ContentRow 
              title="🚀 Sci-Fi & Fantasy" 
              videos={duplicateVideos(sciFiMovies, 5)}
              size="medium"
            />
          )}
          {kidsVideos.length > 0 && (
            <ContentRow 
              title="👶 Kids & Family" 
              videos={duplicateVideos(kidsVideos, 5)}
              size="medium"
            />
          )}
          {animationMovies.length > 0 && (
            <ContentRow 
              title="�� Animation Studio" 
              videos={duplicateVideos(animationMovies, 5)}
              size="medium"
            />
          )}
          <ContentRow 
            title="🌍 International Movies" 
            videos={duplicateVideos(videos.filter(v => v.language !== 'English'), 5)} 
            size="medium"
          />
          <ContentRow 
            title="📺 Trending Now" 
            videos={duplicateVideos(videos.slice().reverse(), 5)} 
            size="small"
          />
        </div>
      </div>
      {showSubscriptionPrompt && (
        <SubscriptionPrompt onClose={handleCloseSubscriptionPrompt} />
      )}
    </div>
  );
};

export default Dashboard; 