import express from 'express';
import Subscription from '../models/Subscription.js';
import User from '../models/User.js';
import Plan from '../models/Plan.js';
import { authenticateToken } from '../middleware/auth.js';
import Razorpay from 'razorpay';

const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Get user's current subscription
router.get('/current', authenticateToken, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      user: req.user.id,
      status: { $in: ['active', 'pending'] }
    }).populate('plan');

    if (!subscription) {
      return res.json({ 
        status: 'free',
        message: 'No active subscription found' 
      });
    }

    res.json(subscription);
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({ error: 'Failed to fetch subscription' });
  }
});

// Get user's subscription history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user.id })
      .populate('plan')
      .sort({ createdAt: -1 });

    res.json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscription history:', error);
    res.status(500).json({ error: 'Failed to fetch subscription history' });
  }
});

// Create payment order
router.post('/create-order', authenticateToken, async (req, res) => {
  try {
    const { planId, billingCycle = 'monthly' } = req.body;

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    // Calculate amount based on billing cycle
    let amount = plan.price;
    if (billingCycle === 'yearly') {
      amount = plan.price * 12 * 0.8; // 20% discount for yearly
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to paise
      currency: plan.currency,
      receipt: `sub_${Date.now()}`,
      notes: {
        planId: planId,
        userId: req.user.id,
        billingCycle: billingCycle
      }
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      plan: plan
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create payment order' });
  }
});

// Verify payment and create subscription
router.post('/verify-payment', authenticateToken, async (req, res) => {
  try {
    const { orderId, paymentId, signature, planId, billingCycle } = req.body;

    // Verify payment signature
    const text = orderId + '|' + paymentId;
    const crypto = require('crypto');
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');

    if (generated_signature !== signature) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    // Calculate subscription dates
    const startDate = new Date();
    let endDate = new Date();
    
    if (billingCycle === 'yearly') {
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else {
      endDate.setMonth(endDate.getMonth() + 1);
    }

    // Calculate amount
    let amount = plan.price;
    if (billingCycle === 'yearly') {
      amount = plan.price * 12 * 0.8;
    }

    // Create subscription
    const subscription = new Subscription({
      user: req.user.id,
      plan: planId,
      status: 'active',
      startDate,
      endDate,
      amount,
      currency: plan.currency,
      paymentMethod: 'razorpay',
      paymentId,
      autoRenewal: true
    });

    await subscription.save();

    // Update user subscription
    await User.findByIdAndUpdate(req.user.id, {
      'subscription.currentPlan': planId,
      'subscription.status': 'active',
      'subscription.expiryDate': endDate,
      'subscription.autoRenewal': true,
      'payment.razorpayCustomerId': paymentId
    });

    res.json({
      success: true,
      subscription: subscription,
      message: 'Subscription activated successfully'
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

// Cancel subscription
router.post('/cancel', authenticateToken, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      user: req.user.id,
      status: 'active'
    });

    if (!subscription) {
      return res.status(404).json({ error: 'No active subscription found' });
    }

    subscription.status = 'cancelled';
    subscription.cancelledAt = new Date();
    subscription.cancelledBy = req.user.id;
    subscription.autoRenewal = false;
    await subscription.save();

    // Update user subscription status
    await User.findByIdAndUpdate(req.user.id, {
      'subscription.status': 'cancelled',
      'subscription.autoRenewal': false
    });

    res.json({
      success: true,
      message: 'Subscription cancelled successfully'
    });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
});

// Reactivate subscription
router.post('/reactivate', authenticateToken, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      user: req.user.id,
      status: 'cancelled'
    });

    if (!subscription) {
      return res.status(404).json({ error: 'No cancelled subscription found' });
    }

    subscription.status = 'active';
    subscription.autoRenewal = true;
    await subscription.save();

    await User.findByIdAndUpdate(req.user.id, {
      'subscription.status': 'active',
      'subscription.autoRenewal': true
    });

    res.json({
      success: true,
      message: 'Subscription reactivated successfully'
    });
  } catch (error) {
    console.error('Error reactivating subscription:', error);
    res.status(500).json({ error: 'Failed to reactivate subscription' });
  }
});

export default router; 