import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    avatar: String,
    dateOfBirth: Date
  },
  subscription: {
    currentPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plan'
    },
    status: {
      type: String,
      enum: ['free', 'active', 'expired', 'cancelled'],
      default: 'free'
    },
    expiryDate: Date,
    autoRenewal: {
      type: Boolean,
      default: true
    }
  },
  payment: {
    razorpayCustomerId: String,
    defaultPaymentMethod: String
  },
  preferences: {
    language: {
      type: String,
      default: 'English'
    },
    quality: {
      type: String,
      enum: ['480p', '720p', '1080p', '4K'],
      default: '720p'
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    subtitles: {
      type: Boolean,
      default: false
    }
  },
  usage: {
    lastLogin: Date,
    totalWatchTime: {
      type: Number,
      default: 0 // in minutes
    },
    devices: [{
      deviceId: String,
      deviceName: String,
      lastUsed: Date
    }]
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isPhoneVerified: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true 
});

// Index for efficient queries
UserSchema.index({ email: 1 });
UserSchema.index({ 'subscription.status': 1 });
UserSchema.index({ 'subscription.expiryDate': 1 });

export default mongoose.model('User', UserSchema); 