import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SubscriptionPrompt = ({ onClose }) => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '₹199',
      period: '/month',
      description: 'Perfect for casual viewers',
      features: [
        'HD Quality (720p)',
        'Watch on 1 device',
        'Limited downloads',
        'Ad-supported'
      ],
      icon: Star,
      popular: false
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '₹399',
      period: '/month',
      description: 'Great for families',
      features: [
        'Full HD Quality (1080p)',
        'Watch on 2 devices',
        'Unlimited downloads',
        'Ad-free experience'
      ],
      icon: Zap,
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '₹599',
      period: '/month',
      description: 'Ultimate streaming experience',
      features: [
        '4K Ultra HD Quality',
        'Watch on 4 devices',
        'Unlimited downloads',
        'Ad-free experience',
        'Offline viewing'
      ],
      icon: Crown,
      popular: false
    },
    {
      id: 'ultra',
      name: 'Ultra',
      price: '₹799',
      period: '/month',
      description: 'For the ultimate experience',
      features: [
        '4K Ultra HD + HDR',
        'Watch on unlimited devices',
        'Unlimited downloads',
        'Ad-free experience',
        'Offline viewing',
        'Premium support'
      ],
      icon: Shield,
      popular: false
    }
  ];

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handleGetStarted = () => {
    if (selectedPlan) {
      navigate('/plans', { state: { selectedPlan } });
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Choose Your Plan</h2>
            <p className="text-muted-foreground text-lg">
              Start your streaming journey with the perfect plan for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isSelected = selectedPlan === plan.id;
              
              return (
                <Card 
                  key={plan.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    isSelected ? 'ring-2 ring-primary' : ''
                  } ${plan.popular ? 'border-primary' : ''}`}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {plan.popular && (
                    <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium rounded-t-lg">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-2">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleGetStarted}
              disabled={!selectedPlan}
              className="flex-1 sm:flex-none"
              size="lg"
            >
              Get Started with {selectedPlan ? plans.find(p => p.id === selectedPlan)?.name : 'Plan'}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSkip}
              className="flex-1 sm:flex-none"
              size="lg"
            >
              Skip for Now
            </Button>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              You can change your plan anytime in your account settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPrompt; 