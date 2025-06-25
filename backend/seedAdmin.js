import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function seedAdmin() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const existingAdmin = await User.findOne({ role: 'admin' });
  if (existingAdmin) {
    console.log('Admin user already exists:', existingAdmin.email);
    process.exit(0);
  }
  const hashedPassword = await bcrypt.hash('Admin@123', 10);
  const admin = new User({
    username: 'admin',
    email: 'admin@streamsphere.com',
    password: hashedPassword,
    role: 'admin',
    subscription: { plan: 'admin', expiryDate: '' }
  });
  await admin.save();
  console.log('Admin user created: admin@streamsphere.com / Admin@123');
  process.exit(0);
}

seedAdmin().catch(err => { console.error(err); process.exit(1); }); 