import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, Star, Crown, GraduationCap, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
import './SubscriptionPlans.css';

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const { user, updateSubscription } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchPlans();
    // Check if user came from subscription prompt with a pre-selected plan
    if (location.state?.selectedPlan) {
      setSelectedPlan(location.state.selectedPlan);
    }
  }, [location.state]);

  const fetchPlans = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/plans`);
      // Defensive: handle both array and object
      setPlans(Array.isArray(response.data) ? response.data : response.data.plans || []);
    } catch (error) {
      console.error('Error fetching plans:', error);
      // Fallback to mock plans if API fails
      setPlans([
        {
          _id: 'basic',
          name: 'Basic',
          displayName: 'Basic Plan',
          price: 199,
          billingCycle: 'monthly',
          features: ['HD Quality (720p)', 'Watch on 1 device', 'Limited downloads', 'Ad-supported'],
          isPopular: false
        },
        {
          _id: 'standard',
          name: 'Standard',
          displayName: 'Standard Plan',
          price: 399,
          billingCycle: 'monthly',
          features: ['Full HD Quality (1080p)', 'Watch on 2 devices', 'Unlimited downloads', 'Ad-free experience'],
          isPopular: true
        },
        {
          _id: 'premium',
          name: 'Premium',
          displayName: 'Premium Plan',
          price: 599,
          billingCycle: 'monthly',
          features: ['4K Ultra HD Quality', 'Watch on 4 devices', 'Unlimited downloads', 'Ad-free experience', 'Offline viewing'],
          isPopular: false
        },
        {
          _id: 'ultra',
          name: 'Ultra',
          displayName: 'Ultra Plan',
          price: 799,
          billingCycle: 'monthly',
          features: ['4K Ultra HD + HDR', 'Watch on unlimited devices', 'Unlimited downloads', 'Ad-free experience', 'Offline viewing', 'Premium support'],
          isPopular: false
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getPlanIcon = (planName) => {
    switch (planName.toLowerCase()) {
      case 'basic':
        return <div className="plan-icon basic">🔹</div>;
      case 'standard':
        return <div className="plan-icon standard">🔸</div>;
      case 'premium':
        return <div className="plan-icon premium">🟣</div>;
      case 'student':
        return <div className="plan-icon student"><GraduationCap size={24} /></div>;
      case 'annual':
        return <div className="plan-icon annual"><Calendar size={24} /></div>;
      default:
        return <div className="plan-icon">📺</div>;
    }
  };

  const getPlanColor = (planName) => {
    switch (planName.toLowerCase()) {
      case 'basic':
        return 'border-blue-500 bg-blue-50';
      case 'standard':
        return 'border-green-500 bg-green-50';
      case 'premium':
        return 'border-purple-500 bg-purple-50';
      case 'student':
        return 'border-orange-500 bg-orange-50';
      case 'annual':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  const calculatePrice = (plan) => {
    if (billingCycle === 'yearly' && plan.billingCycle === 'monthly') {
      return Math.round(plan.price * 12 * 0.8); // 20% discount
    }
    return plan.price;
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleSubscribe = async () => {
    if (!selectedPlan) return;

    try {
      // For testing purposes, we'll simulate a successful subscription
      // In production, this would integrate with Razorpay or Stripe
      
      const subscriptionDetails = {
        plan: selectedPlan.name,
        planId: selectedPlan._id,
        price: selectedPlan.price,
        billingCycle: billingCycle,
        startDate: new Date().toISOString(),
        expiryDate: new Date(Date.now() + (billingCycle === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active'
      };

      // Update user subscription in context
      updateSubscription(subscriptionDetails);

      // Show success message
      alert(`Successfully subscribed to ${selectedPlan.displayName}!`);
      
      // Navigate back to dashboard
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('Failed to subscribe. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="subscription-container">
        <div className="loading">Loading plans...</div>
      </div>
    );
  }

  return (
    <div className="subscription-container">
      <div className="subscription-glass">
        <h2 className="text-3xl font-bold text-center mb-2">Subscription Plans</h2>
        <p className="text-center mb-8 text-gray-400">Unlock unlimited entertainment with our flexible subscription plans</p>
        <div className="subscription-tabs">
          <button
            className={`subscription-tab ${billingCycle === 'monthly' ? 'active' : ''}`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </button>
          <button
            className={`subscription-tab ${billingCycle === 'yearly' ? 'active' : ''}`}
            onClick={() => setBillingCycle('yearly')}
          >
            Annual <span style={{ fontSize: '0.9em', marginLeft: 4 }}>(Save 20%)</span>
          </button>
        </div>
        <div className="subscription-plans">
          {Array.isArray(plans) && plans.length > 0 ? (
            plans.map((plan) => (
              <div
                key={plan._id}
                className={`subscription-card${selectedPlan?._id === plan._id ? ' selected' : ''}`}
                onClick={() => handlePlanSelect(plan)}
                style={{ cursor: 'pointer', position: 'relative' }}
              >
                {plan.isPopular && (
                  <div className="popular-badge">Most Popular</div>
                )}
                <div className="subscription-title">{plan.displayName || plan.name}</div>
                {plan.name === 'Standard' && <div className="subscription-subtitle">Great for families</div>}
                {plan.name === 'Premium' && <div className="subscription-subtitle">Ultimate streaming experience</div>}
                {plan.name === 'Ultra' && <div className="subscription-subtitle">All features unlocked</div>}
                <div className="subscription-price">
                  ₹{billingCycle === 'yearly' ? Math.round(plan.price * 12 * 0.8) : plan.price}
                  <span style={{ fontSize: '1rem', color: '#b3b8d0', marginLeft: 2 }}>/month</span>
                </div>
                <ul className="subscription-features">
                  {plan.features?.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <button
                  className={`subscription-btn${user?.subscription?.planId === plan._id ? ' current' : ''}`}
                  disabled={user?.subscription?.planId === plan._id}
                >
                  {user?.subscription?.planId === plan._id ? 'Current Plan' : 'Select Plan'}
                </button>
              </div>
            ))
          ) : (
            <div>No plans available.</div>
          )}
        </div>
        <div className="subscription-footer">
          100% secure payment method with money back guarantee.
          <button className="subscription-upgrade-btn" onClick={handleSubscribe} disabled={!selectedPlan}>
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans; 