import React from 'react';
// *** MODIFIED: Import Link and useLocation ***
import { Link, useLocation } from 'react-router-dom';
import { Settings, LogOut, FileText, Archive, FolderOpen, Users, LayoutGrid } from 'lucide-react';
// *** MODIFIED: Import NavItemDisplay (renamed from NavItem) ***
import { NavItemDisplay } from '../navigation/NavItem';

// *** REMOVED SidebarProps interface ***

export const Sidebar: React.FC = () => {
  // *** MODIFIED: Get current location ***
  const location = useLocation();
  const currentPath = location.pathname;

  // Define menu items structure with paths for Links
  const menuItems = [
    { icon: LayoutGrid, label: 'Intake', path: '/' },
    { icon: FolderOpen, label: 'Ongoing Cases', path: '/ongoing-cases' }, // Example path
    { icon: FileText, label: 'Lien Resolution', path: '/lien-resolution' }, // Example path
    { icon: Archive, label: 'Archive', path: '/archived-cases' }, // Example path
    { icon: Users, label: 'Providers', path: '/providers' },
  ];

  // Define user options structure with paths
  const userOptions = [
    { icon: Settings, label: 'Settings', path: '/settings' }, // Example path
    { icon: LogOut, label: 'Logout', path: '/logout' }, // Example path (might trigger an action instead)
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0 z-20">
      <div className="h-16 flex items-center px-6 border-b border-gray-200 flex-shrink-0">
        <span className="text-xl font-bold text-blue-600">INJURYSYNC</span>
      </div>
      <nav className="flex-grow px-4 py-6 space-y-1 overflow-y-auto">
        <div>
          <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Menu</h3>
          <div className="space-y-1">
            {menuItems.map((item) => (
              // *** MODIFIED: Wrap NavItemDisplay with Link ***
              <Link key={item.label} to={item.path} className="block"> {/* Use block to make Link take full width */}
                <NavItemDisplay
                  icon={item.icon}
                  label={item.label}
                  // *** MODIFIED: Determine active state based on currentPath ***
                  active={currentPath === item.path}
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="pt-4">
          <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">User Options</h3>
           <div className="space-y-1">
            {userOptions.map((item) => (
              // *** MODIFIED: Wrap NavItemDisplay with Link ***
              <Link key={item.label} to={item.path} className="block">
                <NavItemDisplay
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  // *** MODIFIED: Determine active state based on currentPath ***
                  active={currentPath === item.path}
                />
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};
