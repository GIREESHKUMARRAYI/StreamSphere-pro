import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set environment variables
process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/videoverse';
process.env.PORT = process.env.PORT || 5000;
process.env.JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

console.log('Starting backend server...');
console.log('MongoDB URI:', process.env.MONGO_URI);
console.log('Port:', process.env.PORT);

// Start the backend server
const server = spawn('node', ['backend/server.js'], {
  stdio: 'inherit',
  cwd: __dirname
});

server.on('error', (error) => {
  console.error('Failed to start server:', error);
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
}); 