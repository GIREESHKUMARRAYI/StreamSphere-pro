import express from 'express';
import Video from '../models/Video.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer setup for thumbnail upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Helper function to handle genre and sections
const parseArrayField = (field) => {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  if (typeof field === 'string') return field.split(',').map(item => item.trim()).filter(item => item);
  return [];
};

// Helper to parse boolean from FormData
const parseBoolean = (val) => {
  if (typeof val === 'boolean') return val;
  if (typeof val === 'string') return val === 'true' || val === 'on' || val === '1';
  return false;
};

// Get all videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

// Add new video
router.post('/', upload.single('thumbnail'), async (req, res) => {
  try {
    const { title, description, duration, genre, language, releaseDate, rating, videoUrl, sections, featured, thumbnail } = req.body;
    
    // Handle thumbnail: either uploaded file or existing path
    let thumbnailPath = '';
    if (req.file) {
      // New file uploaded
      thumbnailPath = `/uploads/${req.file.filename}`;
    } else if (thumbnail && thumbnail.trim()) {
      // Existing path provided
      thumbnailPath = thumbnail.trim();
    }
    
    const video = new Video({
      title,
      description,
      duration,
      genre: parseArrayField(genre),
      language,
      releaseDate,
      rating,
      videoUrl,
      sections: parseArrayField(sections),
      featured: parseBoolean(featured),
      thumbnail: thumbnailPath
    });
    await video.save();
    res.json(video);
  } catch (error) {
    console.error('Error creating video:', error);
    res.status(500).json({ error: 'Failed to create video' });
  }
});

// Edit video
router.put('/:id', upload.single('thumbnail'), async (req, res) => {
  try {
    const { title, description, duration, genre, language, releaseDate, rating, videoUrl, sections, featured, thumbnail } = req.body;
    const update = {
      title,
      description,
      duration,
      genre: parseArrayField(genre),
      language,
      releaseDate,
      rating,
      videoUrl,
      sections: parseArrayField(sections),
      featured: parseBoolean(featured)
    };
    
    // Handle thumbnail: either uploaded file or existing path
    if (req.file) {
      // New file uploaded
      update.thumbnail = `/uploads/${req.file.filename}`;
    } else if (thumbnail && thumbnail.trim()) {
      // Existing path provided
      update.thumbnail = thumbnail.trim();
    }
    
    const video = await Video.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(video);
  } catch (error) {
    console.error('Error updating video:', error);
    res.status(500).json({ error: 'Failed to update video' });
  }
});

// Delete video
router.delete('/:id', async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: 'Video deleted' });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ error: 'Failed to delete video' });
  }
});

export default router; 