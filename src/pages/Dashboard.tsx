
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ContentRow from '@/components/ContentRow';
import { useContent } from '@/contexts/ContentContext';

const Dashboard: React.FC = () => {
  const { videos, getVideosByCategory, getVideosByGenre } = useContent();

  const topPicks = getVideosByCategory('top picks');
  const latestReleases = getVideosByCategory('latest');
  const animeVideos = getVideosByCategory('anime');
  const kidsVideos = getVideosByCategory('kids');
  const actionMovies = getVideosByGenre('action');
  const sciFiMovies = getVideosByGenre('sci-fi');
  const animationMovies = getVideosByGenre('animation');

  const featuredVideo = topPicks[0] || videos[0];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection featuredVideo={featuredVideo} />

      {/* Content Sections */}
      <div className="relative z-10 -mt-32 pb-20">
        <div className="space-y-8">
          {topPicks.length > 0 && (
            <ContentRow 
              title="🔥 Top Picks for You" 
              videos={topPicks} 
              size="large"
            />
          )}
          
          {latestReleases.length > 0 && (
            <ContentRow 
              title="🆕 Latest Releases" 
              videos={latestReleases} 
              size="medium"
            />
          )}
          
          {actionMovies.length > 0 && (
            <ContentRow 
              title="💥 Action & Thrillers" 
              videos={actionMovies} 
              size="medium"
            />
          )}
          
          {animeVideos.length > 0 && (
            <ContentRow 
              title="🌸 Anime Collection" 
              videos={animeVideos} 
              size="medium"
            />
          )}
          
          {sciFiMovies.length > 0 && (
            <ContentRow 
              title="🚀 Sci-Fi & Fantasy" 
              videos={sciFiMovies} 
              size="medium"
            />
          )}
          
          {kidsVideos.length > 0 && (
            <ContentRow 
              title="👶 Kids & Family" 
              videos={kidsVideos} 
              size="medium"
            />
          )}
          
          {animationMovies.length > 0 && (
            <ContentRow 
              title="🎨 Animation Studio" 
              videos={animationMovies} 
              size="medium"
            />
          )}
          
          <ContentRow 
            title="🌍 International Movies" 
            videos={videos.filter(v => v.language !== 'English')} 
            size="medium"
          />
          
          <ContentRow 
            title="📺 Trending Now" 
            videos={videos.slice().reverse()} 
            size="small"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
