// CreateTask.tsx
import React, { useState } from 'react';
import type { Task as TaskType } from '../../types'; // Adjust import path
import axios from 'axios';
import { ListPlus } from 'lucide-react';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseId?: string;
  onTaskCreated: (newTask: TaskType) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, caseId, onTaskCreated }) => {
  const [formData, setFormData] = useState({
    taskTitle: '',
    status: 'pending',
    description: '',
    docs: [] as string[],
    newDoc: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddDoc = () => {
    if (formData.newDoc) {
      setFormData(prev => ({ ...prev, docs: [...prev.docs, formData.newDoc], newDoc: '' }));
    }
  };

  const handleRemoveDoc = (index: number) => {
    setFormData(prev => ({ ...prev, docs: prev.docs.filter((_, i) => i !== index) }));
  };

  const handleNewDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, newDoc: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!caseId) return;
    try {
      const response = await axios.post<TaskType>(`http://localhost:3000/api/createTask/${caseId}`, {
        taskTitle: formData.taskTitle,
        status: formData.status,
        description: formData.description,
        docs: formData.docs,
      });
      console.log('Task created successfully:', response.data);
      onTaskCreated(response.data);
      onClose();
      setFormData({ taskTitle: '', status: 'pending', description: '', docs: [], newDoc: '' });
    } catch (error) {
      console.error('Error creating task:', error);
      // Handle error display
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
        <div className="space-y-3">
          <div>
            <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700">Task Title</label>
            <input type="text" name="taskTitle" id="taskTitle" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.taskTitle} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select name="status" id="status" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.status} onChange={handleChange}>
              <option value="pending">Pending</option>
              <option value="in-progress">In-Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" id="description" rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.description} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Documents</label>
            {(formData.docs || []).map((doc, index) => (
              <div key={index} className="flex space-x-2 mb-1">
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={doc} readOnly />
                <button type="button" onClick={() => handleRemoveDoc(index)} className="text-red-500 hover:text-red-700">Remove</button>
              </div>
            ))}
            <div className="flex space-x-2 mt-2">
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.newDoc}
                onChange={handleNewDocChange}
                placeholder="Add document link"
              />
              <button type="button" onClick={handleAddDoc} className="text-indigo-500 hover:text-indigo-700">Add</button>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button type="button" className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md" onClick={onClose}>Cancel</button>
          <button type="button" className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md" onClick={handleSubmit}>Add Task</button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;