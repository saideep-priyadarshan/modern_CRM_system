import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const LeadsByStage = ({ data }) => {
  const chartData = {
    labels: ['New', 'Contacted', 'Qualified', 'Lost'],
    datasets: [
      {
        data: [
          data?.new || 0,
          data?.contacted || 0,
          data?.qualified || 0,
          data?.lost || 0,
        ],
        backgroundColor: [
          '#3B82F6',
          '#FBBF24',
          '#10B981',
          '#EF4444',
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value} leads`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Leads by Stage
      </h3>
      <div className="h-64">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LeadsByStage;