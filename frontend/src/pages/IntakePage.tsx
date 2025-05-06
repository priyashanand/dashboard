import React, { useState, useEffect, useCallback } from 'react';
import { Tabs } from '../components/common/Tabs';
import { CaseList } from '../components/case/CaseList';
import { CaseDetails } from '../components/case/CaseDetails';
import type { Case as CaseType, TabItem } from '../types';
import axios from 'axios';

export const IntakePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [cases, setCases] = useState<CaseType[]>([]);
    const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [intakeTabs, setIntakeTabs] = useState<TabItem[]>([ // Use state for tabs
        { label: 'New Cases', count: 0 },
        { label: 'Archived', count: 0 },
    ]);

    const fetchCases = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<{ cases: CaseType[] }>('http://localhost:3000/api/getCase');
            const fetchedCases = response.data.cases;
            setCases(fetchedCases);
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
        // Calculate counts whenever cases change
        const newCasesCount = cases.filter(c => c.status === 'in-progress' || c.status === 'accepted').length;
        const archivedCasesCount = cases.filter(c => c.status === 'archived').length;

        // Update the tab counts.  Use setIntakeTabs
        setIntakeTabs([
            { label: 'New Cases', count: newCasesCount },
            { label: 'Archived', count: archivedCasesCount },
        ]);
    }, [cases]);

    const handleCaseUpdated = (updatedCaseId: string, newStatus: 'accepted' | 'archived') => {
        setCases(prevCases =>
            prevCases.map(caseItem =>
                caseItem._id === updatedCaseId ? { ...caseItem, status: newStatus } : caseItem
            )
        );
    };

    const handleCaseCreated = useCallback((newCase: CaseType) => {
        fetchCases(); // Refetch all cases
        if (newCase._id !== undefined) {
            setSelectedCaseId(newCase._id);
        }
    }, [fetchCases]);

    const selectedCase = cases.find(c => c._id === selectedCaseId) || null;

    if (loading) {
        return <div>Loading cases...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="px-6 pt-6 pb-0 border-b border-gray-200 flex-shrink-0">
                <h1 className="text-2xl font-semibold text-gray-900 mb-4">Intake</h1>
                <Tabs tabs={intakeTabs} activeTab={activeTab} onTabClick={setActiveTab} />
            </div>
            <div className="flex flex-grow overflow-hidden min-h-0">
                <CaseList
                    cases={cases}
                    selectedCaseId={selectedCaseId}
                    onSelectCase={(id) => setSelectedCaseId(id)}
                />
                <CaseDetails
                    selectedCase={selectedCase}
                    setSelectedCase={(caseData) => {
                    }}
                    onCaseUpdated={handleCaseUpdated}
                    onCaseCreated={handleCaseCreated}
                />
            </div>
        </div>
    );
};
