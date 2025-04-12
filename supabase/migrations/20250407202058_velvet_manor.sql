/*
  # Add Wildfire Prediction Schema

  1. New Tables
    - `wildfire_predictions`
      - Stores ML model predictions and analysis
      - Columns:
        - `id` (uuid, primary key)
        - `created_at` (timestamp)
        - `location_id` (uuid, references locations)
        - `temperature` (decimal)
        - `humidity` (decimal)
        - `wind_speed` (decimal)
        - `drought_index` (decimal)
        - `vegetation_density` (decimal)
        - `risk_score` (decimal)
        - `prediction_model` (text)
        - `confidence_score` (decimal)
        - `metadata` (jsonb)

  2. Security
    - Enable RLS
    - Add public read access policy
*/

CREATE TABLE IF NOT EXISTS wildfire_predictions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamptz DEFAULT now(),
    location_id uuid REFERENCES locations(id),
    temperature decimal NOT NULL,
    humidity decimal NOT NULL,
    wind_speed decimal NOT NULL,
    drought_index decimal NOT NULL,
    vegetation_density decimal NOT NULL,
    risk_score decimal NOT NULL CHECK (risk_score >= 0 AND risk_score <= 1),
    prediction_model text NOT NULL,
    confidence_score decimal NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 1),
    metadata jsonb DEFAULT '{}'::jsonb
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_wildfire_predictions_location ON wildfire_predictions(location_id);
CREATE INDEX IF NOT EXISTS idx_wildfire_predictions_risk_score ON wildfire_predictions(risk_score);

-- Enable Row Level Security
ALTER TABLE wildfire_predictions ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access to wildfire predictions"
    ON wildfire_predictions
    FOR SELECT
    TO public
    USING (true);