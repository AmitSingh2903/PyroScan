import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudLightning, AlertTriangle, Zap } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            PyroCb Cloud Detection System
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
            Advanced detection and monitoring of pyrocumulonimbus clouds using machine learning
            for early wildfire prediction and atmospheric research.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
          >
            View Dashboard
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 dark:text-white">
            Why PyroCb Detection Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<CloudLightning className="w-12 h-12 text-blue-500" />}
              title="Early Warning System"
              description="Detect pyrocumulonimbus cloud formation early to predict and prepare for potential wildfire storms."
            />
            <FeatureCard
              icon={<AlertTriangle className="w-12 h-12 text-yellow-500" />}
              title="Risk Assessment"
              description="Real-time analysis of cloud formations to assess fire-triggered thunderstorm risks in your area."
            />
            <FeatureCard
              icon={<Zap className="w-12 h-12 text-purple-500" />}
              title="Advanced AI Analysis"
              description="Utilizing cutting-edge machine learning models to provide accurate and timely detection."
            />
          </div>
        </div>
      </div>

      {/* Research Impact Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 dark:text-white">
            Research Impact
          </h2>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12">
            Our system combines satellite imagery with advanced machine learning techniques
            to revolutionize how we monitor and predict pyrocumulonimbus cloud formation.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/research')}
              className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200"
            >
              Learn More About Our Research
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow-lg text-center">
      <div className="flex justify-center mb-6">{icon}</div>
      <h3 className="text-2xl font-bold mb-4 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}