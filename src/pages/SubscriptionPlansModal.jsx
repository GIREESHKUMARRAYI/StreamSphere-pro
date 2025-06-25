import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';
import './SubscriptionPlans.css';

const plans = [
  {
    name: "Basic",
    price: 0,
    features: ["HD Quality (720p)", "Watch on 1 device", "Limited downloads", "Ad-supported"],
    isPopular: false,
  },
  {
    name: "Standard",
    price: 399,
    features: ["Full HD Quality (1080p)", "Watch on 2 devices", "Unlimited downloads", "Ad-free experience"],
    isPopular: true,
  },
  {
    name: "Premium",
    price: 599,
    features: ["4K Ultra HD Quality", "Watch on 4 devices", "Unlimited downloads", "Ad-free experience", "Offline viewing"],
    isPopular: false,
  },
];

export default function SubscriptionPlansModal({ onClose }) {
  const navigate = useNavigate();
  const { updateSubscription, user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleContinueFree = () => {
    if (onClose) onClose();
    navigate("/dashboard");
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan.name);
    // Simulate subscription update
    updateSubscription({
      plan: plan.name,
      planId: plan.name.toLowerCase(),
      price: plan.price,
      billingCycle: 'monthly',
      startDate: new Date().toISOString(),
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
    });
    if (onClose) onClose();
    navigate("/dashboard");
  };

  return (
    <div className="subscription-modal-overlay">
      <div className="subscription-modal-glass">
        <h2 className="subscription-modal-title">Choose Your Plan</h2>
        <div className="subscription-modal-plans">
          {plans.map((plan) => (
            <div
              className={`subscription-modal-card${selectedPlan === plan.name ? ' selected' : ''}`}
              key={plan.name}
            >
              {plan.isPopular && <div className="subscription-modal-popular">Most Popular</div>}
              <div className="subscription-modal-plan-title">{plan.name}</div>
              <div className="subscription-modal-price">
                {plan.price === 0 ? "Free" : `₹${plan.price}/month`}
              </div>
              <ul className="subscription-modal-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <button
                className="subscription-modal-btn"
                onClick={() => handleSelectPlan(plan)}
                disabled={user?.subscription?.plan === plan.name}
              >
                {user?.subscription?.plan === plan.name ? "Current Plan" : "Select Plan"}
              </button>
            </div>
          ))}
        </div>
        <button className="subscription-modal-free-btn" onClick={handleContinueFree}>
          Continue with Free Version
        </button>
      </div>
    </div>
  );
} 