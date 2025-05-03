import React, { useState } from 'react';
import type { Case as CaseType } from '../../types'; // Adjust the import path as needed
import axios from 'axios';

interface CreateCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSuccess: (newCase: CaseType) => void; // Callback for successful creation
}

const CreateCaseModal: React.FC<CreateCaseModalProps> = ({ isOpen, onClose, onCreateSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    streetAddress: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post<CaseType>('http://localhost:3000/api/createCase', formData);
      console.log('Case created successfully:', response.data);
      onCreateSuccess(response.data); // Notify parent component
      onClose();
      setFormData({ name: '', email: '', phone: '', gender: '', dob: '', streetAddress: '' }); // Reset form
    } catch (error) {
      console.error('Error creating case:', error);
      // Handle error display to the user
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Create New Case</h2>
        <div className="space-y-3">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" id="name" className="mt-1 block w-full rounded-md bg-slate-200 p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" id="email" className="mt-1 block w-full rounded-md bg-slate-200 p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input type="tel" name="phone" id="phone" className="mt-1 block w-full rounded-md bg-slate-200 p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.phone} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
            <select name="gender" id="gender" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input type="date" name="dob" id="dob" className="mt-1 block w-full rounded-md bg-slate-200 p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.dob} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">Street Address</label>
            <input type="text" name="streetAddress" id="streetAddress" className="mt-1 block w-full rounded-md bg-slate-200 p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.streetAddress} onChange={handleChange} />
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button type="button" className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md" onClick={onClose}>Cancel</button>
          <button type="button" className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md" onClick={handleSubmit}>Create Case</button>
        </div>
      </div>
    </div>
  );
};

export default CreateCaseModal;