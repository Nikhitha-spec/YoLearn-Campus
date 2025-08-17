import React, { useState, useRef } from 'react';
import { User, Education } from './types';
import { DEPARTMENTS } from '../constants';

interface SettingsPageProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onProfilePictureChange: (file: File) => void;
  onDeleteUser: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ user, onUpdateUser, isDarkMode, toggleDarkMode, onProfilePictureChange, onDeleteUser }) => {
  const [name, setName] = useState(user.name);
  const [department, setDepartment] = useState(user.department);
  const [year, setYear] = useState(user.year);
  const [bio, setBio] = useState(user.bio);
  const [education, setEducation] = useState<Education>(user.education);
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

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ ...user, name, department, year, bio, education });
    alert('Profile updated successfully!');
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
  
  const handleDeleteClick = () => {
      if (confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) {
          onDeleteUser();
      }
  }

  const Section: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">{title}</h3>
      {children}
    </div>
  );
  
  const FormSubSection: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-3">{title}</h3>
        <div className="space-y-4">{children}</div>
    </div>
  );

  const ToggleSwitch: React.FC<{label: string, enabled: boolean, onToggle: () => void}> = ({ label, enabled, onToggle }) => (
    <div className="flex justify-between items-center">
      <span className="text-gray-700 dark:text-gray-300">{label}</span>
      <button onClick={onToggle} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${enabled ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`}/>
      </button>
    </div>
  );


  return (
    <div className="container mx-auto max-w-3xl">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Settings</h2>
      <div className="space-y-8">
        
        <Section title="Profile & Education">
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <img src={user.profilePhoto} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <button type="button" onClick={handlePhotoClick} className="px-4 py-2 text-sm font-medium text-purple-700 dark:text-purple-300 border border-purple-500 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/50">
                  Change Photo
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange}
                  className="hidden" 
                  accept="image/*" 
                />
              </div>
            </div>
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
            
            <FormSubSection title="Degree">
                <textarea value={education.degree.institution} onChange={(e) => handleEduChange('degree', 'institution', e.target.value)} placeholder="Institution" rows={2} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"></textarea>
                <div className="grid grid-cols-2 gap-4">
                  <textarea rows={1} value={education.degree.degreeName} onChange={(e) => handleEduChange('degree', 'degreeName', e.target.value)} placeholder="Degree Name (e.g., B.Tech)" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
                  <textarea rows={1} value={education.degree.major} onChange={(e) => handleEduChange('degree', 'major', e.target.value)} placeholder="Major" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
                </div>
                <textarea rows={1} value={education.degree.cgpa} onChange={(e) => handleEduChange('degree', 'cgpa', e.target.value)} placeholder="CGPA" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
                <textarea value={education.degree.about} onChange={(e) => handleEduChange('degree', 'about', e.target.value)} placeholder="About your degree..." rows={3} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"></textarea>
            </FormSubSection>
            
            <FormSubSection title="+2 / Intermediate">
                <textarea value={education.intermediate.institution} onChange={(e) => handleEduChange('intermediate', 'institution', e.target.value)} placeholder="Institution" rows={2} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"></textarea>
                <div className="grid grid-cols-2 gap-4">
                  <textarea rows={1} value={education.intermediate.board} onChange={(e) => handleEduChange('intermediate', 'board', e.target.value)} placeholder="Board (e.g., CBSE, ISC)" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
                  <textarea rows={1} value={education.intermediate.cgpa} onChange={(e) => handleEduChange('intermediate', 'cgpa', e.target.value)} placeholder="CGPA / Percentage" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
                </div>
            </FormSubSection>
            
            <FormSubSection title="Schooling">
                 <textarea value={education.schooling.institution} onChange={(e) => handleEduChange('schooling', 'institution', e.target.value)} placeholder="Institution" rows={2} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"></textarea>
                <div className="grid grid-cols-2 gap-4">
                  <textarea rows={1} value={education.schooling.board} onChange={(e) => handleEduChange('schooling', 'board', e.target.value)} placeholder="Board (e.g., CBSE, ICSE)" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
                  <textarea rows={1} value={education.schooling.marks} onChange={(e) => handleEduChange('schooling', 'marks', e.target.value)} placeholder="Marks / Percentage" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
                </div>
            </FormSubSection>
            
            <div className="flex justify-end pt-4">
              <button type="submit" className="px-5 py-2 font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">Save Changes</button>
            </div>
          </form>
        </Section>

        {/* Account Settings */}
        <Section title="Account Settings">
          <div className="space-y-4">
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <input type="email" value={user.email} readOnly className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-200 dark:bg-gray-700 cursor-not-allowed" />
              </div>
               <div>
                <button className="w-full sm:w-auto px-5 py-2 text-sm font-medium text-purple-700 dark:text-purple-300 border border-purple-500 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/50">Change Password</button>
              </div>
          </div>
        </Section>

        {/* Appearance */}
        <Section title="Appearance">
          <ToggleSwitch label="Dark Mode" enabled={isDarkMode} onToggle={toggleDarkMode} />
        </Section>

        {/* Notifications */}
        <Section title="Notifications">
            <div className="space-y-3">
                <ToggleSwitch label="New Matches" enabled={true} onToggle={() => {}} />
                <ToggleSwitch label="Session Reminders" enabled={true} onToggle={() => {}} />
                <ToggleSwitch label="Forum Replies" enabled={false} onToggle={() => {}} />
                <ToggleSwitch label="Platform Updates" enabled={true} onToggle={() => {}} />
            </div>
        </Section>

        {/* Delete Account */}
        <Section title="Danger Zone">
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Delete Your Account</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Permanently remove your data. This action is not reversible.</p>
                </div>
                <button onClick={handleDeleteClick} className="px-5 py-2 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg">Delete Account</button>
            </div>
        </Section>
      </div>
    </div>
  );
};

export default SettingsPage;