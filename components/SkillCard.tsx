
import React from 'react';
import { Skill, SkillType, User } from './types';
import { GraduateCapIcon } from './Icons';

interface SkillCardProps {
  skill: Skill;
  loggedInUser: User;
  onRequestSession: (skill: Skill) => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, loggedInUser, onRequestSession }) => {
  const isTeaching = skill.skillType === SkillType.TEACH;
  const cardBorderColor = isTeaching ? 'border-pink-400' : 'border-sky-400';
  const cardBgGradient = isTeaching
    ? 'from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20'
    : 'from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20';
  const tagBgColor = isTeaching ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200' : 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200';
  
  const canRequest = isTeaching && skill.user.id !== loggedInUser.id;

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-t-4 ${cardBorderColor} flex flex-col h-full transform hover:-translate-y-1 transition-transform duration-300`}>
      <div className={`p-5 flex flex-col flex-grow bg-gradient-to-br ${cardBgGradient}`}>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">{skill.skillName}</h3>
          <div className={`px-3 py-1 text-xs font-semibold rounded-full ${tagBgColor}`}>
            {isTeaching ? 'TEACHING' : 'LEARNING'}
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">{skill.description}</p>
        {canRequest && (
            <div className="mt-auto">
                <button
                    onClick={() => onRequestSession(skill)} 
                    className="w-full px-4 py-2 text-sm font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
                >
                    Request Session
                </button>
            </div>
        )}
      </div>

      <div className="px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img className="h-10 w-10 rounded-full object-cover" src={skill.user.profilePhoto} alt={skill.user.name} />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{skill.user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{skill.user.department}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-xs px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full">
              <GraduateCapIcon />
              <span>{skill.level}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
