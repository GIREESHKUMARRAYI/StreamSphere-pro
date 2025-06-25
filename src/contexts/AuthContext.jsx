import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('streamSphereUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password, isAdmin = false) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Mock authentication logic
    if (email && password) {
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        username: email.split('@')[0],
        email,
        role: isAdmin ? 'admin' : 'user',
        subscription: {
          plan: 'Premium',
          expiryDate: '2024-12-31'
        }
      };
      setUser(mockUser);
      localStorage.setItem('streamSphereUser', JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const signup = async (username, email, password) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (username && email && password) {
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        username,
        email,
        role: 'user',
        subscription: null, // New users start without a subscription
        isNewUser: true // Flag to identify new users
      };
      setUser(mockUser);
      localStorage.setItem('streamSphereUser', JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('streamSphereUser');
  };

  const updateSubscription = (planDetails) => {
    if (user) {
      const updatedUser = {
        ...user,
        subscription: planDetails,
        isNewUser: false // Remove new user flag when they choose a plan
      };
      setUser(updatedUser);
      localStorage.setItem('streamSphereUser', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateSubscription, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}; 