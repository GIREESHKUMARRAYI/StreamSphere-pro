import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Edit user (role, subscription)
router.put('/:id', async (req, res) => {
  const { role, subscription } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { role, subscription }, { new: true }).select('-password');
  res.json(user);
});

// Delete user
router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

export default router; 