
import React, { useState } from 'react';
import { ForumQuestion, User, Answer } from './types';

interface QuestionDetailPageProps {
    question: ForumQuestion;
    currentUser: User;
    onPostAnswer: (questionId: string, content: string) => void;
    onBack: () => void;
}

const QuestionDetailPage: React.FC<QuestionDetailPageProps> = ({ question, currentUser, onPostAnswer, onBack }) => {
    const [newAnswer, setNewAnswer] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newAnswer.trim()) {
            onPostAnswer(question.id, newAnswer);
            setNewAnswer('');
        }
    };
    
    const AnswerCard: React.FC<{answer: Answer}> = ({ answer }) => (
        <div className="flex items-start space-x-4 py-4">
            <img src={answer.author.profilePhoto} alt={answer.author.name} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1">
                <div className="flex items-baseline space-x-2">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">{answer.author.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(answer.datePosted).toLocaleString()}
                    </p>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-1">{answer.content}</p>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto max-w-3xl">
            <button onClick={onBack} className="mb-6 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline">
                &larr; Back to Community Forum
            </button>

            {/* Question Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{question.title}</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <img src={question.author.profilePhoto} alt={question.author.name} className="w-6 h-6 rounded-full" />
                    <span>Posted by {question.author.name}</span>
                    <span>&bull;</span>
                    <span>{new Date(question.datePosted).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap mb-4">{question.content}</p>
                 <div className="flex flex-wrap gap-2">
                    {question.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Answers Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">{question.answers.length} Answers</h2>
                
                {question.answers.length > 0 ? (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {question.answers.map(ans => <AnswerCard key={ans.id} answer={ans} />)}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-8">Be the first to answer this question!</p>
                )}

                {/* Post an Answer Form */}
                <form onSubmit={handleSubmit} className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-start space-x-4">
                        <img src={currentUser.profilePhoto} alt={currentUser.name} className="w-10 h-10 rounded-full object-cover" />
                        <div className="flex-1">
                             <label className="block text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Your Answer</label>
                            <textarea
                                value={newAnswer}
                                onChange={(e) => setNewAnswer(e.target.value)}
                                rows={5}
                                placeholder="Share your knowledge..."
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                required
                            />
                            <div className="flex justify-end mt-4">
                                <button type="submit" className="px-6 py-2 font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
                                    Post Answer
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default QuestionDetailPage;