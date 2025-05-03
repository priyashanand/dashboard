import React from 'react';
import type { CaseListItemProps } from '../../types';

/**
 * Case List Item Component
 */
export const CaseListItem: React.FC<CaseListItemProps> = ({ caseData, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 transition-colors duration-150 ${
      isSelected ? 'bg-gray-100' : 'hover:bg-gray-50'
    }`}
  >
    {/* Avatar/Initials */}
    <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-white font-medium text-sm ${caseData.avatarBgColor}`}>
      {caseData.initials}
    </div>
    {/* Name and Details */}
    <div className="flex-grow min-w-0">
      <p className="text-sm font-medium text-gray-800 truncate">{caseData.name}</p>
      {/* Display casePhone if available, otherwise fallback to general phone */}
      <p className="text-xs text-gray-500 truncate">{caseData.phone ?? caseData.phone ?? 'No phone'}</p>
    </div>
    {/* Status Indicator */}
    {caseData.status === 'active' && <div className="w-2.5 h-2.5 bg-green-500 rounded-full flex-shrink-0"></div>}
    {caseData.status === 'unknown' && <div className="w-2.5 h-2.5 bg-gray-400 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[8px] font-bold">?</div>}
  </button>
);