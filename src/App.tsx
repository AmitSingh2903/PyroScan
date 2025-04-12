import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Analysis from './pages/Analysis';
import Research from './pages/Research';
import LiveMap from './pages/LiveMap';
import WildfireAnalysis from './pages/WildfireAnalysis';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/research" element={<Research />} />
            <Route path="/live-map" element={<LiveMap />} />
            <Route path="/wildfire-analysis" element={<WildfireAnalysis />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;