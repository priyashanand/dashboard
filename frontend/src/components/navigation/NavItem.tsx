import React from 'react';
import type { NavItemProps } from '../../types'; // Import the specific type

/**
 * Navigation Item Component for Sidebar (Used within Link)
 */
export const NavItemDisplay: React.FC<Omit<NavItemProps, 'to'>> = ({ icon: Icon, label, active = false }) => (
    // This component just handles the display, the Link component handles navigation
    <div // Changed from <a> to <div> or <span> as Link handles the anchor
        className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 cursor-pointer ${
          active
            ? 'bg-blue-100 text-blue-700'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}
      >
        <Icon className={`w-5 h-5 mr-3 ${active ? 'text-blue-600' : 'text-gray-500'}`} />
        {label}
    </div>
);