// ../components/provider/SelectProviderModal.tsx
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import type { Provider } from '../../types';

interface SelectProviderModalProps {
    isOpen: boolean;
    onClose: () => void;
    caseId: string;
    onProviderAssigned: () => void; // To trigger refresh if needed
}

const SelectProviderModal: React.FC<SelectProviderModalProps> = ({ isOpen, onClose, caseId, onProviderAssigned }) => {
    const [providers, setProviders] = useState<Provider[]>([]);
    const [selectedProviderIds, setSelectedProviderIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await axios.get<{ providers: Provider[] }>('http://localhost:3000/pro/provider');
                setProviders(response.data.providers);
            } catch (err) {
                console.error(err);
                setError('Failed to load providers.');
            }
        };

        if (isOpen) {
            fetchProviders();
            setSelectedProviderIds([]); // Reset selection on open
        }
    }, [isOpen]);

    const toggleSelectProvider = (providerId: string) => {
        setSelectedProviderIds((prev) =>
            prev.includes(providerId) ? prev.filter((id) => id !== providerId) : [...prev, providerId]
        );
    };

    const handleAssignProviders = async () => {
        if (!caseId || selectedProviderIds.length === 0) return;

        setLoading(true);
        setError(null);

        try {
            await axios.post(`http://localhost:3000/lien/${caseId}/${selectedProviderIds}`, {
                caseId,
                providerIds: selectedProviderIds,
            });

            onProviderAssigned(); // Notify parent to refresh or update
            onClose(); // Close modal after success
        } catch (err) {
            console.error(err);
            setError('Failed to assign providers.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-[500px] max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Select Medical Providers</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <div className="space-y-2">
                    {providers.map((provider) => (
                        <div
                            key={provider._id}
                            className={`p-2 rounded-md border cursor-pointer ${
                                selectedProviderIds.includes(provider._id)
                                    ? 'bg-blue-100 border-blue-500'
                                    : 'bg-slate-100 border-gray-300'
                            }`}
                            onClick={() => toggleSelectProvider(provider._id)}
                        >
                            <p className="font-semibold">{provider.name}</p>
                            <p className="text-sm text-gray-600">{provider.speciality}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md">Cancel</button>
                    <button
                        onClick={handleAssignProviders}
                        disabled={loading || selectedProviderIds.length === 0}
                        className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
                    >
                        {loading ? 'Assigning...' : 'Assign Selected'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelectProviderModal;
