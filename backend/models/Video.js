import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  thumbnail:   { type: String },
  duration:    { type: String },
  genre:       [String],
  language:    { type: String },
  releaseDate: { type: String },
  rating:      { type: Number },
  videoUrl:    { type: String },
  sections:    [String], // e.g. ['Top Picks', 'Latest']
  featured:    { type: Boolean, default: false }, // Show in hero section
}, { timestamps: true });

export default mongoose.model('Video', VideoSchema); 