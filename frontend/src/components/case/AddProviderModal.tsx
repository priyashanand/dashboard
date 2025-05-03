// ../components/provider/AddProviderModal.tsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Address } from '../../types'; // Import Address type

interface AddProviderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddProvider: (newProviderData: {
        name: string;
        email: string;
        phone: string;
        speciality: string;
        address: { street: string; state: string; zipCode: string }[];
    }) => void;
}

const AddProviderModal: React.FC<AddProviderModalProps> = ({ isOpen, onClose, onAddProvider }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [street, setStreet] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');

    const handleSubmit = () => {
        const newProviderData = {
            name,
            email,
            phone,
            speciality,
            address: [{ street, state, zipCode }],
        };
        onAddProvider(newProviderData);
        // Reset form fields
        setName('');
        setEmail('');
        setPhone('');
        setSpeciality('');
        setStreet('');
        setState('');
        setZipCode('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Add New Medical Provider</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="space-y-3">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 bg-slate-200 sm:text-sm" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" className="mt-1 block w-full rounded-md border-gray-300  bg-slate-200 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                        <input type="tel" id="phone" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-slate-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="speciality" className="block text-sm font-medium text-gray-700">Speciality</label>
                        <input type="text" id="speciality" className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm  bg-slate-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={speciality} onChange={(e) => setSpeciality(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street</label>
                        <input type="text" id="street" className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 bg-slate-200 focus:ring-indigo-500 sm:text-sm" value={street} onChange={(e) => setStreet(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                        <input type="text" id="state" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-slate-200 focus:border-indigo-500 focus:ring-indigo-500 p-2 sm:text-sm" value={state} onChange={(e) => setState(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">Zip Code</label>
                        <input type="text" id="zipCode" className="mt-1 block w-full rounded-md 
                        bg-slate-200 border-gray-300 shadow-sm focus:border-indigo-500 p-2 focus:ring-indigo-500 sm:text-sm" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                    </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md">Add Provider</button>
                </div>
            </div>
        </div>
    );
};

export default AddProviderModal;