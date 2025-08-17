
import React from 'react';
import { Badge as BadgeType } from './types';

interface BadgeProps {
    badge: BadgeType;
}

const Badge: React.FC<BadgeProps> = ({ badge }) => {
    return (
        <div className="group relative flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 flex items-center justify-center text-purple-500 dark:text-purple-300 transition-transform duration-300 group-hover:scale-110">
                {React.isValidElement(badge.icon) && React.cloneElement(badge.icon as React.ReactElement<{ className?: string }>, { className: 'w-8 h-8' })}
            </div>
            <p className="mt-2 text-xs font-semibold text-gray-700 dark:text-gray-300">{badge.name}</p>
            <div className="absolute bottom-full mb-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Awarded: {new Date(badge.dateAwarded).toLocaleDateString()}
            </div>
        </div>
    )
}

export default Badge;