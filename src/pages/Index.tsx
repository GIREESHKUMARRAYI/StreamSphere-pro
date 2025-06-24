
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Play, Tv, Users, Globe, Star, Zap } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-20 p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center animate-glow">
                <Play className="h-5 w-5 text-white" fill="white" />
              </div>
              <h1 className="text-2xl font-bold text-white">StreamSphere</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:text-red-400">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Stream Without
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                  Limits
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Experience unlimited entertainment with thousands of movies, TV shows, anime, and exclusive content. 
                Your premium streaming journey starts here.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link to="/signup">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-8 py-4 text-lg animate-glow"
                  >
                    <Play className="h-5 w-5 mr-2" fill="white" />
                    Start Streaming Now
                  </Button>
                </Link>
                <Link to="/login">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-white/20 text-white hover:bg-white hover:text-black font-semibold px-8 py-4 text-lg backdrop-blur-sm"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="glass-effect p-6 rounded-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <Tv className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Unlimited Content</h3>
                <p className="text-gray-400">
                  Access thousands of movies, TV shows, documentaries, and exclusive originals
                </p>
              </div>
              
              <div className="glass-effect p-6 rounded-lg animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                <Zap className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">4K Streaming</h3>
                <p className="text-gray-400">
                  Enjoy crystal-clear 4K resolution with Dolby Atmos surround sound
                </p>
              </div>
              
              <div className="glass-effect p-6 rounded-lg animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                <Globe className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Global Library</h3>
                <p className="text-gray-400">
                  Discover content from around the world in multiple languages
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="animate-fade-in-up">
                <div className="text-4xl font-bold text-red-400 mb-2">50M+</div>
                <div className="text-gray-300">Active Users</div>
              </div>
              <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                <div className="text-4xl font-bold text-red-400 mb-2">10K+</div>
                <div className="text-gray-300">Movies & Shows</div>
              </div>
              <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <div className="text-4xl font-bold text-red-400 mb-2">190+</div>
                <div className="text-gray-300">Countries</div>
              </div>
              <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                <div className="text-4xl font-bold text-red-400 mb-2">4.8★</div>
                <div className="text-gray-300">User Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Join millions of viewers who have made StreamSphere their home for entertainment
            </p>
            <Link to="/signup">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-12 py-6 text-xl animate-glow animate-fade-in-up" 
                style={{animationDelay: '0.4s'}}
              >
                <Play className="h-6 w-6 mr-3" fill="white" />
                Start Free Trial
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-gray-800">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <Play className="h-4 w-4 text-white" fill="white" />
              </div>
              <span className="text-xl font-bold text-white">StreamSphere</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your premium streaming destination for unlimited entertainment
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Contact Us</span>
              <span>About</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
