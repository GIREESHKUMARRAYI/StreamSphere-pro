import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CreditCard, Settings, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import axios from 'axios';
import './SubscriptionManager.css';

const SubscriptionManager = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/subscriptions/current`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setSubscription(response.data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your current billing period.')) {
      return;
    }

    setCancelling(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/subscriptions/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      alert('Subscription cancelled successfully. You can reactivate it anytime.');
      fetchSubscription();
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      alert('Failed to cancel subscription. Please try again.');
    } finally {
      setCancelling(false);
    }
  };

  const handleReactivateSubscription = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/subscriptions/reactivate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      alert('Subscription reactivated successfully!');
      fetchSubscription();
    } catch (error) {
      console.error('Error reactivating subscription:', error);
      alert('Failed to reactivate subscription. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'cancelled':
        return <XCircle className="text-red-500" size={20} />;
      case 'expired':
        return <AlertCircle className="text-orange-500" size={20} />;
      default:
        return <AlertCircle className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'expired':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="subscription-manager">
        <div className="loading">Loading subscription details...</div>
      </div>
    );
  }

  if (!subscription || subscription.status === 'free') {
    return (
      <div className="subscription-manager">
        <Card className="no-subscription-card">
          <div className="no-subscription-content">
            <div className="no-subscription-icon">
              <CreditCard size={48} />
            </div>
            <h3>No Active Subscription</h3>
            <p>You don't have an active subscription. Choose a plan to unlock premium features.</p>
            <Button onClick={() => navigate('/plans')} className="upgrade-button">
              View Plans
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="subscription-manager">
      <div className="subscription-header">
        <h2>Subscription Details</h2>
        <div className="subscription-status">
          {getStatusIcon(subscription.status)}
          <Badge className={`status-badge ${getStatusColor(subscription.status)}`}>
            {subscription.status
              ? subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)
              : 'Unknown'}
          </Badge>
        </div>
      </div>

      <div className="subscription-grid">
        <Card className="subscription-info-card">
          <div className="card-header">
            <h3>Current Plan</h3>
          </div>
          <div className="plan-details">
            <div className="plan-name">
              {subscription.plan?.displayName || 'Unknown Plan'}
            </div>
            <div className="plan-price">
              ₹{subscription.amount} / {subscription.currency}
            </div>
            <div className="plan-features">
              {subscription.plan?.features && (
                <div className="features-list">
                  <div className="feature">
                    <span>• {subscription.plan.features.screens} screen{subscription.plan.features.screens > 1 ? 's' : ''}</span>
                  </div>
                  <div className="feature">
                    <span>• {subscription.plan.features.quality} quality</span>
                  </div>
                  {subscription.plan.features.downloads > 0 && (
                    <div className="feature">
                      <span>• {subscription.plan.features.downloads} downloads</span>
                    </div>
                  )}
                  {subscription.plan.features.downloads === 0 && (
                    <div className="feature">
                      <span>• Unlimited downloads</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>

        <Card className="subscription-dates-card">
          <div className="card-header">
            <h3>Billing Information</h3>
          </div>
          <div className="billing-details">
            <div className="billing-item">
              <Calendar size={16} />
              <div className="billing-text">
                <span className="label">Started</span>
                <span className="value">{formatDate(subscription.startDate)}</span>
              </div>
            </div>
            <div className="billing-item">
              <Calendar size={16} />
              <div className="billing-text">
                <span className="label">Expires</span>
                <span className="value">{formatDate(subscription.endDate)}</span>
              </div>
            </div>
            <div className="billing-item">
              <CreditCard size={16} />
              <div className="billing-text">
                <span className="label">Payment Method</span>
                <span className="value">{subscription.paymentMethod}</span>
              </div>
            </div>
            <div className="billing-item">
              <Settings size={16} />
              <div className="billing-text">
                <span className="label">Auto Renewal</span>
                <span className="value">
                  {subscription.autoRenewal ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {subscription.status === 'active' && (
        <Alert className="subscription-alert">
          <AlertCircle size={16} />
          <AlertDescription>
            Your subscription is active. You can cancel anytime and continue using premium features until the end of your billing period.
          </AlertDescription>
        </Alert>
      )}

      {subscription.status === 'cancelled' && (
        <Alert className="subscription-alert cancelled">
          <AlertCircle size={16} />
          <AlertDescription>
            Your subscription has been cancelled. You can reactivate it to continue enjoying premium features.
          </AlertDescription>
        </Alert>
      )}

      <div className="subscription-actions">
        {subscription.status === 'active' && (
          <Button 
            variant="destructive" 
            onClick={handleCancelSubscription}
            disabled={cancelling}
            className="cancel-button"
          >
            {cancelling ? 'Cancelling...' : 'Cancel Subscription'}
          </Button>
        )}

        {subscription.status === 'cancelled' && (
          <Button 
            onClick={handleReactivateSubscription}
            className="reactivate-button"
          >
            Reactivate Subscription
          </Button>
        )}

        <Button 
          variant="outline" 
          onClick={() => navigate('/plans')}
          className="change-plan-button"
        >
          Change Plan
        </Button>
        <Button 
          variant="outline" 
          onClick={() => { localStorage.clear(); navigate('/login'); }}
          className="logout-button"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionManager; 