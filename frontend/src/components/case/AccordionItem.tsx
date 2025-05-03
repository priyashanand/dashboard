import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Edit, Trash2 } from 'lucide-react';
import type { AccordionItemProps, Case } from '../../types'; // Import Case type
import EditModal from './Edit'; // Import the EditModal component
import axios from 'axios';

/**
 * Accordion Item Component for Case Details
 */
export const AccordionItem: React.FC<AccordionItemProps> = ({ detail, isOpen, onToggle, children, caseData, onCaseUpdated }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleDeleteClick = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent accordion toggle

        try {
            if (detail.type === 'case') {
                // Delete Case
                if (caseData?._id) {
                    await axios.delete(`http://localhost:3000/api/deleteCase/${caseData._id}`);
                    // Notify parent component to refresh the case list
                    if (onCaseUpdated) { // Changed prop name.  onCaseDeleted is not correct here.
                        onCaseUpdated(); //  Use onCaseUpdated to signal a change
                    }
                } else {
                    console.error('Case ID is undefined');
                    // Optionally show an error message to the user
                }
            } else if (detail.type === 'task' && caseData?._id && detail.id) {
                // Delete Task
                await axios.delete(`http://localhost:3000/api/deleteTask/${caseData._id}/${detail.id}`);
                // Notify parent component to refresh the task list.  Important!
                if (onCaseUpdated) {
                  onCaseUpdated();
                }

            } else {
                console.error('Cannot delete: Type or IDs are missing.');
                // Handle the case where the type is unknown or IDs are missing
            }
        } catch (error: any) {
            console.error('Error deleting:', error);
            // Optionally show an error message to the user using a toast or alert
        }
    };

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-3 bg-white">
            <EditModal
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                caseData={caseData!}
                detailId={detail.id}
                onCaseUpdated={onCaseUpdated}
            />
            {/* Accordion Header */}
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors duration-150"
            >
                <div className="flex items-center space-x-3">
                    {/* Toggle icon based on state */}
                    {isOpen ? <ChevronDown className="w-5 h-5 text-gray-500" /> : <ChevronRight className="w-5 h-5 text-gray-500" />}
                    <detail.icon className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-800">{detail.title}</span>
                </div>
                <div className="flex items-center space-x-3">
                    {detail.status && (
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            detail.status === 'completed' ? 'text-green-600 bg-green-100' :
                            detail.status === 'pending' ? 'text-yellow-600 bg-yellow-100' :
                            detail.status === 'in-progress' ? 'text-blue-600 bg-blue-100' :
                            'text-gray-600 bg-gray-100' // Default style for other statuses
                        }`}
                        >
                            {detail.status.charAt(0).toUpperCase() + detail.status.slice(1)}
                        </span>
                    )}
                    {/* Stop propagation to prevent accordion toggle when clicking icons */}
                    <Edit
                        className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer"
                        onClick={handleEditClick}
                    />
                    <Trash2
                        className="w-4 h-4 text-gray-400 hover:text-red-600 cursor-pointer"
                        onClick={handleDeleteClick}
                    />
                </div>
            </button>
            {/* Accordion Content (Conditional Rendering) */}
            {isOpen && (
                <div className="p-4 border-t border-gray-200 bg-white text-sm text-gray-700">
                    {children} {/* Render provided content */}
                </div>
            )}
        </div>
    );
};
