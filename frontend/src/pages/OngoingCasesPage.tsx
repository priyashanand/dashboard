import React, { useState, useEffect, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { SearchInput } from '../components/common/SearchInput';
import { OngoingCaseCard } from '../components/case/OngoingCaseCard';
import type { Case } from '../types'; // Import the Case type
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

/**
 * Ongoing Cases Page Component
 * Displays a grid of accepted ongoing cases fetched from an API, with search and add functionality.
 */
export const OngoingCasesPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [ongoingCases, setOngoingCases] = useState<Case[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate(); // Initialize the navigate function



    useEffect(() => {
        const fetchOngoingCases = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get<{ cases: Case[] }>('http://localhost:3000/api/getCase');
                const acceptedCases: Case[] = response.data.cases.filter(
                    (caseItem) => caseItem.status === 'accepted'
                );
                console.log(response.data.cases[0]._id)
    
                setOngoingCases(acceptedCases);
            } catch (err) {
                console.error('Error fetching ongoing cases:', err);
                setError('Failed to load ongoing cases.');
            } finally {
                setLoading(false);
            }
        };

        fetchOngoingCases();
    }, []);

    // Filter ongoing cases based on search term (searches name)
    const filteredCases = useMemo(() => {
        if (!searchTerm) {
            return ongoingCases;
        }
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return ongoingCases.filter(c =>
            c.name?.type.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }, [searchTerm, ongoingCases]);

    // Function to navigate to the case details page
    const handleCardClick = (caseId: string) => {
        navigate(`/cases/${caseId}`);
    };

    if (loading) {
        return <div className="p-6 bg-white h-full flex items-center justify-center">Loading ongoing cases...</div>;
    }

    if (error) {
        return <div className="p-6 bg-white h-full flex items-center justify-center text-red-500">Error loading ongoing cases: {error}</div>;
    }

    return (
        // Container for the Ongoing Cases page content
        <div className="p-6 bg-white h-full flex flex-col">
            {/* Page Title */}
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Ongoing Cases</h1>

            {/* Header Section: Title, Subtitle, Search, Add Button */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-medium text-gray-800">Accepted Cases</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Listing all accepted cases.
                    </p>
                </div>
                <div className="flex items-center space-x-4 flex-grow sm:flex-grow-0">
                    <div className="w-full sm:w-64"> {/* Limit search input width */}
                        <SearchInput
                            placeholder="Search cases..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Case
                    </button>
                </div>
            </div>

            {/* Cases Grid Section - Takes remaining vertical space and allows scrolling */}
            <div className="flex-grow overflow-y-auto -mx-3"> {/* Negative margin to counteract card padding */}
                {filteredCases.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 p-3"> {/* Responsive grid */}
                        {filteredCases.map((caseData) => (
                            <div
                                key={caseData._id}
                                onClick={() => handleCardClick(caseData._id)} // Handle card click
                                className="cursor-pointer hover:scale-[1.02] transition-transform"
                            >
                                <OngoingCaseCard caseData={caseData} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                         <p className="text-gray-500">No accepted ongoing cases found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
