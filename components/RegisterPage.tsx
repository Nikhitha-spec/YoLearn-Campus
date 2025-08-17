
import React, { useState } from 'react';
import { YOLearnLogoURL } from '../constants';
import { User } from './types';

interface RegisterPageProps {
  onRegister: (userData: Pick<User, 'name' | 'email' | 'password'>) => void;
  onSwitchToLogin: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      onRegister({ name, email, password });
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
            <img 
              src={YOLearnLogoURL} 
              alt="YoLearn Campus Logo"
              className="w-64 h-auto"
            />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Create Your Account</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <textarea 
                        rows={1}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Doe" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400" 
                        required
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@university.edu" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400" 
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400" 
                        required
                    />
                </div>
                <button type="submit" className="w-full px-6 py-3 font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
                    Create Account
                </button>
            </form>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                Already have an account?{' '}
                <button onClick={onSwitchToLogin} className="font-medium text-purple-600 dark:text-purple-400 hover:underline">
                    Log in
                </button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;