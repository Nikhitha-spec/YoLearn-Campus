import React, { useState } from 'react';
import { ForumQuestion } from './types';

interface PostQuestionModalProps {
  onClose: () => void;
  onPost: (question: Omit<ForumQuestion, 'id' | 'author' | 'datePosted' | 'answers'>) => void;
}

const PostQuestionModal: React.FC<PostQuestionModalProps> = ({ onClose, onPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
        alert("Please provide a title and content for your question.");
        return;
    }
    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);
    onPost({ title, content, tags: tagsArray });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg p-6 md:p-8 transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Ask a Question</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <textarea rows={1} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What's your question?" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={5} placeholder="Provide more details here..." className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags</label>
              <textarea rows={1} value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g., react, javascript, art" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400" />
              <p className="text-xs text-gray-500 mt-1">Separate tags with commas.</p>
            </div>

          <div className="mt-6 flex justify-end">
            <button type="submit" className="px-6 py-2 font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
              Post Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostQuestionModal;