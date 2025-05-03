import React, { useState, useEffect, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { SearchInput } from '../components/common/SearchInput';
import { Table } from '../components/common/Table';
import type { Provider, TableColumn, Address } from '../types';
import axios from 'axios';
import AddProviderModal from '../components/case/AddProviderModal'; // Corrected import path

export const ProvidersPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [providers, setProviders] = useState<Provider[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const fetchProviders = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<{ providers: any[] }>('http://localhost:3000/pro/provider');
            const fetchedProviders: Provider[] = response.data.providers.map(provider => ({
                id: provider._id,
                name: provider.name,
                speciality: provider.speciality,
                address: provider.address.map(addr => `${addr.street}, ${addr.state} ${addr.zipCode}`).join('; '),
                contactNumber: provider.phone,
                email: provider.email,
                availableOnInjurySync: true,
            }));
            setProviders(fetchedProviders);
        } catch (err: any) {
            console.error('Error fetching providers:', err);
            setError('Failed to load providers.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProviders();
    }, []);

    const handleOpenAddModal = () => {
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleAddProvider = async (newProviderData: {
        name: string;
        email: string;
        phone: string;
        speciality: string;
        address: { street: string; state: string; zipCode: string }[];
    }) => {
        try {
            await axios.post('http://localhost:3000/pro/provider', newProviderData);
            fetchProviders();
            handleCloseAddModal();
        } catch (error: any) {
            console.error('Error adding provider:', error);
        }
    };

    const columns: TableColumn<Provider>[] = [
        { key: 'name', header: 'Provider Name' },
        { key: 'speciality', header: 'Speciality' },
        { key: 'address', header: 'Address' },
        { key: 'contactNumber', header: 'Contact #' },
        { key: 'email', header: 'Email' },
        {
            key: 'availableOnInjurySync',
            header: 'Available on InjurySync',
            render: (provider) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${provider.availableOnInjurySync ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {provider.availableOnInjurySync ? 'Available' : 'Unavailable'}
                </span>
            ),
        },
    ];

    const filteredProviders = useMemo(() => {
        if (!searchTerm) {
            return providers;
        }
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return providers.filter(provider =>
            provider.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            provider.speciality.toLowerCase().includes(lowerCaseSearchTerm) ||
            provider.email.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }, [searchTerm, providers]);

    const keyExtractor = (provider: Provider) => provider.id;

    if (loading) {
        return <div className="p-6 bg-white h-full flex items-center justify-center">Loading providers...</div>;
    }

    if (error) {
        return <div className="p-6 bg-white h-full flex items-center justify-center text-red-500">Error loading providers: {error}</div>;
    }

    return (
        <div className="p-6 bg-white h-full flex flex-col">
            <AddProviderModal
                isOpen={isAddModalOpen}
                onClose={handleCloseAddModal}
                onAddProvider={handleAddProvider}
            />
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Providers</h1>
            <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-lg font-medium text-gray-700">Medical Providers</h2>
                <div className="flex items-center space-x-4 flex-grow sm:flex-grow-0">
                    <div className="w-full sm:w-64">
                        <SearchInput
                            placeholder="Search providers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0"
                        onClick={handleOpenAddModal}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add medical provider
                    </button>
                </div>
            </div>
            <div className="flex-grow overflow-y-auto border border-gray-200 rounded-lg">
                <Table<Provider>
                    columns={columns}
                    data={filteredProviders}
                    keyExtractor={keyExtractor}
                />
            </div>
        </div>
    );
};