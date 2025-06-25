import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  billingCycle: {
    type: String,
    enum: ['monthly', 'yearly'],
    default: 'monthly'
  },
  features: {
    screens: {
      type: Number,
      required: true
    },
    quality: {
      type: String,
      enum: ['480p', '720p', '1080p', '4K'],
      required: true
    },
    downloads: {
      type: Number,
      default: 0 // 0 means unlimited
    },
    offlineViewing: {
      type: Boolean,
      default: false
    },
    prioritySupport: {
      type: Boolean,
      default: false
    },
    personalizedRecommendations: {
      type: Boolean,
      default: false
    },
    tvAccess: {
      type: Boolean,
      default: false
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  discount: {
    type: Number,
    default: 0 // Percentage discount
  },
  eligibility: {
    studentEmail: {
      type: Boolean,
      default: false
    }
  },
  sortOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Plan', planSchema); 