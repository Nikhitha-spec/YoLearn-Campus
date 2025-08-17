
import React from 'react';
import { ForumQuestion } from './types';
import { SearchIcon } from './Icons';

interface CommunityForumProps {
  questions: ForumQuestion[];
  onPostQuestionClick: () => void;
  onSelectQuestion: (question: ForumQuestion) => void;
}

const CommunityForum: React.FC<CommunityForumProps> = ({ questions, onPostQuestionClick, onSelectQuestion }) => {
  return (
    <div className="container mx-auto max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Community Forum</h2>
        <button 
          onClick={onPostQuestionClick}
          className="w-full sm:w-auto px-6 py-3 font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
        >
          + Ask a Question
        </button>
      </div>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <input
            type="text"
            placeholder="Search the forum..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon />
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map(q => (
          <div key={q.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start justify-between">
                <div>
                    <h3 onClick={() => onSelectQuestion(q)} className="text-lg font-bold text-gray-800 dark:text-white hover:text-purple-500 cursor-pointer">{q.title}</h3>
                     <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <img src={q.author.profilePhoto} alt={q.author.name} className="w-5 h-5 rounded-full" />
                        <span>{q.author.name}</span>
                        <span>&bull;</span>
                        <span>{new Date(q.datePosted).toLocaleDateString()}</span>
                    </div>
                </div>
                <div className="text-center ml-4 flex-shrink-0">
                    <p className="font-bold text-lg text-purple-500">{q.answers.length}</p>
                    <p className="text-xs text-gray-500">replies</p>
                </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{q.content.substring(0, 150)}...</p>
            <div className="mt-3 flex flex-wrap gap-2">
                {q.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                        #{tag}
                    </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityForum;
