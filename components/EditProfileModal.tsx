import React, { useState } from 'react';
import { User, Education } from './types';
import { DEPARTMENTS } from '../constants';

interface EditProfileModalProps {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, onClose, onSave }) => {
  const [name, setName] = useState(user.name);
  const [department, setDepartment] = useState(user.department);
  const [year, setYear] = useState(user.year);
  const [bio, setBio] = useState(user.bio);
  const [education, setEducation] = useState<Education>(user.education);
  
  const handleEduChange = (stage: keyof Education, field: string, value: string) => {
    setEducation(prev => ({
      ...prev,
      [stage]: {
        ...prev[stage],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...user,
      name,
      department,
      year,
      bio,
      education
    });
  };
  
  const FormSection: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{title}</h3>
        <div className="space-y-4">{children}</div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Your Profile</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <textarea rows={1} value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                  <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400">
                    {DEPARTMENTS.map(dep => <option key={dep} value={dep}>{dep}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
                  <select value={year} onChange={(e) => setYear(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400">
                    {[1, 2, 3, 4, 5, 6].map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"></textarea>
              </div>

              <FormSection title="Degree">
                <textarea value={education.degree.institution} onChange={(e) => handleEduChange('degree', 'institution', e.target.value)} placeholder="Institution" rows={2} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"></textarea>
                <div className="grid grid-cols-2 gap-4">
                  <textarea rows={1} value={education.degree.degreeName} onChange={(e) => handleEduChange('degree', 'degreeName', e.target.value)} placeholder="Degree Name (e.g., B.Tech)" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
                  <textarea rows={1} value={education.degree.major} onChange={(e) => handleEduChange('degree', 'major', e.target.value)} placeholder="Major" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
                </div>
                <textarea rows={1} value={education.degree.cgpa} onChange={(e) => handleEduChange('degree', 'cgpa', e.target.value)} placeholder="CGPA" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
                <textarea value={education.degree.about} onChange={(e) => handleEduChange('degree', 'about', e.target.value)} placeholder="About your degree..." rows={3} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"></textarea>
              </FormSection>
              
              <FormSection title="+2 / Intermediate">
                <textarea value={education.intermediate.institution} onChange={(e) => handleEduChange('intermediate', 'institution', e.target.value)} placeholder="Institution" rows={2} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"></textarea>
                <div className="grid grid-cols-2 gap-4">
                  <textarea rows={1} value={education.intermediate.board} onChange={(e) => handleEduChange('intermediate', 'board', e.target.value)} placeholder="Board (e.g., CBSE, ISC)" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
                  <textarea rows={1} value={education.intermediate.cgpa} onChange={(e) => handleEduChange('intermediate', 'cgpa', e.target.value)} placeholder="CGPA / Percentage" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
                </div>
              </FormSection>

              <FormSection title="Schooling">
                 <textarea value={education.schooling.institution} onChange={(e) => handleEduChange('schooling', 'institution', e.target.value)} placeholder="Institution" rows={2} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"></textarea>
                <div className="grid grid-cols-2 gap-4">
                  <textarea rows={1} value={education.schooling.board} onChange={(e) => handleEduChange('schooling', 'board', e.target.value)} placeholder="Board (e.g., CBSE, ICSE)" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
                  <textarea rows={1} value={education.schooling.marks} onChange={(e) => handleEduChange('schooling', 'marks', e.target.value)} placeholder="Marks / Percentage" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
                </div>
              </FormSection>
              
              <div className="mt-6 flex justify-end">
                <button type="submit" className="px-6 py-2 font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
                  Save Changes
                </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;