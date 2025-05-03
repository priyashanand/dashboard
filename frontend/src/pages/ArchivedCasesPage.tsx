import React, { useState, useEffect, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { SearchInput } from '../components/common/SearchInput';
import { OngoingCaseCard } from '../components/case/OngoingCaseCard'; // Reusing OngoingCaseCard
import type { OngoingCase } from '../types'; // Assuming ArchivedCase has the same structure as OngoingCase
import axios from 'axios';

/**
 * Archived Cases Page Component
 * Displays a grid of archived cases fetched from an API, with search functionality,
 * reusing the OngoingCaseCard component.
 */
export const ArchivedCasesPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [archivedCases, setArchivedCases] = useState<OngoingCase[]>([]); // Using OngoingCase type
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArchivedCases = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get<{ cases: any[] }>('http://localhost:3000/api/getCase');
                const archivedCasesData: OngoingCase[] = response.data.cases
                    .filter(caseItem => caseItem.status === 'archived')
                    .map(caseItem => ({
                        id: caseItem._id,
                        name: caseItem.name,
                        email: caseItem.email,
                        phone: caseItem.phone,
                        dob: caseItem.dob ? new Date(caseItem.dob).toLocaleDateString() : 'N/A',
                        streetAddress: caseItem.streetAddress || 'N/A',
                        // Ensure all properties expected by OngoingCaseCard are present
                    }));
                setArchivedCases(archivedCasesData);
            } catch (err: any) {
                console.error('Error fetching archived cases:', err);
                setError('Failed to load archived cases.');
            } finally {
                setLoading(false);
            }
        };

        fetchArchivedCases();
    }, []);

    // Filter archived cases based on search term (searches name)
    const filteredCases = useMemo(() => {
        if (!searchTerm) {
            return archivedCases;
        }
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return archivedCases.filter(c =>
            c.name.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }, [searchTerm, archivedCases]);

    if (loading) {
        return <div className="p-6 bg-white h-full flex items-center justify-center">Loading archived cases...</div>;
    }

    if (error) {
        return <div className="p-6 bg-white h-full flex items-center justify-center text-red-500">Error loading archived cases: {error}</div>;
    }

    return (
        // Container for the Archived Cases page content
        <div className="p-6 bg-white h-full flex flex-col">
            {/* Page Title */}
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Archived Cases</h1>

            {/* Header Section: Title, Subtitle, Search */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-medium text-gray-800">Archived Cases</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Listing all archived cases.
                    </p>
                </div>
                <div className="flex items-center space-x-4 flex-grow sm:flex-grow-0">
                    <div className="w-full sm:w-64"> {/* Limit search input width */}
                        <SearchInput
                            placeholder="Search archived cases..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {/* Add New Case button (optional for archived cases) */}
                    {/* <button className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Case
                    </button> */}
                </div>
            </div>

            {/* Cases Grid Section - Takes remaining vertical space and allows scrolling */}
            <div className="flex-grow overflow-y-auto -mx-3"> {/* Negative margin to counteract card padding */}
                {filteredCases.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 p-3"> {/* Responsive grid */}
                        {filteredCases.map((caseData) => (
                            <OngoingCaseCard key={caseData.id} caseData={caseData} />
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                         <p className="text-gray-500">No archived cases found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};