import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { AlertTriangle, CloudLightning, Activity, Clock } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Sample data for the chart
const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'PyroCb Events',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
    {
      label: 'Risk Level',
      data: [7, 11, 5, 8, 3, 7],
      fill: false,
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'PyroCb Events Over Time',
    },
  },
};

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Active Events"
          value="3"
          icon={<AlertTriangle className="h-6 w-6 text-red-500" />}
          trend="+2 from yesterday"
        />
        <StatCard
          title="Total Detections"
          value="147"
          icon={<CloudLightning className="h-6 w-6 text-blue-500" />}
          trend="12% increase"
        />
        <StatCard
          title="Average Risk Level"
          value="Medium"
          icon={<Activity className="h-6 w-6 text-yellow-500" />}
          trend="Stable"
        />
        <StatCard
          title="Last Detection"
          value="2h ago"
          icon={<Clock className="h-6 w-6 text-green-500" />}
          trend="Normal activity"
        />
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <Line options={chartOptions} data={chartData} />
      </div>

      {/* Recent Events Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Events
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Risk Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <EventRow
                location="California, USA"
                time="2 hours ago"
                riskLevel="High"
                status="Active"
              />
              <EventRow
                location="Victoria, Australia"
                time="5 hours ago"
                riskLevel="Medium"
                status="Monitoring"
              />
              <EventRow
                location="British Columbia, Canada"
                time="1 day ago"
                riskLevel="Low"
                status="Resolved"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{value}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{trend}</span>
      </div>
    </div>
  );
}

function EventRow({ location, time, riskLevel, status }: {
  location: string;
  time: string;
  riskLevel: string;
  status: string;
}) {
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
    }
  };

  const getStatusColor = (stat: string) => {
    switch (stat.toLowerCase()) {
      case 'active':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      case 'monitoring':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
    }
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        {location}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {time}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRiskColor(riskLevel)}`}>
          {riskLevel}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(status)}`}>
          {status}
        </span>
      </td>
    </tr>
  );
}