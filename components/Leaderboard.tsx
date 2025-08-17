
import React from 'react';
import { MOCK_LEADERBOARD } from '../constants';
import { TrophyIcon } from './Icons';

const Leaderboard: React.FC = () => {
  const medalColors = ['text-yellow-400', 'text-gray-400', 'text-yellow-600'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
      <div className="flex items-center mb-4">
        <TrophyIcon className="text-yellow-500" />
        <h3 className="text-xl font-bold ml-2 text-gray-900 dark:text-white">Leaderboard</h3>
      </div>
      <ul className="space-y-4">
        {MOCK_LEADERBOARD.map((entry, index) => (
          <li key={entry.user.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <span className={`w-6 font-bold text-lg ${medalColors[index] || 'text-gray-500 dark:text-gray-400'}`}>
                {index + 1}
              </span>
              <img 
                src={entry.user.profilePhoto} 
                alt={entry.user.name} 
                className="w-10 h-10 rounded-full object-cover ml-2"
              />
              <div className="ml-3">
                <p className="font-semibold text-gray-800 dark:text-gray-100">{entry.user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{entry.user.department}</p>
              </div>
            </div>
            <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              {entry.points}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;