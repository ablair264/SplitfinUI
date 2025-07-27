import React from 'react';
import { FaBell } from 'react-icons/fa';

interface NotificationCenterProps {
  unreadCount?: number;
  onClick?: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ 
  unreadCount = 0, 
  onClick 
}) => {
  return (
    <button 
      className="master-sidebar-action-btn notification-btn"
      onClick={onClick}
      aria-label="Notifications"
    >
      <FaBell />
      {unreadCount > 0 && (
        <span className="action-badge">{unreadCount}</span>
      )}
    </button>
  );
};

export default NotificationCenter;
