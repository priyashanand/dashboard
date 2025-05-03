import React, { useState, useEffect } from 'react';
import type { Case, Task } from '../../types'; // Adjust the import path as needed
import axios from 'axios';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseData: Case | null;
  detailId: string;
  onCaseUpdated?: (updatedCase: Case) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, caseData, detailId, onCaseUpdated }) => {
  const [formData, setFormData] = useState<Partial<Case & Task>>({});
  const [isTaskEdit, setIsTaskEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    if (isOpen && caseData) {
      if (caseData.tasks?.some(task => task._id === detailId || task.taskTitle === detailId)) {
        setIsTaskEdit(true);
        const taskToEdit = caseData.tasks.find(task => task._id === detailId || task.taskTitle === detailId);
        setSelectedTask(taskToEdit || null);
        setFormData(taskToEdit ? { ...taskToEdit } : {});
      } else {
        setIsTaskEdit(false);
        setFormData({
          name: caseData.name,
          email: caseData.email,
          phone: caseData.phone,
          gender: caseData.gender,
          dob: caseData.dob,
          streetAddress: caseData.streetAddress,
          status: caseData.status,
        });
      }
    }
  }, [isOpen, caseData, detailId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTaskDocsChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    setFormData(prev => {
      const updatedDocs = (prev.docs || []).map((doc, i) => (i === index ? value : doc));
      return { ...prev, docs: updatedDocs };
    });
  };

  const handleAddTaskDoc = () => {
    setFormData(prev => ({ ...prev, docs: [...(prev.docs || []), ''] }));
  };

  const handleRemoveTaskDoc = (index: number) => {
    setFormData(prev => ({ ...prev, docs: (prev.docs || []).filter((_, i) => i !== index) }));
  };

  const handleSubmit = async () => {
    if (!caseData) return;
    const caseId = caseData._id;

    try {
      if (isTaskEdit && selectedTask) {
        const taskId = selectedTask._id;
        await axios.patch(`http://localhost:3000/api/updateTasks/${caseId}/${taskId}`, formData);
        console.log('Task updated successfully');
        onClose();
        // Optionally, refetch cases or update the local state
      } else {
        await axios.patch(`http://localhost:3000/api/updateCase/${caseId}`, formData);
        console.log('Case updated successfully');
        onClose();
        onCaseUpdated?.({ ...caseData, ...formData } as Case); // Optimistically update UI
      }
    } catch (error) {
      console.error('Error updating case/task:', error);
      // Handle error display to the user
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">{isTaskEdit ? `Edit Task: ${selectedTask?.taskTitle}` : `Edit Case Details`}</h2>
        {isTaskEdit && selectedTask ? (
          <div className="space-y-3">
            <div>
              <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700">Task Title</label>
              <input type="text" name="taskTitle" id="taskTitle" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.taskTitle || ''} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select name="status" id="status" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.status || ''} onChange={handleChange}>
                <option value="pending">Pending</option>
                <option value="in-progress">In-Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea name="description" id="description" rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.description || ''} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Documents</label>
              {(formData.docs || []).map((doc, index) => (
                <div key={index} className="flex space-x-2 mb-1">
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={doc} onChange={(e) => handleTaskDocsChange(e, index)} />
                  <button type="button" onClick={() => handleRemoveTaskDoc(index)} className="text-red-500 hover:text-red-700">Remove</button>
                </div>
              ))}
              <button type="button" onClick={handleAddTaskDoc} className="text-indigo-500 hover:text-indigo-700 text-sm">+ Add Document</button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" name="name" id="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.name || ''} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.email || ''} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="tel" name="phone" id="phone" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.phone || ''} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
              <select name="gender" id="gender" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.gender || ''} onChange={handleChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input type="date" name="dob" id="dob" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.dob ? formData.dob.slice(0, 10) : ''} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">Street Address</label>
              <input type="text" name="streetAddress" id="streetAddress" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.streetAddress || ''} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select name="status" id="status" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.status || ''} onChange={handleChange}>
                <option value="accepted">Accepted</option>
                <option value="archived">Archived</option>
                <option value="inProcess">In Process</option>
              </select>
            </div>
          </div>
        )}
        <div className="mt-4 flex justify-end space-x-2">
          <button type="button" className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md" onClick={onClose}>Cancel</button>
          <button type="button" className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md" onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;