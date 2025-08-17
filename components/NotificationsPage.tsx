
import React from 'react';
import { Notification } from './types';
import { BellIcon } from './Icons';

interface NotificationsPageProps {
  notifications: Notification[];
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({ notifications }) => {
  return (
    <div className="container mx-auto max-w-3xl">
      <div className="flex items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h2>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        {notifications.length > 0 ? (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {notifications.map(notif => (
              <li key={notif.id} className={`p-4 flex items-start gap-4 ${!notif.read ? 'bg-sky-50 dark:bg-sky-900/20' : ''}`}>
                <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${!notif.read ? 'bg-pink-100 dark:bg-pink-900 text-pink-500 dark:text-pink-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                  <BellIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{notif.text}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">You have no notifications yet.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
