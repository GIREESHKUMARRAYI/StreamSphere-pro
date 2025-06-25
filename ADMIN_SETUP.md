# Admin Dashboard Setup Guide

## Issue: Admin Dashboard Videos Not Displaying

The admin dashboard videos are not displaying because the backend server needs to be properly configured and running.

## Prerequisites

1. **MongoDB**: Make sure MongoDB is installed and running locally
2. **Node.js**: Ensure Node.js is installed

## Setup Steps

### 1. Set Environment Variables

Create a `.env` file in the root directory with the following content:

```env
MONGO_URI=mongodb://localhost:27017/videoverse
PORT=5000
JWT_SECRET=your-secret-key-here
```

### 2. Start the Backend Server

Run the backend server using one of these methods:

**Method 1: Using the start script**
```bash
node start-backend.js
```

**Method 2: Direct execution**
```bash
node backend/server.js
```

**Method 3: With environment variables**
```bash
MONGO_URI=mongodb://localhost:27017/videoverse PORT=5000 JWT_SECRET=your-secret-key node backend/server.js
```

### 3. Seed Sample Data

To add sample videos to the database, run:

```bash
node backend/seedVideos.js
```

### 4. Start the Frontend

In a separate terminal, start the frontend:

```bash
npm run dev
```

### 5. Access Admin Dashboard

1. Navigate to the admin dashboard
2. Login with admin credentials (if not created, run `node backend/seedAdmin.js`)
3. Go to the Videos section

## Troubleshooting

### Check if Backend is Running
- Open browser and go to `http://localhost:5000/api/videos`
- You should see a JSON response with videos (or empty array `[]`)

### Check MongoDB Connection
- Ensure MongoDB is running: `mongod`
- Check if the database exists: `mongo videoverse`

### Common Issues

1. **CORS Error**: The backend has CORS enabled, but if you see CORS errors, check the API_URL in AdminVideoTable.jsx
2. **Database Empty**: Run the seed script to add sample videos
3. **Port Already in Use**: Change the PORT in .env file
4. **MongoDB Not Running**: Start MongoDB service

## Admin Credentials

If you need to create an admin user:
```bash
node backend/seedAdmin.js
```

Default admin credentials:
- Email: admin@streamsphere.com
- Password: Admin@123

## API Endpoints

- `GET /api/videos` - Get all videos
- `POST /api/videos` - Add new video
- `PUT /api/videos/:id` - Update video
- `DELETE /api/videos/:id` - Delete video 