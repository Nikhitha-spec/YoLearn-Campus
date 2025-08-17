
import React, { useRef } from 'react';
import { User, Skill, Badge } from './types';
import BadgeComponent from './Badge';
import { EditIcon, CameraIcon } from './Icons';

interface ProfileProps {
  user: User;
  userSkills: Skill[];
  userBadges: Badge[];
  onEditProfile: () => void;
  onEditSkill: (skill: Skill) => void;
  completedSessionsCount: number;
  onProfilePictureChange: (file: File) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, userSkills, userBadges, onEditProfile, onEditSkill, completedSessionsCount, onProfilePictureChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onProfilePictureChange(file);
    }
  };

  const EducationCard: React.FC<{title: string, institution: string, details: string, marks: string}> = ({ title, institution, details, marks }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-purple-500 dark:text-purple-400 font-semibold uppercase">{title}</p>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mt-1">{institution}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{details}</p>
        </div>
        <div className="text-right flex-shrink-0 ml-4">
          <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">{marks}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Score</p>
        </div>
      </div>
      {user.education.degree.about && title === 'Degree' && (
         <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
           <p className="text-sm text-gray-600 dark:text-gray-400 italic">{user.education.degree.about}</p>
         </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto max-w-4xl">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 relative">
        <div className="absolute top-4 right-4">
          <button onClick={onEditProfile} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
            <EditIcon />
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative group flex-shrink-0">
            <img 
              src={user.profilePhoto} 
              alt={user.name} 
              className="w-32 h-32 rounded-full object-cover ring-4 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ring-purple-400"
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
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
            <p className="text-md text-purple-500 dark:text-purple-400 font-medium">{user.department} - Year {user.year}</p>
            <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-lg">{user.bio}</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 flex justify-around text-center">
            <div>
              <p className="text-2xl font-bold text-pink-500">{userSkills.length}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Skills Posted</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-sky-500">{userBadges.length}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Badges Earned</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-500">{completedSessionsCount}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Sessions Completed</p>
            </div>
        </div>
      </div>

      {/* Education */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Education</h2>
        <div className="space-y-4">
          <EducationCard 
            title="Degree"
            institution={user.education.degree.institution}
            details={`${user.education.degree.degreeName} in ${user.education.degree.major}`}
            marks={user.education.degree.cgpa}
          />
          <EducationCard 
            title="+2 / Intermediate"
            institution={user.education.intermediate.institution}
            details={`Board: ${user.education.intermediate.board}`}
            marks={user.education.intermediate.cgpa}
          />
          <EducationCard 
            title="Schooling"
            institution={user.education.schooling.institution}
            details={`Board: ${user.education.schooling.board}`}
            marks={user.education.schooling.marks}
          />
        </div>
      </div>

      {/* Badges */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Achievements</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
           {userBadges.length > 0 ? (
            <div className="flex flex-wrap gap-4">
                {userBadges.map(badge => <BadgeComponent key={badge.id} badge={badge} />)}
            </div>
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-4">No badges earned yet. Keep learning and mentoring!</p>
            )}
        </div>
      </div>

      {/* Skills and History */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">My Skills & History</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <ul>
            {userSkills.map(skill => (
                <li key={skill.id} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                  <div className="flex-grow">
                    <p className="font-semibold">{skill.skillName} <span className={`text-xs font-medium ml-2 px-2 py-0.5 rounded-full ${skill.skillType === 'teach' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200' : 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200'}`}>{skill.skillType}</span></p>
                    <p className="text-sm text-gray-500">{skill.category}</p>
                  </div>
                   <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 flex-shrink-0 ml-4">
                    <button onClick={() => onEditSkill(skill)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 mr-2">
                        <EditIcon className="w-4 h-4" />
                    </button>
                  </div>
                </li>
            ))}
             {userSkills.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">You haven't posted any skills yet!</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;