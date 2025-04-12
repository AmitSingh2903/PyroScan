import React, { useState } from 'react';
import { cloudModel, type AnalysisResult } from '../lib/cloudModel';
import { Upload, AlertTriangle } from 'lucide-react';

export default function Analysis() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!previewUrl) return;

    setLoading(true);
    setError(null);
    try {
      const result = await cloudModel.analyzeImage(previewUrl);
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Cloud Analysis
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Upload Image
          </h2>
          
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="h-12 w-12 text-gray-400 mb-4" />
              <span className="text-gray-600 dark:text-gray-300">
                Click to upload or drag and drop
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                PNG, JPG up to 10MB
              </span>
            </label>
          </div>

          {previewUrl && (
            <div className="mt-6">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Analyzing...' : 'Analyze Image'}
              </button>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Analysis Results
          </h2>

          {error && (
            <div className="flex items-center p-4 mb-4 bg-red-100 text-red-700 rounded-lg">
              <AlertTriangle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          {result && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">Cloud Type</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {result.type === 'pyro' ? 'Pyrocumulonimbus' : 'Normal Cloud Formation'}
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">Confidence</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {result.confidence}%
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">Risk Level</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {result.risk}
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">Prediction</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {result.prediction}
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Estimated Time of Impact
                </p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {result.estimatedTime}
                </p>
              </div>
            </div>
          )}

          {!result && !error && !loading && (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              Upload an image to see analysis results
            </p>
          )}
        </div>
      </div>
    </div>
  );
}