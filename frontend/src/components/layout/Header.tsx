import React from 'react';
// *** MODIFIED: Import useLocation ***
import { useLocation } from 'react-router-dom';
import { UserProfile } from '../user/UserProfile';
import { Link } from 'react-router-dom';
// *** REMOVED HeaderProps interface ***

// Helper function to get page name from path
const getPageNameFromPath = (path: string): string => {
    // Simple mapping, can be made more robust
    switch (path) {
        case '/': return 'Intake';
        case '/providers': return 'Providers';
        case '/ongoing-cases': return 'Ongoing Cases';
        case '/lien-resolution': return 'Lien Resolution';
        case '/archive': return 'Archive';
        case '/settings': return 'Settings';
        default: return 'Dashboard'; // Fallback
    }
};

export const Header: React.FC = () => {
  // *** MODIFIED: Get current location and determine page name ***
  const location = useLocation();
  const pageName = getPageNameFromPath(location.pathname);

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 fixed top-0 left-64 right-0 z-10">
      {/* Breadcrumbs - Now dynamic based on location */}
      <div className="text-sm text-gray-500">
        {/* Consider making "Home" a Link to '/' */}
        <Link to="/" className="hover:text-gray-700">Home</Link>
        <span className="mx-1">&gt;</span>
        <span className="font-medium text-gray-700">{pageName}</span> {/* Display derived page name */}
      </div>
      <UserProfile name="Emirhan Boruch" avatarUrl="https://placehold.co/32x32/e2e8f0/64748b?text=EB"/>
    </header>
  );
};
