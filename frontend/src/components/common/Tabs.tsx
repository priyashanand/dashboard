import React from 'react';
import type { TabsProps } from '../../types';

/**
 * Tabs Component
 */
export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabClick }) => (
  <div className="border-b border-gray-200">
    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
      {tabs.map((tab, index) => (
        <button
          key={tab.label}
          onClick={() => onTabClick(index)}
          className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-150 ${
            activeTab === index
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={`ml-2 inline-block py-0.5 px-2 rounded-full text-xs font-semibold ${
                activeTab === index ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
            }`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </nav>
  </div>
);
