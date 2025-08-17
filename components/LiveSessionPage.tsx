
import React from 'react';
import { Match, User } from './types';
import { VideoCameraIcon } from './Icons';

interface LiveSessionPageProps {
  session: Match;
  user: User;
  onLeave: () => void;
}

const LiveSessionPage: React.FC<LiveSessionPageProps> = ({ session, user, onLeave }) => {
  const isMentor = session.mentor.id === user.id;
  const otherUser = isMentor ? session.learner : session.mentor;

  return (
    <div className="container mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{session.skill.skillName}</h2>
            <p className="text-gray-500 dark:text-gray-400">Session with {otherUser.name}</p>
          </div>
          <button
            onClick={onLeave}
            className="mt-2 sm:mt-0 px-4 py-2 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg"
          >
            Leave Session
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2 bg-gray-900 rounded-lg aspect-video flex items-center justify-center text-gray-400">
            <div className="text-center">
              <VideoCameraIcon className="w-16 h-16 mx-auto" />
              <p className="mt-2">Live video stream would be here</p>
              <p className="text-sm text-gray-500">Waiting for {otherUser.name} to join...</p>
            </div>
          </div>

          {/* Chat & Participants */}
          <div className="lg:col-span-1 bg-gray-100 dark:bg-gray-800/50 rounded-lg p-4 flex flex-col" style={{ minHeight: '400px' }}>
            <h3 className="text-lg font-bold mb-2">Session Chat</h3>
            <div className="flex-grow space-y-2 overflow-y-auto mb-4 border-b border-gray-300 dark:border-gray-600 pb-2">
              {/* Chat messages would go here */}
              <div className="text-sm"><span className="font-semibold text-purple-500">{otherUser.name}:</span> Hey! Ready to start?</div>
              <div className="text-sm text-right"><span className="font-semibold text-pink-500">You:</span> Yep, excited to learn!</div>
            </div>
            <div className="mt-auto">
              <input 
                type="text"
                placeholder="Type a message..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSessionPage;
