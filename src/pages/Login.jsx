import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, Play } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import AnimatedBackground from '@/components/AnimatedBackground';
import Tagline from '@/components/Tagline';
import './Login.css';

const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showUserPassword, setShowUserPassword] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleUserLogin = async (e) => {
    e.preventDefault();
    if (!userEmail || !userPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }
    const success = await login(userEmail, userPassword, false);
    if (success) {
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      navigate('/dashboard');
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password",
      });
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!adminEmail || !adminPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }
    const success = await login(adminEmail, adminPassword, true);
    if (success) {
      toast({
        title: "Admin Access Granted",
        description: "Welcome to StreamSphere Admin Dashboard.",
      });
      navigate('/admin');
    } else {
      toast({
        variant: "destructive",
        title: "Admin Login Failed",
        description: "Invalid admin credentials",
      });
    }
  };

  return (
    <div className="main-content login-root">
      <AnimatedBackground />
      {/* Top-left logo */}
      <div className="login-logo-fixed">
        <div className="login-logo-group">
          <div className="login-logo-icon">
            <Play className="login-logo-play" fill="white" />
          </div>
          <h1 className="login-logo-title">StreamSphere</h1>
        </div>
      </div>
      <div className="login-content">
        <Card className="login-card">
          <CardHeader className="login-card-header">
            <CardTitle className="login-card-title">Welcome Back</CardTitle>
            <CardDescription className="login-card-desc">
              Sign in to continue your streaming journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="user" className="login-tabs">
              <TabsList className="login-tabs-list">
                <TabsTrigger value="user" className="login-tabs-trigger">User Login</TabsTrigger>
                <TabsTrigger value="admin" className="login-tabs-trigger">Admin Login</TabsTrigger>
              </TabsList>
              <TabsContent value="user">
                <form onSubmit={handleUserLogin} className="login-form">
                  <div className="login-form-group">
                    <Label htmlFor="userEmail" className="login-label">Email</Label>
                    <Input
                      id="userEmail"
                      type="email"
                      placeholder="Enter your email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="login-input"
                    />
                  </div>
                  <div className="login-form-group">
                    <Label htmlFor="userPassword" className="login-label">Password</Label>
                    <div className="login-input-relative">
                      <Input
                        id="userPassword"
                        type={showUserPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        className="login-input login-input-password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="login-password-toggle"
                        onClick={() => setShowUserPassword(!showUserPassword)}
                      >
                        {showUserPassword ? <EyeOff className="login-eye-icon" /> : <Eye className="login-eye-icon" />}
                      </Button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="login-submit-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="admin">
                <form onSubmit={handleAdminLogin} className="login-form">
                  <div className="login-form-group">
                    <Label htmlFor="adminEmail" className="login-label">Admin Email</Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      placeholder="Enter admin email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="login-input"
                    />
                  </div>
                  <div className="login-form-group">
                    <Label htmlFor="adminPassword" className="login-label">Admin Password</Label>
                    <div className="login-input-relative">
                      <Input
                        id="adminPassword"
                        type={showAdminPassword ? "text" : "password"}
                        placeholder="Enter admin password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className="login-input login-input-password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="login-password-toggle"
                        onClick={() => setShowAdminPassword(!showAdminPassword)}
                      >
                        {showAdminPassword ? <EyeOff className="login-eye-icon" /> : <Eye className="login-eye-icon" />}
                      </Button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="login-submit-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In as Admin"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        {/* Tagline and sign-up below the login form */}
        <div className="login-below-form">
          <div className="login-tagline-below">
            Your Premium Streaming Experience
          </div>
          <div className="login-footer">
            <p className="login-footer-text">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="login-footer-link">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 