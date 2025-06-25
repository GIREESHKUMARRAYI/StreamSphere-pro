import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Video from './models/Video.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/videoverse';

const sampleVideos = [
  // Top Picks & Latest Releases
  {
    title: 'Inception',
    description: 'A mind-bending thriller about dreams within dreams. A skilled thief steals valuable secrets from deep within the subconscious during the dream state.',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop',
    duration: '2h 28m',
    genre: ['Sci-Fi', 'Thriller', 'Action'],
    language: 'English',
    releaseDate: '2010',
    rating: 8.8,
    videoUrl: 'https://example.com/inception.mp4',
    sections: ['Top Picks', 'Latest', 'Sci-Fi']
  },
  {
    title: 'The Dark Knight',
    description: 'Batman faces the Joker in Gotham City in this epic superhero thriller that redefined the genre.',
    thumbnail: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop',
    duration: '2h 32m',
    genre: ['Action', 'Crime', 'Drama'],
    language: 'English',
    releaseDate: '2008',
    rating: 9.0,
    videoUrl: 'https://example.com/dark-knight.mp4',
    sections: ['Top Picks', 'Action']
  },
  {
    title: 'Parasite',
    description: 'A dark comedy thriller about class conflict that won the Academy Award for Best Picture.',
    thumbnail: 'https://images.unsplash.com/photo-1489599735066-c1bb2f16afb6?w=400&h=600&fit=crop',
    duration: '2h 12m',
    genre: ['Thriller', 'Drama', 'Comedy'],
    language: 'Korean',
    releaseDate: '2019',
    rating: 8.6,
    videoUrl: 'https://example.com/parasite.mp4',
    sections: ['Top Picks', 'Latest', 'International']
  },
  
  // Anime Collection
  {
    title: 'Your Name',
    description: 'A romantic supernatural drama anime film about two teenagers who mysteriously swap bodies.',
    thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    duration: '1h 46m',
    genre: ['Romance', 'Drama', 'Animation'],
    language: 'Japanese',
    releaseDate: '2016',
    rating: 8.2,
    videoUrl: 'https://example.com/your-name.mp4',
    sections: ['Anime', 'Latest', 'Romance']
  },
  {
    title: 'Spirited Away',
    description: 'A girl enters a world ruled by gods and witches in this magical Studio Ghibli masterpiece.',
    thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    duration: '2h 5m',
    genre: ['Animation', 'Family', 'Fantasy'],
    language: 'Japanese',
    releaseDate: '2001',
    rating: 9.3,
    videoUrl: 'https://example.com/spirited-away.mp4',
    sections: ['Anime', 'Kids', 'Animation']
  },
  
  // Kids & Family
  {
    title: 'Frozen 2',
    description: 'Elsa and Anna embark on a new adventure to discover the truth about their kingdom\'s past.',
    thumbnail: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=600&fit=crop',
    duration: '1h 43m',
    genre: ['Animation', 'Family', 'Musical'],
    language: 'English',
    releaseDate: '2019',
    rating: 6.8,
    videoUrl: 'https://example.com/frozen2.mp4',
    sections: ['Kids', 'Animation', 'Latest']
  },
  
  // Action & Thrillers
  {
    title: 'Mad Max: Fury Road',
    description: 'A high-octane action film set in a post-apocalyptic wasteland where gasoline and water are scarce commodities.',
    thumbnail: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop',
    duration: '2h 0m',
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    language: 'English',
    releaseDate: '2015',
    rating: 8.1,
    videoUrl: 'https://example.com/mad-max.mp4',
    sections: ['Action', 'Sci-Fi']
  },
  
  // Sci-Fi & Fantasy
  {
    title: 'Blade Runner 2049',
    description: 'A young blade runner\'s discovery of a long-buried secret leads him to track down former blade runner Rick Deckard.',
    thumbnail: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop',
    duration: '2h 44m',
    genre: ['Sci-Fi', 'Drama', 'Mystery'],
    language: 'English',
    releaseDate: '2017',
    rating: 8.0,
    videoUrl: 'https://example.com/blade-runner.mp4',
    sections: ['Sci-Fi', 'Latest']
  },
  
  // Comedy
  {
    title: 'The Grand Budapest Hotel',
    description: 'A legendary concierge at a famous European hotel between the wars becomes a trusted friend and mentor to a young employee.',
    thumbnail: 'https://images.unsplash.com/photo-1594736797933-d0d92b4e8df0?w=400&h=600&fit=crop',
    duration: '1h 39m',
    genre: ['Comedy', 'Drama', 'Adventure'],
    language: 'English',
    releaseDate: '2014',
    rating: 8.1,
    videoUrl: 'https://example.com/grand-budapest.mp4',
    sections: ['Comedy', 'Latest']
  },
  
  // International Movies
  {
    title: 'Roma',
    description: 'A year in the life of a middle-class family\'s maid in Mexico City in the early 1970s.',
    thumbnail: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=600&fit=crop',
    duration: '2h 15m',
    genre: ['Drama', 'Romance'],
    language: 'Spanish',
    releaseDate: '2018',
    rating: 7.7,
    videoUrl: 'https://example.com/roma.mp4',
    sections: ['International', 'Latest', 'Drama']
  },
  
  // Trending Now
  {
    title: 'Everything Everywhere All at Once',
    description: 'A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence.',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop',
    duration: '2h 19m',
    genre: ['Sci-Fi', 'Comedy', 'Drama'],
    language: 'English',
    releaseDate: '2022',
    rating: 7.8,
    videoUrl: 'https://example.com/everything-everywhere.mp4',
    sections: ['Trending', 'Latest', 'Sci-Fi']
  },
  
  // Original sample videos (keeping for compatibility)
  {
    title: 'The Adventure Begins',
    description: 'An epic journey through unknown lands filled with danger and discovery.',
    thumbnail: 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Adventure',
    duration: '2:15:30',
    genre: ['Action', 'Adventure', 'Fantasy'],
    language: 'English',
    releaseDate: '2024-01-15',
    rating: 8.5,
    videoUrl: 'https://example.com/video1.mp4',
    sections: ['Top Picks', 'Latest']
  },
  {
    title: 'Mystery of the Deep',
    description: 'Exploring the ocean\'s darkest secrets in this thrilling documentary.',
    thumbnail: 'https://via.placeholder.com/300x200/059669/FFFFFF?text=Mystery',
    duration: '1:45:20',
    genre: ['Mystery', 'Thriller', 'Documentary'],
    language: 'English',
    releaseDate: '2024-02-20',
    rating: 7.8,
    videoUrl: 'https://example.com/video2.mp4',
    sections: ['Trending', 'Documentary']
  },
  {
    title: 'Comedy Central',
    description: 'Laugh out loud with the best comedians in this hilarious compilation.',
    thumbnail: 'https://via.placeholder.com/300x200/DC2626/FFFFFF?text=Comedy',
    duration: '1:30:45',
    genre: ['Comedy', 'Entertainment'],
    language: 'English',
    releaseDate: '2024-03-10',
    rating: 8.2,
    videoUrl: 'https://example.com/video3.mp4',
    sections: ['Comedy', 'Popular']
  }
];

async function seedVideos() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    
    // Clear existing videos
    await Video.deleteMany({});
    console.log('Cleared existing videos');
    
    // Insert sample videos
    const videos = await Video.insertMany(sampleVideos);
    console.log(`Inserted ${videos.length} sample videos`);
    
    console.log('\nSample videos:');
    videos.forEach(video => {
      console.log(`- ${video.title} (${video.duration}) - ${video.genre.join(', ')}`);
    });
    
    console.log('\nCategories available:');
    const allSections = [...new Set(videos.flatMap(v => v.sections))];
    allSections.forEach(section => {
      const count = videos.filter(v => v.sections.includes(section)).length;
      console.log(`- ${section}: ${count} videos`);
    });
    
    process.exit(0);
  } catch (err) {
    console.error('Error seeding videos:', err);
    process.exit(1);
  }
}

seedVideos(); 