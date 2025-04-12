/*
  # Initial Schema for PyroCb Detection System

  1. New Tables
    - `detections`
      - Stores cloud detection events and analysis results
      - Columns:
        - `id` (uuid, primary key)
        - `created_at` (timestamp)
        - `location` (point, geographical coordinates)
        - `cloud_type` (text, either 'normal' or 'pyro')
        - `confidence_score` (decimal)
        - `risk_level` (text)
        - `prediction` (text)
        - `image_url` (text)
        - `metadata` (jsonb)

    - `locations`
      - Stores monitored geographical locations
      - Columns:
        - `id` (uuid, primary key)
        - `created_at` (timestamp)
        - `name` (text)
        - `coordinates` (point)
        - `region` (text)
        - `active` (boolean)
        - `last_updated` (timestamp)

    - `historical_data`
      - Stores historical detection events for analysis
      - Columns:
        - `id` (uuid, primary key)
        - `created_at` (timestamp)
        - `detection_id` (uuid, references detections)
        - `weather_conditions` (jsonb)
        - `environmental_factors` (jsonb)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Restrict write operations
*/

-- Enable PostGIS extension for geographical data
CREATE EXTENSION IF NOT EXISTS postgis;

-- Detections table
CREATE TABLE IF NOT EXISTS detections (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamptz DEFAULT now(),
    location geography(POINT),
    cloud_type text NOT NULL CHECK (cloud_type IN ('normal', 'pyro')),
    confidence_score decimal NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 100),
    risk_level text NOT NULL CHECK (risk_level IN ('low', 'medium', 'high')),
    prediction text NOT NULL,
    image_url text,
    metadata jsonb DEFAULT '{}'::jsonb,
    CONSTRAINT valid_confidence_score CHECK (confidence_score >= 0 AND confidence_score <= 100)
);

-- Locations table
CREATE TABLE IF NOT EXISTS locations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamptz DEFAULT now(),
    name text NOT NULL,
    coordinates geography(POINT) NOT NULL,
    region text NOT NULL,
    active boolean DEFAULT true,
    last_updated timestamptz DEFAULT now(),
    CONSTRAINT unique_location_name UNIQUE (name)
);

-- Historical data table
CREATE TABLE IF NOT EXISTS historical_data (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamptz DEFAULT now(),
    detection_id uuid REFERENCES detections (id) ON DELETE CASCADE,
    weather_conditions jsonb DEFAULT '{}'::jsonb,
    environmental_factors jsonb DEFAULT '{}'::jsonb
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_detections_cloud_type ON detections (cloud_type);
CREATE INDEX IF NOT EXISTS idx_detections_risk_level ON detections (risk_level);
CREATE INDEX IF NOT EXISTS idx_locations_active ON locations (active);
CREATE INDEX IF NOT EXISTS idx_historical_detection_id ON historical_data (detection_id);

-- Enable Row Level Security
ALTER TABLE detections ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE historical_data ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to detections"
    ON detections
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Allow public read access to locations"
    ON locations
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Allow public read access to historical data"
    ON historical_data
    FOR SELECT
    TO public
    USING (true);

-- Create functions for common operations
CREATE OR REPLACE FUNCTION update_location_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update last_updated timestamp
CREATE TRIGGER update_location_last_updated
    BEFORE UPDATE ON locations
    FOR EACH ROW
    EXECUTE FUNCTION update_location_timestamp();