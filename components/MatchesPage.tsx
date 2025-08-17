
import React, { useState } from 'react';
import { Match, MatchStatus, User } from './types';
import { CheckIcon, XMarkIcon, VideoCameraIcon } from './Icons';

interface MatchesPageProps {
  currentUser: User;
  matches: Match[];
  onAccept: (matchId: string) => void;
  onDecline: (matchId: string) => void;
  onJoinSession: (match: Match) => void;
}

type ActiveTab = 'scheduled' | 'incoming' | 'sent';

const MatchesPage: React.FC<MatchesPageProps> = ({ currentUser, matches, onAccept, onDecline, onJoinSession }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('scheduled');

  const scheduled = matches.filter(m => m.status === MatchStatus.ACCEPTED && (m.mentor.id === currentUser.id || m.learner.id === currentUser.id));
  const incoming = matches.filter(m => m.status === MatchStatus.PENDING && m.mentor.id === currentUser.id);
  const sent = matches.filter(m => m.status === MatchStatus.PENDING && m.learner.id === currentUser.id);

  const TabButton: React.FC<{tab: ActiveTab, label: string, count: number}> = ({ tab, label, count }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 text-sm font-semibold rounded-t-lg border-b-2 transition-colors ${
        activeTab === tab
          ? 'text-purple-600 dark:text-purple-300 border-purple-500'
          : 'text-gray-500 dark:text-gray-400 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
      }`}
    >
      {label} <span className="text-xs bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-0.5">{count}</span>
    </button>
  );

  const MatchCard: React.FC<{match: Match, type: 'scheduled' | 'incoming' | 'sent'}> = ({ match, type }) => {
    const isMentor = match.mentor.id === currentUser.id;
    const otherUser = isMentor ? match.learner : match.mentor;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <img src={otherUser.profilePhoto} alt={otherUser.name} className="w-14 h-14 rounded-full object-cover"/>
                <div>
                    <p className="font-bold text-lg text-gray-800 dark:text-white">{match.skill.skillName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {type === 'incoming' ? `Request from ${otherUser.name}` : `With ${otherUser.name}`}
                    </p>
                    {match.requestMessage && <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 italic">"{match.requestMessage}"</p>}
                </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
                {type === 'incoming' && (
                    <>
                    <button onClick={() => onDecline(match.id)} className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900"><XMarkIcon/></button>
                    <button onClick={() => onAccept(match.id)} className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-900"><CheckIcon/></button>
                    </>
                )}
                {type === 'scheduled' && (
                     <button onClick={() => onJoinSession(match)} className="flex items-center px-4 py-2 font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700">
                        <VideoCameraIcon /> Join Live Session
                    </button>
                )}
                {type === 'sent' && (
                     <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200">Pending</span>
                )}
            </div>
        </div>
    );
  };
  
  const renderContent = () => {
    let data, type: 'scheduled' | 'incoming' | 'sent', emptyText;
    switch (activeTab) {
      case 'incoming':
        data = incoming;
        type = 'incoming';
        emptyText = 'No new requests right now. Great job!';
        break;
      case 'sent':
        data = sent;
        type = 'sent';
        emptyText = 'You haven\'t sent any requests that are pending.';
        break;
      case 'scheduled':
      default:
        data = scheduled;
        type = 'scheduled';
        emptyText = 'No sessions on your schedule. Find a skill to learn!';
        break;
    }

    if (data.length === 0) {
        return <p className="text-center text-gray-500 dark:text-gray-400 py-12">{emptyText}</p>;
    }
    
    return <div className="space-y-4 mt-6">{data.map(m => <MatchCard key={m.id} match={m} type={type} />)}</div>;
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">My Matches</h2>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-4">
          <TabButton tab="scheduled" label="Scheduled Sessions" count={scheduled.length} />
          <TabButton tab="incoming" label="Incoming Requests" count={incoming.length} />
          <TabButton tab="sent" label="Sent Requests" count={sent.length} />
        </nav>
      </div>
      {renderContent()}
    </div>
  );
};

export default MatchesPage;
