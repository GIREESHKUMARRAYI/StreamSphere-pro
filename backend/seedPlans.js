import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Plan from './models/Plan.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const plans = [
  {
    name: 'basic',
    displayName: 'Basic Plan',
    price: 99,
    currency: 'INR',
    billingCycle: 'monthly',
    features: {
      screens: 1,
      quality: '480p',
      downloads: 0,
      offlineViewing: false,
      prioritySupport: false,
      personalizedRecommendations: false,
      tvAccess: false
    },
    isActive: true,
    isPopular: false,
    discount: 0,
    sortOrder: 1
  },
  {
    name: 'standard',
    displayName: 'Standard Plan',
    price: 249,
    currency: 'INR',
    billingCycle: 'monthly',
    features: {
      screens: 2,
      quality: '720p',
      downloads: 5,
      offlineViewing: true,
      prioritySupport: true,
      personalizedRecommendations: false,
      tvAccess: false
    },
    isActive: true,
    isPopular: true,
    discount: 0,
    sortOrder: 2
  },
  {
    name: 'premium',
    displayName: 'Premium Plan',
    price: 399,
    currency: 'INR',
    billingCycle: 'monthly',
    features: {
      screens: 4,
      quality: '4K',
      downloads: 0, // unlimited
      offlineViewing: true,
      prioritySupport: true,
      personalizedRecommendations: true,
      tvAccess: true
    },
    isActive: true,
    isPopular: false,
    discount: 0,
    sortOrder: 3
  },
  {
    name: 'student',
    displayName: 'Student Plan',
    price: 59,
    currency: 'INR',
    billingCycle: 'monthly',
    features: {
      screens: 1,
      quality: '720p',
      downloads: 2,
      offlineViewing: false,
      prioritySupport: false,
      personalizedRecommendations: false,
      tvAccess: false
    },
    isActive: true,
    isPopular: false,
    discount: 0,
    eligibility: {
      studentEmail: true
    },
    sortOrder: 4
  },
  {
    name: 'annual-standard',
    displayName: 'Annual Plan (Standard)',
    price: 999,
    currency: 'INR',
    billingCycle: 'yearly',
    features: {
      screens: 2,
      quality: '720p',
      downloads: 5,
      offlineViewing: true,
      prioritySupport: true,
      personalizedRecommendations: false,
      tvAccess: false
    },
    isActive: true,
    isPopular: false,
    discount: 20,
    sortOrder: 5
  }
];

async function seedPlans() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Clear existing plans
    await Plan.deleteMany({});
    console.log('Cleared existing plans');

    // Insert new plans
    const createdPlans = await Plan.insertMany(plans);
    console.log(`Created ${createdPlans.length} plans:`);
    
    createdPlans.forEach(plan => {
      console.log(`- ${plan.displayName}: ₹${plan.price}/${plan.billingCycle}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding plans:', error);
    process.exit(1);
  }
}

seedPlans(); 