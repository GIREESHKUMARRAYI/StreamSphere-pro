import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

async function testAPI() {
  try {
    console.log('Testing API endpoints...');
    
    // Test videos endpoint
    console.log('\n1. Testing GET /api/videos');
    const videosResponse = await axios.get(`${API_URL}/videos`);
    console.log('Status:', videosResponse.status);
    console.log('Data:', videosResponse.data);
    console.log('Number of videos:', videosResponse.data.length);
    
    // Test adding a video
    console.log('\n2. Testing POST /api/videos');
    const newVideo = {
      title: 'Test Video',
      description: 'A test video for API testing',
      thumbnail: 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Test',
      duration: '1:30:00',
      genre: ['Test', 'Demo'],
      language: 'English',
      releaseDate: '2024-01-01',
      rating: 7.5,
      videoUrl: 'https://example.com/test.mp4',
      sections: ['Test']
    };
    
    const addResponse = await axios.post(`${API_URL}/videos`, newVideo);
    console.log('Status:', addResponse.status);
    console.log('Added video:', addResponse.data);
    
    // Test getting videos again
    console.log('\n3. Testing GET /api/videos again');
    const videosResponse2 = await axios.get(`${API_URL}/videos`);
    console.log('Status:', videosResponse2.status);
    console.log('Number of videos:', videosResponse2.data.length);
    console.log('Videos:', videosResponse2.data.map(v => v.title));
    
  } catch (error) {
    console.error('API Test Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testAPI(); 