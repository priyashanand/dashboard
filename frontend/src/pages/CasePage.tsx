import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { CaseDetails } from '../components/case/CaseDetails';
import type { Case as CaseType } from '../types';
import axios from 'axios';
import SelectProviderModal from '../components/case/SelectProviderModal'; // <-- Import modal

export const CasePage: React.FC = () => {
    const { caseid } = useParams<{ caseid: string }>();

    const [cases, setCases] = useState<CaseType[]>([]);
    const [caseData, setCaseData] = useState<CaseType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchCases = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<{ cases: CaseType[] }>('http://localhost:3000/api/getCase');
            setCases(response.data.cases);
        } catch (error) {
            console.error('Error fetching cases:', error);
            setError('Failed to load cases.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCases();
    }, [fetchCases]);

    useEffect(() => {
        if (caseid && cases.length > 0) {
            const foundCase = cases.find(c => c._id === caseid);
            if (foundCase) {
                setCaseData(foundCase);
            } else {
                setError('Case not found.');
            }
        }
    }, [caseid, cases]);

    const handleAddProviders = async (selectedProviderIds: string[]) => {
        try {
            await axios.post('http://localhost:3000/api/addProvidersToCase', {
                caseId: caseid,
                providerIds: selectedProviderIds
            });
            alert('Providers added successfully!');
            fetchCases(); // Refresh case data
        } catch (error) {
            console.error('Error adding providers:', error);
            alert('Failed to add providers.');
        }
    };

    if (!caseid) return <div>Invalid case ID</div>;
    if (loading) return <div>Loading case details...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="px-6 pt-6 pb-0 border-b border-gray-200 flex-shrink-0">
                <h1 className="text-2xl font-semibold text-gray-900 mb-4">Case Details</h1>
            </div>

            <div className="px-6 py-4">
                <p>Case Type: {caseData?.name?.type}</p>
                <p>Status: {caseData?.status}</p>
                <button
                    className="bg-slate-300 px-4 py-2 rounded hover:bg-slate-400"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Providers
                </button>
            </div>

            <div className="flex flex-grow overflow-hidden min-h-0">
                <CaseDetails
                    selectedCase={caseData}
                    setSelectedCase={() => {}}
                    onCaseUpdated={() => {}}
                    onCaseCreated={() => {}}
                />
            </div>

            <SelectProviderModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelect={handleAddProviders}
            />
        </div>
    );
};
