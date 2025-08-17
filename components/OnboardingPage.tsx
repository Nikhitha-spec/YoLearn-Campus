import React, { useState, useRef } from 'react';
import { User, Education } from './types';
import { CameraIcon } from './Icons';
import { DEPARTMENTS, YOLearnLogoURL } from '../constants';

interface OnboardingPageProps {
  user: User;
  onComplete: (details: { department: string; year: number; bio: string; education: Education; }) => void;
  onProfilePictureChange: (file: File) => void;
}

const OnboardingPage: React.FC<OnboardingPageProps> = ({ user, onComplete, onProfilePictureChange }) => {
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [year, setYear] = useState(1);
  const [bio, setBio] = useState('');
  const [education, setEducation] = useState<Education>({
    degree: { institution: '', degreeName: '', major: '', cgpa: '', about: '' },
    intermediate: { institution: '', board: '', cgpa: '' },
    schooling: { institution: '', board: '', marks: '' },
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (department && year && bio && education.degree.institution && education.intermediate.institution && education.schooling.institution) {
      onComplete({ department, year, bio, education });
    } else {
      alert('Please fill out all fields to complete your profile.');
    }
  };
  
  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onProfilePictureChange(file);
    }
  };
  
  const FormSection: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div className="pt-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{title}</h3>
        <div className="space-y-4">{children}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center p-4 transition-colors duration-300">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-8">
            <img 
              src={YOLearnLogoURL} 
              alt="YoLearn Campus Logo"
              className="w-64 h-auto"
            />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">Welcome, {user.name.split(' ')[0]}!</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">Let's set up your profile.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                <div className="flex justify-center">
                    <div className="relative group flex-shrink-0">
                        <img 
                          src={user.profilePhoto} 
                          alt={user.name} 
                          className="w-24 h-24 rounded-full object-cover ring-4 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ring-purple-400"
                        />
                        <div 
                          onClick={handlePhotoClick} 
                          className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-opacity duration-300 cursor-pointer"
                        >
                          <CameraIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleFileChange}
                          className="hidden" 
                          accept="image/*" 
                        />
                    </div>
                </div>
                
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                        <select 
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400" 
                            required
                        >
                          {DEPARTMENTS.map(dep => <option key={dep} value={dep}>{dep}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year of Study</label>
                        <select 
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400" 
                            required
                        >
                           {[1, 2, 3, 4, 5, 6].map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>
                </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                    <textarea 
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={4}
                        placeholder="Tell your peers a little about yourself..." 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400" 
                        required
                    />
                </div>

                <FormSection title="Degree">
                  <textarea value={education.degree.institution} onChange={(e) => handleEduChange('degree', 'institution', e.target.value)} placeholder="Institution" rows={2} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" required></textarea>
                  <div className="grid grid-cols-2 gap-4">
                    <textarea rows={1} value={education.degree.degreeName} onChange={(e) => handleEduChange('degree', 'degreeName', e.target.value)} placeholder="Degree Name (e.g., B.Tech)" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" required />
                    <textarea rows={1} value={education.degree.major} onChange={(e) => handleEduChange('degree', 'major', e.target.value)} placeholder="Major" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" required />
                  </div>
                  <textarea rows={1} value={education.degree.cgpa} onChange={(e) => handleEduChange('degree', 'cgpa', e.target.value)} placeholder="CGPA" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" required />
                  <textarea value={education.degree.about} onChange={(e) => handleEduChange('degree', 'about', e.target.value)} placeholder="About your degree..." rows={3} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" required></textarea>
                </FormSection>
                
                <FormSection title="+2 / Intermediate">
                  <textarea value={education.intermediate.institution} onChange={(e) => handleEduChange('intermediate', 'institution', e.target.value)} placeholder="Institution" rows={2} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" required></textarea>
                  <div className="grid grid-cols-2 gap-4">
                    <textarea rows={1} value={education.intermediate.board} onChange={(e) => handleEduChange('intermediate', 'board', e.target.value)} placeholder="Board (e.g., CBSE, ISC)" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" required />
                    <textarea rows={1} value={education.intermediate.cgpa} onChange={(e) => handleEduChange('intermediate', 'cgpa', e.target.value)} placeholder="CGPA / Percentage" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" required />
                  </div>
                </FormSection>

                <FormSection title="Schooling">
                  <textarea value={education.schooling.institution} onChange={(e) => handleEduChange('schooling', 'institution', e.target.value)} placeholder="Institution" rows={2} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" required></textarea>
                  <div className="grid grid-cols-2 gap-4">
                    <textarea rows={1} value={education.schooling.board} onChange={(e) => handleEduChange('schooling', 'board', e.target.value)} placeholder="Board (e.g., CBSE, ICSE)" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" required />
                    <textarea rows={1} value={education.schooling.marks} onChange={(e) => handleEduChange('schooling', 'marks', e.target.value)} placeholder="Marks / Percentage" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" required />
                  </div>
                </FormSection>

                <button type="submit" className="w-full px-6 py-3 mt-6 font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
                    Save and Continue
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;