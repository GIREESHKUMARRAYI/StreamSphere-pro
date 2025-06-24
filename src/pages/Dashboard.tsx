import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ContentRow from '@/components/ContentRow';
import HorizontalCardRow from '@/components/HorizontalCardRow';
import GenreCard from '@/components/GenreCard';
import LanguageCard from '@/components/LanguageCard';
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

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection featuredVideo={featuredVideo} />

      {/* Content Sections */}
      <div className="relative z-10 -mt-32 pb-20">
        <div className="space-y-8">
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
