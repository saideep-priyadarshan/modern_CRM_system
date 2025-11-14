import { format } from 'date-fns';
import {
  FiPhone,
  FiMail,
  FiCalendar,
  FiMessageSquare,
  FiEdit,
} from 'react-icons/fi';

const ActivityItem = ({ activity }) => {
  const iconMap = {
    call: FiPhone,
    email: FiMail,
    meeting: FiCalendar,
    note: FiMessageSquare,
    status_change: FiEdit,
  };

  const colorMap = {
    call: 'bg-blue-500',
    email: 'bg-green-500',
    meeting: 'bg-purple-500',
    note: 'bg-yellow-500',
    status_change: 'bg-gray-500',
  };

  const Icon = iconMap[activity.type] || FiMessageSquare;
  const bgColor = colorMap[activity.type] || 'bg-gray-500';

  return (
    <div className="relative pl-12">
      <div
        className={`absolute left-0 w-8 h-8 ${bgColor} rounded-full flex items-center justify-center text-white z-10`}
      >
        <Icon size={16} />
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium text-gray-800">{activity.title}</h4>
          <span className="text-xs text-gray-500">
            {format(new Date(activity.createdAt), 'MMM dd, hh:mm a')}
          </span>
        </div>
        <p className="text-sm text-gray-600">{activity.description}</p>
        <div className="mt-2 text-xs text-gray-500">
          by {activity.user?.name}
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;