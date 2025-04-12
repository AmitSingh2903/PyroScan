import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { AlertTriangle, CloudLightning, ThermometerSun } from 'lucide-react';

// Fix for default marker icons in Leaflet with Vite
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for different event types
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

interface Event {
  id: number;
  position: [number, number];
  title: string;
  description: string;
  type: 'pyrocb' | 'normal' | 'warning';
  intensity: number;
  radius: number;
}

// Sample data for events
const events: Event[] = [
  {
    id: 1,
    position: [34.0522, -118.2437],
    title: 'Active PyroCb Formation',
    description: 'High-risk fire weather conditions with intense convection',
    type: 'pyrocb',
    intensity: 0.8,
    radius: 50000,
  },
  {
    id: 2,
    position: [40.7128, -74.0060],
    title: 'Potential Development',
    description: 'Monitoring atmospheric conditions, moderate risk',
    type: 'warning',
    intensity: 0.5,
    radius: 30000,
  },
  {
    id: 3,
    position: [51.5074, -0.1278],
    title: 'Normal Cloud Formation',
    description: 'Standard cumulus development',
    type: 'normal',
    intensity: 0.3,
    radius: 20000,
  },
  {
    id: 4,
    position: [35.6762, 139.6503],
    title: 'Severe PyroCb Activity',
    description: 'Extreme fire-weather conditions detected',
    type: 'pyrocb',
    intensity: 0.9,
    radius: 60000,
  },
  {
    id: 5,
    position: [-33.8688, 151.2093],
    title: 'Weather Warning',
    description: 'Potential for pyrocumulonimbus development',
    type: 'warning',
    intensity: 0.6,
    radius: 40000,
  },
];

const getEventColor = (type: string, intensity: number): string => {
  switch (type) {
    case 'pyrocb':
      return `rgba(255, 0, 0, ${intensity})`;
    case 'warning':
      return `rgba(255, 165, 0, ${intensity})`;
    default:
      return `rgba(0, 128, 255, ${intensity})`;
  }
};

const getEventIcon = (type: string) => {
  switch (type) {
    case 'pyrocb':
      return createCustomIcon('#ff0000');
    case 'warning':
      return createCustomIcon('#ffa500');
    default:
      return createCustomIcon('#0080ff');
  }
};

export default function LiveMap() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [timeFilter, setTimeFilter] = useState('all');

  useEffect(() => {
    // Initialize any map-related side effects here
  }, []);

  const getFilteredEvents = () => {
    // In a real application, this would filter based on actual timestamps
    switch (timeFilter) {
      case '24h':
        return events.slice(0, 3);
      case '48h':
        return events.slice(0, 4);
      default:
        return events;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Live PyroCb Monitoring
          </h1>
          <div className="flex space-x-4">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Events</option>
              <option value="24h">Last 24 Hours</option>
              <option value="48h">Last 48 Hours</option>
            </select>
          </div>
        </div>
        
        <div className="h-[600px] rounded-lg overflow-hidden">
          <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {getFilteredEvents().map((event) => (
              <React.Fragment key={event.id}>
                <Circle
                  center={event.position}
                  radius={event.radius}
                  pathOptions={{
                    color: getEventColor(event.type, event.intensity),
                    fillColor: getEventColor(event.type, event.intensity),
                    fillOpacity: 0.3,
                  }}
                />
                <Marker
                  position={event.position}
                  icon={getEventIcon(event.type)}
                  eventHandlers={{
                    click: () => setSelectedEvent(event),
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.description}</p>
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <p className="text-sm">
                          Intensity: {(event.intensity * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            ))}
          </MapContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <div className="flex items-center">
              <CloudLightning className="w-6 h-6 text-red-600 dark:text-red-400 mr-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Active PyroCb Events
              </h3>
            </div>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-2">
              {events.filter(e => e.type === 'pyrocb').length}
            </p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400 mr-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Warning Zones
              </h3>
            </div>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mt-2">
              {events.filter(e => e.type === 'warning').length}
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="flex items-center">
              <ThermometerSun className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Normal Formations
              </h3>
            </div>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">
              {events.filter(e => e.type === 'normal').length}
            </p>
          </div>
        </div>

        <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Legend</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">PyroCb Events</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Warning Zones</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Normal Clouds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}