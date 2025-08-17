import React, { useState, useEffect } from 'react';
import { SkillLevel, SkillType, Skill } from './types';

interface PostSkillModalProps {
  onClose: () => void;
  onPost: (skill: {
    skillName: string;
    skillType: SkillType;
    category: string;
    level: SkillLevel;
    description: string;
  }) => void;
  skillToEdit?: Skill | null;
}

const PostSkillModal: React.FC<PostSkillModalProps> = ({ onClose, onPost, skillToEdit }) => {
  const [skillName, setSkillName] = useState('');
  const [skillType, setSkillType] = useState<SkillType>(SkillType.TEACH);
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState<SkillLevel>(SkillLevel.BEGINNER);
  const [description, setDescription] = useState('');
  
  const isEditMode = !!skillToEdit;

  useEffect(() => {
    if (isEditMode) {
      setSkillName(skillToEdit.skillName);
      setSkillType(skillToEdit.skillType);
      setCategory(skillToEdit.category);
      setLevel(skillToEdit.level);
      setDescription(skillToEdit.description);
    }
  }, [skillToEdit, isEditMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillName || !category || !description) {
        alert("Please fill all fields");
        return;
    }
    onPost({ skillName, skillType, category, level, description });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg p-6 md:p-8 transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{isEditMode ? 'Edit Your Skill' : 'Post a New Skill'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skill Name</label>
              <textarea rows={1} value={skillName} onChange={(e) => setSkillName(e.target.value)} placeholder="e.g., Python Programming" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">I want to...</label>
              <div className="flex gap-4">
                <button type="button" onClick={() => setSkillType(SkillType.TEACH)} className={`flex-1 py-2 rounded-lg transition ${skillType === SkillType.TEACH ? 'bg-pink-500 text-white shadow-md' : 'bg-gray-200 dark:bg-gray-700'}`}>Teach</button>
                <button type="button" onClick={() => setSkillType(SkillType.LEARN)} className={`flex-1 py-2 rounded-lg transition ${skillType === SkillType.LEARN ? 'bg-sky-500 text-white shadow-md' : 'bg-gray-200 dark:bg-gray-700'}`}>Learn</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <textarea rows={1} value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g., Technology" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skill Level</label>
                <select value={level} onChange={(e) => setLevel(e.target.value as SkillLevel)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400">
                  {(Object.values(SkillLevel) as SkillLevel[]).map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Tell us more about the skill..." className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"></textarea>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button type="submit" className="px-6 py-2 font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
              {isEditMode ? 'Update Skill' : 'Post Skill'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostSkillModal;