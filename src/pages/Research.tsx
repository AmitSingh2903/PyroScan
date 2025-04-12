import React from 'react';
import { BookOpen, Database, Brain, Share2, Code, Cloud, Server } from 'lucide-react';

export default function Research() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Research & Methodology
        </h1>

        {/* Introduction Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Project Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            This research explores the use of machine learning to forecast wildfires linked to 
            pyrocumulonimbus (pyroCb) clouds, driven by climate change. Our system employs 
            Convolutional Neural Networks for satellite image analysis, ensemble methods for 
            wildfire risk classification, and advanced cloud detection algorithms for predicting 
            pyroCb formation.
          </p>
        </section>

        {/* Cloud Detection System Architecture */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Cloud Detection System Architecture
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              System Components
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Core Components
                </h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                  <li>TensorFlow.js with WebGL backend</li>
                  <li>Custom cloud classification model</li>
                  <li>MobileNet fallback system</li>
                  <li>Real-time image processing pipeline</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Key Features
                </h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                  <li>GPU-accelerated inference</li>
                  <li>Automated risk assessment</li>
                  <li>Weather prediction generation</li>
                  <li>Memory-optimized processing</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Implementation */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Technical Implementation
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Image Processing Pipeline
                </h4>
                <div className="bg-gray-50 dark:bg-gray-700 rounded p-4">
                  <pre className="text-sm text-gray-600 dark:text-gray-300">
                    {`1. Image Input (224x224)
2. Tensor Conversion
3. Normalization
4. Model Inference
5. Result Generation`}
                  </pre>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Risk Assessment Logic
                </h4>
                <div className="bg-gray-50 dark:bg-gray-700 rounded p-4">
                  <pre className="text-sm text-gray-600 dark:text-gray-300">
                    {`LOW: < 30% confidence
MEDIUM: 30-60% confidence
HIGH: > 60% confidence`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ML Model Architecture */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Machine Learning Architecture
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TechCard
                icon={<Brain className="h-8 w-8 text-purple-600" />}
                title="Neural Network"
                description="Custom CNN architecture optimized for cloud pattern recognition"
              />
              <TechCard
                icon={<Cloud className="h-8 w-8 text-blue-600" />}
                title="Cloud Analysis"
                description="Specialized layers for pyrocumulonimbus detection"
              />
              <TechCard
                icon={<Server className="h-8 w-8 text-green-600" />}
                title="Data Processing"
                description="Efficient tensor operations with WebGL acceleration"
              />
            </div>
          </div>
        </section>

        {/* Database Architecture */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Database Architecture
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Core Tables
                </h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                  <li>Detections (cloud events)</li>
                  <li>Locations (monitoring points)</li>
                  <li>Historical Data (time series)</li>
                  <li>Predictions (ML outputs)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Security Features
                </h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                  <li>Row Level Security (RLS)</li>
                  <li>Data validation constraints</li>
                  <li>Automated timestamps</li>
                  <li>Secure access policies</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Research Impact */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Research Impact & Applications
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <BookOpen className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Scientific Contributions
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our research advances the field of atmospheric science by combining 
                machine learning with traditional meteorological approaches. The system's 
                ability to detect and classify pyrocumulonimbus clouds in real-time 
                represents a significant step forward in wildfire prediction and management.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <Share2 className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Practical Applications
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                The system finds immediate application in wildfire management, 
                weather forecasting, and climate research. Its real-time analysis 
                capabilities make it particularly valuable for emergency response 
                teams and environmental monitoring agencies.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function TechCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-lg font-semibold ml-3 text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}