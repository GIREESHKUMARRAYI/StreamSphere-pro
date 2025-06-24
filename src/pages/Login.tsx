
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

const Login: React.FC = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showUserPassword, setShowUserPassword] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleUserLogin = async (e: React.FormEvent) => {
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

  const handleAdminLogin = async (e: React.FormEvent) => {
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
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-scale-in">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center animate-glow">
                <Play className="h-6 w-6 text-white" fill="white" />
              </div>
              <h1 className="text-3xl font-bold text-white">StreamSphere</h1>
            </div>
            <p className="text-gray-400">Your Premium Streaming Experience</p>
          </div>

          <Card className="glass-effect border-gray-700">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
              <CardDescription className="text-gray-400">
                Sign in to continue your streaming journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="user" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-800/50">
                  <TabsTrigger value="user" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-red-600">
                    User Login
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-red-600">
                    Admin Login
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="user">
                  <form onSubmit={handleUserLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="userEmail" className="text-gray-300">Email</Label>
                      <Input
                        id="userEmail"
                        type="email"
                        placeholder="Enter your email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="userPassword" className="text-gray-300">Password</Label>
                      <div className="relative">
                        <Input
                          id="userPassword"
                          type={showUserPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={userPassword}
                          onChange={(e) => setUserPassword(e.target.value)}
                          className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                          onClick={() => setShowUserPassword(!showUserPassword)}
                        >
                          {showUserPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="admin">
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="adminEmail" className="text-gray-300">Admin Email</Label>
                      <Input
                        id="adminEmail"
                        type="email"
                        placeholder="Enter admin email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="adminPassword" className="text-gray-300">Admin Password</Label>
                      <div className="relative">
                        <Input
                          id="adminPassword"
                          type={showAdminPassword ? "text" : "password"}
                          placeholder="Enter admin password"
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                          onClick={() => setShowAdminPassword(!showAdminPassword)}
                        >
                          {showAdminPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Admin Sign In"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-red-400 hover:text-red-300 font-medium">
                    Sign up here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
