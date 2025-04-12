import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';
import { wildfireModel } from './mlModels';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Existing utility functions...
export async function getRecentDetections(limit = 10) {
  const { data, error } = await supabase
    .from('detections')
    .select(`
      *,
      historical_data (
        weather_conditions,
        environmental_factors
      )
    `)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getActiveLocations() {
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .eq('active', true)
    .order('last_updated', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createDetection({
  location,
  cloudType,
  confidenceScore,
  riskLevel,
  prediction,
  imageUrl,
  metadata,
}: {
  location: [number, number];
  cloudType: 'normal' | 'pyro';
  confidenceScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  prediction: string;
  imageUrl?: string;
  metadata?: Record<string, unknown>;
}) {
  const { data, error } = await supabase
    .from('detections')
    .insert({
      location: `POINT(${location[0]} ${location[1]})`,
      cloud_type: cloudType,
      confidence_score: confidenceScore,
      risk_level: riskLevel,
      prediction,
      image_url: imageUrl,
      metadata,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getDetectionsByRiskLevel(riskLevel: 'low' | 'medium' | 'high') {
  const { data, error } = await supabase
    .from('detections')
    .select('*')
    .eq('risk_level', riskLevel)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getLocationStatistics() {
  const { data, error } = await supabase
    .rpc('get_location_statistics');

  if (error) throw error;
  return data;
}

// New functions for wildfire predictions
export async function createWildfirePrediction({
  locationId,
  temperature,
  humidity,
  windSpeed,
  droughtIndex,
  vegetationDensity
}: {
  locationId: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  droughtIndex: number;
  vegetationDensity: number;
}) {
  const prediction = await wildfireModel.ensemblePrediction({
    temperature,
    humidity,
    windSpeed,
    droughtIndex,
    vegetationDensity
  });

  const { data, error } = await supabase
    .from('wildfire_predictions')
    .insert({
      location_id: locationId,
      temperature,
      humidity,
      wind_speed: windSpeed,
      drought_index: droughtIndex,
      vegetation_density: vegetationDensity,
      risk_score: prediction.riskScore,
      prediction_model: prediction.model,
      confidence_score: prediction.confidenceScore,
      metadata: prediction.metadata
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getRecentWildfirePredictions(limit = 10) {
  const { data, error } = await supabase
    .from('wildfire_predictions')
    .select(`
      *,
      locations (
        name,
        region
      )
    `)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getHighRiskLocations(threshold = 0.7) {
  const { data, error } = await supabase
    .from('wildfire_predictions')
    .select(`
      *,
      locations (
        name,
        region,
        coordinates
      )
    `)
    .gte('risk_score', threshold)
    .order('risk_score', { ascending: false });

  if (error) throw error;
  return data;
}