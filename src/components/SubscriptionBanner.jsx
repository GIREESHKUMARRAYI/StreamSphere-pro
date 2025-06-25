import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Zap, Shield, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SubscriptionBanner = () => {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    navigate('/plans');
  };

  return (
    <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Crown className="h-6 w-6 text-primary" />
              <Badge variant="secondary" className="text-sm">
                Upgrade Available
              </Badge>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">
                Unlock Premium Features
              </h3>
              <p className="text-muted-foreground text-sm">
                Get 4K quality, unlimited downloads, and watch on multiple devices
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4" />
              <span>HD Quality</span>
              <Zap className="h-4 w-4" />
              <span>4K Ultra HD</span>
              <Shield className="h-4 w-4" />
              <span>Ad-free</span>
            </div>
            <Button onClick={handleUpgrade} size="sm">
              Upgrade Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionBanner; 