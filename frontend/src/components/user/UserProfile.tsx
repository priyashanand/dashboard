import React from 'react';
import { ChevronDown } from 'lucide-react';
import type { UserProfileProps } from '../../types';

/**
 * User Profile Display Component (Top Right)
 */
export const UserProfile: React.FC<UserProfileProps> = ({ name, avatarUrl }) => (
  <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-150">
    {avatarUrl ? (
      <img
        src={avatarUrl}
        alt={name}
        className="w-8 h-8 rounded-full object-cover"
        // Basic error handling: display initials if image fails
        onError={(e) => (e.currentTarget.src = `https://placehold.co/32x32/007bff/ffffff?text=${name.charAt(0).toUpperCase()}`)}
      />
    ) : (
      // Fallback to initials if no avatar URL is provided
      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
        {name.charAt(0).toUpperCase()}
      </div>
    )}
    <span className="text-sm font-medium text-gray-700 hidden md:inline">{name}</span>
    <ChevronDown className="w-4 h-4 text-gray-500" />
  </button>
);
