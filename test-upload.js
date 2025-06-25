import axios from 'axios';

async function testUpload() {
  try {
    const videoData = {
      title: "Test Video with Uploaded Image",
      description: "This video uses an uploaded thumbnail image",
      duration: "1h 30m",
      genre: "Action,Adventure",
      language: "English",
      releaseDate: "2024",
      rating: 8.5,
      videoUrl: "https://example.com/test.mp4",
      sections: "Action,Latest",
      thumbnail: "/uploads/1750827289371.jpg"
    };

    const response = await axios.post('http://localhost:5000/api/videos', videoData);
    console.log('Video added successfully:', response.data);
    
    // Test if the image is accessible
    const imageResponse = await axios.get('http://localhost:5000/uploads/1750827289371.jpg');
    console.log('Image accessible:', imageResponse.status === 200);
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testUpload(); 