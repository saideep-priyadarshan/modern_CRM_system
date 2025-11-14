import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FiBell } from 'react-icons/fi';
import NotificationList from './NotificationList';

const NotificationBell = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications } = useSelector((state) => state.notifications);
  
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
      >
        <FiBell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <NotificationList onClose={() => setShowNotifications(false)} />
      )}
    </div>
  );
};

export default NotificationBell;