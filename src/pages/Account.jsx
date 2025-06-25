import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import SubscriptionManager from '@/components/SubscriptionManager';
import { User, Settings, CreditCard, Shield } from 'lucide-react';

const Account = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('subscription');

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="account-container">
      <div className="account-header">
        <h1>Account Settings</h1>
        <p>Manage your account, subscription, and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="account-tabs">
        <TabsList className="tabs-list">
          <TabsTrigger value="subscription" className="tab-trigger">
            <CreditCard size={16} />
            Subscription
          </TabsTrigger>
          <TabsTrigger value="profile" className="tab-trigger">
            <User size={16} />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="tab-trigger">
            <Shield size={16} />
            Security
          </TabsTrigger>
          <TabsTrigger value="preferences" className="tab-trigger">
            <Settings size={16} />
            Preferences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="subscription" className="tab-content">
          <SubscriptionManager />
        </TabsContent>

        <TabsContent value="profile" className="tab-content">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and profile details
              </CardDescription>
            </CardHeader>
            <CardContent className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    defaultValue={user?.profile?.firstName || ''}
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="form-group">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    defaultValue={user?.profile?.lastName || ''}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={user?.email || ''}
                  disabled
                  className="disabled-input"
                />
                <small>Email cannot be changed</small>
              </div>

              <div className="form-group">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  defaultValue={user?.profile?.phone || ''}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  defaultValue={user?.profile?.dateOfBirth || ''}
                />
              </div>

              <Button className="save-button">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="tab-content">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="security-content">
              <div className="security-section">
                <h3>Change Password</h3>
                <div className="form-group">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="Enter current password"
                  />
                </div>
                <div className="form-group">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                  />
                </div>
                <div className="form-group">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>
                <Button className="change-password-button">
                  Change Password
                </Button>
              </div>

              <div className="security-section">
                <h3>Two-Factor Authentication</h3>
                <p>Add an extra layer of security to your account</p>
                <Button variant="outline" className="setup-2fa-button">
                  Setup 2FA
                </Button>
              </div>

              <div className="security-section">
                <h3>Active Sessions</h3>
                <p>Manage your active login sessions</p>
                <Button variant="outline" className="view-sessions-button">
                  View Sessions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="tab-content">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Customize your streaming experience and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="preferences-content">
              <div className="preferences-section">
                <h3>Streaming Quality</h3>
                <div className="form-group">
                  <Label htmlFor="quality">Default Quality</Label>
                  <select id="quality" className="select-input" defaultValue={user?.preferences?.quality || '720p'}>
                    <option value="480p">480p (SD)</option>
                    <option value="720p">720p (HD)</option>
                    <option value="1080p">1080p (Full HD)</option>
                    <option value="4K">4K (Ultra HD)</option>
                  </select>
                </div>
              </div>

              <div className="preferences-section">
                <h3>Language</h3>
                <div className="form-group">
                  <Label htmlFor="language">Preferred Language</Label>
                  <select id="language" className="select-input" defaultValue={user?.preferences?.language || 'English'}>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </div>
              </div>

              <div className="preferences-section">
                <h3>Playback Settings</h3>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      defaultChecked={user?.preferences?.autoplay !== false}
                    />
                    <span>Autoplay next episode</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      defaultChecked={user?.preferences?.subtitles === true}
                    />
                    <span>Show subtitles by default</span>
                  </label>
                </div>
              </div>

              <Button className="save-preferences-button">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="account-footer">
        <Button variant="outline" onClick={handleLogout} className="logout-button">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Account; 