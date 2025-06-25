import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Play, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import AnimatedBackground from '@/components/AnimatedBackground';
import Tagline from '@/components/Tagline';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return false;
    }
    if (formData.username.length < 3) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Username must be at least 3 characters long",
      });
      return false;
    }
    if (formData.password.length < 6) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Password must be at least 6 characters long",
      });
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const success = await signup(formData.username, formData.email, formData.password);
    if (success) {
      toast({
        title: "Account created successfully!",
        description: "Welcome to StreamSphere. You can now start streaming.",
      });
      navigate('/dashboard');
    } else {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: "An error occurred while creating your account",
      });
    }
  };

  const passwordRequirements = [
    { text: "At least 6 characters", met: formData.password.length >= 6 },
    { text: "Contains letters", met: /[a-zA-Z]/.test(formData.password) },
    { text: "Passwords match", met: formData.password === formData.confirmPassword && formData.confirmPassword !== '' }
  ];

  return (
    <div className="main-content signup-root">
      <AnimatedBackground />
      <div className="signup-content">
        <div className="signup-card-outer">
          {/* Logo */}
          <div className="signup-logo">
            <div className="signup-logo-group">
              <div className="signup-logo-icon">
                <Play className="signup-logo-play" fill="white" />
              </div>
              <h1 className="signup-logo-title">StreamSphere</h1>
            </div>
            <Tagline />
          </div>
          <Card className="signup-card">
            <CardHeader className="signup-card-header">
              <CardTitle className="signup-card-title">Create Account</CardTitle>
              <CardDescription className="signup-card-desc">
                Sign up to start your premium streaming experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="signup-form">
                <div className="signup-form-group">
                  <Label htmlFor="username" className="signup-label">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="signup-input"
                  />
                </div>
                <div className="signup-form-group">
                  <Label htmlFor="email" className="signup-label">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="signup-input"
                  />
                </div>
                <div className="signup-form-group">
                  <Label htmlFor="password" className="signup-label">Password</Label>
                  <div className="signup-input-relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="signup-input signup-input-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="signup-password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="signup-eye-icon" /> : <Eye className="signup-eye-icon" />}
                    </Button>
                  </div>
                </div>
                <div className="signup-form-group">
                  <Label htmlFor="confirmPassword" className="signup-label">Confirm Password</Label>
                  <div className="signup-input-relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="signup-input signup-input-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="signup-password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="signup-eye-icon" /> : <Eye className="signup-eye-icon" />}
                    </Button>
                  </div>
                </div>
                {/* Password Requirements */}
                {formData.password && (
                  <div className="signup-password-reqs">
                    <Label className="signup-password-reqs-label">Password Requirements</Label>
                    <div className="signup-password-reqs-list">
                      {passwordRequirements.map((req, index) => (
                        <div key={index} className="signup-password-req">
                          <Check 
                            className={`signup-password-req-icon ${req.met ? 'signup-password-req-met' : 'signup-password-req-unmet'}`}
                          />
                          <span className={`signup-password-req-text ${req.met ? 'signup-password-req-met' : 'signup-password-req-unmet'}`}>{req.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <Button
                  type="submit"
                  className="signup-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
              <div className="signup-footer">
                <p className="signup-footer-text">
                  Already have an account?{' '}
                  <Link to="/login" className="signup-footer-link">Sign in here</Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup; 