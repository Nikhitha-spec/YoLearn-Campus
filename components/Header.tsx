import React, { useState } from 'react';
import { User, Page } from './types';
import { BellIcon, MoonIcon, SunIcon, UsersIcon, DashboardIcon, CalendarDaysIcon } from './Icons';
import { YOLearnLogoURL } from '../constants';

interface HeaderProps {
  user: User;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  currentPage: Page;
  unreadNotificationsCount: number;
}

const Header: React.FC<HeaderProps> = ({ user, isDarkMode, toggleDarkMode, onNavigate, onLogout, currentPage, unreadNotificationsCount }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const NavLink: React.FC<{page: Page, label: string, icon: JSX.Element}> = ({ page, label, icon }) => {
    const isActive = currentPage === page || (page === 'community' && currentPage === 'questionDetail');
    return (
       <button
        onClick={() => { onNavigate(page); setIsProfileMenuOpen(false); }}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium ${
          isActive
            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300'
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        {icon}
        <span>{label}</span>
      </button>
    );
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <img 
              src={YOLearnLogoURL} 
              alt="YoLearn Campus Logo"
              className="h-12 w-auto cursor-pointer"
              onClick={() => onNavigate('dashboard')}
            />
            <nav className="hidden md:flex items-center space-x-2">
                <NavLink page="dashboard" label="Dashboard" icon={<DashboardIcon />} />
                <NavLink page="matches" label="Matches" icon={<CalendarDaysIcon />} />
                <NavLink page="community" label="Community" icon={<UsersIcon />} />
            </nav>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              aria-label={isDarkMode ? 'Activate light mode' : 'Activate dark mode'}
            >
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>
            
            <div className="relative">
                <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="relative p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
                    <BellIcon />
                    {unreadNotificationsCount > 0 && (
                      <span className="absolute top-1 right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500 justify-center items-center text-white text-[8px]">{unreadNotificationsCount}</span>
                      </span>
                    )}
                </button>
                {isNotificationsOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
                        <div className="p-2">
                          <div className="flex justify-between items-center p-2">
                            <p className="text-sm font-semibold">Notifications</p>
                            <button onClick={() => { onNavigate('notifications'); setIsNotificationsOpen(false); }} className="text-xs text-purple-600 dark:text-purple-400 hover:underline">View all</button>
                          </div>
                          {/* Showing only first 3 notifications */}
                          <div className="max-h-60 overflow-y-auto">
                          </div>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="relative">
              <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="block h-10 w-10 rounded-full overflow-hidden border-2 border-transparent hover:border-purple-400 focus:outline-none focus:border-purple-500">
                <img className="h-full w-full object-cover" src={user.profilePhoto} alt="Profile" />
              </button>
              {isProfileMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
                  <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('profile'); setIsProfileMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Your Profile</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('settings'); setIsProfileMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Settings</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); setIsProfileMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Sign out</a>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-around space-x-2 py-2 border-t border-gray-200 dark:border-gray-700">
            <NavLink page="dashboard" label="Dashboard" icon={<DashboardIcon />} />
            <NavLink page="matches" label="Matches" icon={<CalendarDaysIcon />} />
            <NavLink page="community" label="Community" icon={<UsersIcon />} />
        </div>
      </div>
    </header>
  );
};

export default Header;