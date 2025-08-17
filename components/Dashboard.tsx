
import React, { useState, useMemo } from 'react';
import { Skill, SkillType, User } from './types';
import SkillCard from './SkillCard';
import Leaderboard from './Leaderboard';
import { SearchIcon, FilterIcon } from './Icons';

interface DashboardProps {
  skills: Skill[];
  loggedInUser: User;
  onPostSkillClick: () => void;
  onRequestSession: (skill: Skill) => void;
}

const CATEGORIES = ['All', 'Technology', 'Art & Design', 'Music', 'Languages', 'Health & Wellness'];

const Dashboard: React.FC<DashboardProps> = ({ skills, loggedInUser, onPostSkillClick, onRequestSession }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [skillTypeFilter, setSkillTypeFilter] = useState<SkillType | 'all'>('all');

  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const matchesSearch = skill.skillName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            skill.user.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
      const matchesType = skillTypeFilter === 'all' || skill.skillType === skillTypeFilter;
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [skills, searchQuery, selectedCategory, skillTypeFilter]);

  return (
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Campus Skillboard</h2>
          <button 
            onClick={onPostSkillClick}
            className="w-full sm:w-auto px-6 py-3 font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
          >
            + Post a Skill
          </button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search for a skill..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon />
                    </div>
                </div>
                <div className="relative">
                     <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                        {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
                    </select>
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FilterIcon />
                    </div>
                </div>
            </div>
             <div className="flex justify-center space-x-2 mt-4">
                <button onClick={() => setSkillTypeFilter('all')} className={`px-4 py-1.5 text-sm rounded-full transition ${skillTypeFilter === 'all' ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>All</button>
                <button onClick={() => setSkillTypeFilter(SkillType.TEACH)} className={`px-4 py-1.5 text-sm rounded-full transition ${skillTypeFilter === SkillType.TEACH ? 'bg-pink-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>To Teach</button>
                <button onClick={() => setSkillTypeFilter(SkillType.LEARN)} className={`px-4 py-1.5 text-sm rounded-full transition ${skillTypeFilter === SkillType.LEARN ? 'bg-sky-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>To Learn</button>
            </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSkills.length > 0 ? (
            filteredSkills.map(skill => <SkillCard key={skill.id} skill={skill} loggedInUser={loggedInUser} onRequestSession={onRequestSession} />)
          ) : (
            <p className="md:col-span-2 text-center text-gray-500 dark:text-gray-400 mt-8">No skills found. Try adjusting your filters!</p>
          )}
        </div>
      </div>
      
      <div className="lg:col-span-1">
        <Leaderboard />
      </div>
    </div>
  );
};

export default Dashboard;
