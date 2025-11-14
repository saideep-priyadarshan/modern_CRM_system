import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

const MetricsCard = ({ title, value, icon: Icon, color, change }) => {
  const colorMap = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    yellow: 'bg-yellow-500',
  };

  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`${colorMap[color]} p-3 rounded-lg`}>
          <Icon className="text-white" size={24} />
        </div>
        {change !== undefined && (
          <div
            className={`flex items-center text-sm ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {isPositive ? <FiArrowUp /> : <FiArrowDown />}
            <span className="ml-1">{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  );
};

export default MetricsCard;