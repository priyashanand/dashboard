import React from 'react';
import { Search } from 'lucide-react';
import type { SearchInputProps } from '../../types';

/**
 * Search Input Component
 */
export const SearchInput: React.FC<SearchInputProps> = ({ placeholder, value, onChange }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Search className="w-4 h-4 text-gray-400" />
    </div>
    <input
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
    />
  </div>
);