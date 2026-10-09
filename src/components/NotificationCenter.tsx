import { useState, useCallback, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, AlertCircle, CheckCircle } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  skuId?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  navigationPath?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

export const notificationStore: {
  listeners: Set<(notification: Notification) => void>;
  addListener: (listener: (notification: Notification) => void) => void;
  removeListener: (listener: (notification: Notification) => void) => void;
  notify: (notification: Omit<Notification, 'id'>) => void;
} = {
  listeners: new Set(),
  addListener(listener) {
    this.listeners.add(listener);
  },
  removeListener(listener) {
    this.listeners.delete(listener);
  },
  notify(notification) {
    const id = Date.now().toString();
    const fullNotification = { ...notification, id };
    this.listeners.forEach(listener => listener(fullNotification));
  }
};

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const handleNewNotification = useCallback((notification: Notification) => {
    setNotifications(prev => [...prev, notification]);

    // Auto-remove after 5 seconds (except for stock alerts with action)
    if (!notification.action || notification.type !== 'warning') {
      setTimeout(() => {
        removeNotification(notification.id);
      }, 5000);
    }
  }, [removeNotification]);

  // Subscribe to notifications
  useState(() => {
    notificationStore.addListener(handleNewNotification);
    return () => {
      notificationStore.removeListener(handleNewNotification);
    };
  });

  return (
    <div className="fixed top-4 right-4 z-40 max-w-md space-y-2">
      {notifications.map(notification => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
}

function NotificationCard({
  notification,
  onClose
}: {
  notification: Notification;
  onClose: () => void;
}): ReactNode {
  const navigate = useNavigate();
  const bgColor = {
    success: 'bg-green-50 border-green-200 hover:bg-green-100',
    error: 'bg-red-50 border-red-200 hover:bg-red-100',
    warning: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
    info: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
  }[notification.type];

  const titleColor = {
    success: 'text-green-900',
    error: 'text-red-900',
    warning: 'text-yellow-900',
    info: 'text-blue-900'
  }[notification.type];

  const messageColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-yellow-800',
    info: 'text-blue-800'
  }[notification.type];

  const iconColor = {
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600'
  }[notification.type];

  const icon = notification.type === 'success' ? (
    <CheckCircle size={20} className={iconColor} />
  ) : (
    <AlertCircle size={20} className={iconColor} />
  );

  const handleNotificationClick = () => {
    if (notification.navigationPath) {
      navigate(notification.navigationPath);
      onClose();
    }
  };

  const isClickable = !!notification.navigationPath;

  return (
    <div
      className={`border rounded-lg p-4 shadow-lg animate-in slide-in-from-right fade-in duration-300 ${bgColor} ${isClickable ? 'cursor-pointer transition' : ''}`}
      onClick={handleNotificationClick}
    >
      <div className="flex items-start space-x-3">
        {icon}
        <div className="flex-1">
          <h3 className={`font-semibold text-sm ${titleColor}`}>
            {notification.title}
          </h3>
          <p className={`text-sm ${messageColor} mt-1`}>
            {notification.message}
          </p>
          {isClickable && (
            <p className={`text-xs font-medium ${messageColor} mt-2 opacity-75`}>
              Click to update stock and price →
            </p>
          )}
          {notification.action && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                notification.action?.onClick();
                onClose();
              }}
              className={`mt-3 px-3 py-1 text-sm font-medium rounded transition ${
                notification.type === 'warning'
                  ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {notification.action.label}
            </button>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="text-gray-400 hover:text-gray-600 transition flex-shrink-0"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
