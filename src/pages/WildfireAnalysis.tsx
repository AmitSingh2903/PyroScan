import React, { useState } from 'react';
import { wildfireModel } from '../lib/mlModels';
import { Thermometer, Droplets, Wind, Trees, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FormData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  droughtIndex: number;
  vegetationDensity: number;
}

interface Location {
  id: number;
  position: [number, number];
  title: string;
  description: string;
  type: 'pyrocb' | 'normal' | 'warning';
  intensity: number;
  radius: number;
}

const locations: Location[] = [
  {
    id: 1,
    position: [34.0522, -118.2437],
    title: 'Los Angeles Region',
    description: 'Southern California monitoring station',
    type: 'pyrocb',
    intensity: 0.8,
    radius: 50000,
  },
  {
    id: 2,
    position: [40.7128, -74.0060],
    title: 'New York Region',
    description: 'Eastern Seaboard monitoring point',
    type: 'warning',
    intensity: 0.5,
    radius: 30000,
  },
  {
    id: 3,
    position: [51.5074, -0.1278],
    title: 'London Region',
    description: 'UK monitoring station',
    type: 'normal',
    intensity: 0.3,
    radius: 20000,
  },
  {
    id: 4,
    position: [35.6762, 139.6503],
    title: 'Tokyo Region',
    description: 'Japan monitoring point',
    type: 'pyrocb',
    intensity: 0.9,
    radius: 60000,
  },
  {
    id: 5,
    position: [-33.8688, 151.2093],
    title: 'Sydney Region',
    description: 'Australia monitoring station',
    type: 'warning',
    intensity: 0.6,
    radius: 40000,
  },
];

const initialFormData: FormData = {
  temperature: 25,
  humidity: 45,
  windSpeed: 15,
  droughtIndex: 5,
  vegetationDensity: 60,
};

export default function WildfireAnalysis() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  const handleAnalyze = async () => {
    if (!selectedLocation) {
      setError('Please select a location first');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const prediction = await wildfireModel.ensemblePrediction(formData);
      
      // Adjust risk score based on location intensity
      const adjustedRiskScore = Math.min(
        1,
        prediction.riskScore * (1 + selectedLocation.intensity * 0.2)
      );

      const result = {
        ...prediction,
        riskScore: adjustedRiskScore,
        location: selectedLocation.title,
        metadata: {
          ...prediction.metadata,
          location: {
            position: selectedLocation.position,
            type: selectedLocation.type,
            intensity: selectedLocation.intensity,
          },
        },
      };

      setResult(result);

      // Store prediction in Supabase
      await supabase.from('wildfire_predictions').insert({
        location_id: selectedLocation.id.toString(),
        temperature: formData.temperature,
        humidity: formData.humidity,
        wind_speed: formData.windSpeed,
        drought_index: formData.droughtIndex,
        vegetation_density: formData.vegetationDensity,
        risk_score: adjustedRiskScore,
        prediction_model: prediction.model,
        confidence_score: prediction.confidenceScore,
        metadata: result.metadata
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
    } finally {
      setLoading(false);
    }
  };

  const getLocationColor = (type: string) => {
    switch (type) {
      case 'pyrocb':
        return 'text-red-600 dark:text-red-400';
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400';
      default:
        return 'text-blue-600 dark:text-blue-400';
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 0.7) return 'text-red-600 dark:text-red-400';
    if (score >= 0.4) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  const getRiskBackground = (score: number) => {
    if (score >= 0.7) return 'bg-red-50 dark:bg-red-900/20';
    if (score >= 0.4) return 'bg-yellow-50 dark:bg-yellow-900/20';
    return 'bg-green-50 dark:bg-green-900/20';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Wildfire Risk Analysis
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            Environmental Parameters
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Location
            </label>
            <select
              value={selectedLocation?.id || ''}
              onChange={(e) => {
                const location = locations.find(l => l.id === parseInt(e.target.value));
                setSelectedLocation(location || null);
              }}
              className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
            >
              <option value="">Select a location</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.title} - {location.description}
                </option>
              ))}
            </select>
            {selectedLocation && (
              <div className="mt-2">
                <span className={`text-sm ${getLocationColor(selectedLocation.type)}`}>
                  Current intensity: {(selectedLocation.intensity * 100).toFixed(0)}%
                </span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <label className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
                <Thermometer className="w-5 h-5 mr-2" />
                Temperature (°C): {formData.temperature}
              </label>
              <input
                type="range"
                name="temperature"
                min="0"
                max="50"
                value={formData.temperature}
                onChange={handleInputChange}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
                <Droplets className="w-5 h-5 mr-2" />
                Humidity (%): {formData.humidity}
              </label>
              <input
                type="range"
                name="humidity"
                min="0"
                max="100"
                value={formData.humidity}
                onChange={handleInputChange}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
                <Wind className="w-5 h-5 mr-2" />
                Wind Speed (km/h): {formData.windSpeed}
              </label>
              <input
                type="range"
                name="windSpeed"
                min="0"
                max="100"
                value={formData.windSpeed}
                onChange={handleInputChange}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Drought Index (0-10): {formData.droughtIndex}
              </label>
              <input
                type="range"
                name="droughtIndex"
                min="0"
                max="10"
                step="0.1"
                value={formData.droughtIndex}
                onChange={handleInputChange}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
                <Trees className="w-5 h-5 mr-2" />
                Vegetation Density (%): {formData.vegetationDensity}
              </label>
              <input
                type="range"
                name="vegetationDensity"
                min="0"
                max="100"
                value={formData.vegetationDensity}
                onChange={handleInputChange}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading || !selectedLocation}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
            >
              {loading ? 'Analyzing...' : 'Analyze Risk'}
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            Analysis Results
          </h2>

          {error && (
            <div className="flex items-center p-4 mb-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
              <AlertTriangle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          {result && (
            <div className="space-y-6">
              <div className={`p-6 rounded-lg ${getRiskBackground(result.riskScore)}`}>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Risk Assessment for {result.location}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Risk Score:</span>
                  <span className={`text-3xl font-bold ${getRiskColor(result.riskScore)}`}>
                    {(result.riskScore * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Model Confidence
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Confidence Score:</span>
                  <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {(result.confidenceScore * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Model Details
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Model Type:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {result.model}
                    </span>
                  </div>
                  {result.metadata?.models && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Ensemble models used: {result.metadata.models.join(', ')}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 p-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Recommendations
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  {result.riskScore >= 0.7 && (
                    <>
                      <li>Immediate action required - High risk conditions detected</li>
                      <li>Alert emergency services and fire management teams</li>
                      <li>Implement fire prevention measures</li>
                    </>
                  )}
                  {result.riskScore >= 0.4 && result.riskScore < 0.7 && (
                    <>
                      <li>Increased monitoring recommended</li>
                      <li>Review and update fire management plans</li>
                      <li>Prepare resources for potential response</li>
                    </>
                  )}
                  {result.riskScore < 0.4 && (
                    <>
                      <li>Continue regular monitoring</li>
                      <li>Maintain standard fire prevention measures</li>
                      <li>Update risk assessments as conditions change</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}

          {!result && !error && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                Select a location and adjust the environmental parameters to see the risk assessment
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}