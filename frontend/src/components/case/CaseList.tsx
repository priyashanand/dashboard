import React, { useState, useEffect } from 'react';
import { SearchInput } from '../common/SearchInput';
import { CaseListItem } from './CaseListItem';
import type { CaseListProps, Case } from '../../types';

const avatarBgColors = ['bg-indigo-500', 'bg-green-500', 'bg-orange-500', 'bg-blue-500'];

/**
 * Case List Component (Left side of Intake Page)
 */
export const CaseList: React.FC<CaseListProps> = ({ cases: initialCases, selectedCaseId, onSelectCase }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCases, setFilteredCases] = useState<Case[]>([]);

    // Function to generate initials
    const getInitials = (name?: string): string => {
        const nameParts = name?.split(' ') || [];
        return nameParts
            .slice(0, 2)
            .map((part) => part.charAt(0).toUpperCase())
            .join('');
    };

    // Function to determine avatar background color
    const getAvatarBgColor = (name?: string): string => {
        const nameHash = name?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 0;
        return avatarBgColors[nameHash % avatarBgColors.length];
    };

    // Update filtered cases whenever the search term or initial cases change
    useEffect(() => {
        const newFilteredCases = initialCases
            .map(c => ({
                ...c,
                initials: getInitials(c.name?.type),
                avatarBgColor: getAvatarBgColor(c.name?.type),
            }))
            .filter(c =>
                c.name?.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (c.phone?.type ?? '').toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter(c => c.status === 'inProcess'); // Only show cases with status "in-progress"
        setFilteredCases(newFilteredCases);
    }, [searchTerm, initialCases]);

    return (
        <div className="w-full md:w-2/5 lg:w-1/3 xl:w-1/4 border-r border-gray-200 flex flex-col h-full flex-shrink-0">
            <div className="p-4 border-b border-gray-200 flex-shrink-0">
                <SearchInput
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex-grow overflow-y-auto p-2 space-y-1">
                {filteredCases.length > 0 ? (
                    filteredCases.map((caseItem) => (
                        <CaseListItem
                            key={caseItem._id}
                            caseData={caseItem}
                            isSelected={selectedCaseId === caseItem._id}
                            onClick={() => onSelectCase(caseItem._id!)}
                        />
                    ))
                ) : (
                    <p className="text-sm text-gray-500 p-4 text-center">No cases found with status "inProcess".</p>
                )}
            </div>
        </div>
    );
};
