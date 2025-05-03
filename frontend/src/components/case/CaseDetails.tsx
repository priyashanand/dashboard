import React, { useState } from 'react';
import { Download, Check, User, Phone, Calendar, MapPin, ArrowBigDown, Plus, ListPlus, X, Trash2 } from 'lucide-react'; // Added Trash2 icon
import { AccordionItem } from './AccordionItem';
import type { Case as CaseType, AccordionDetail, CaseDetailsProps, Task as TaskType } from '../../types';
import axios from 'axios';
import CreateCaseModal from './CreateCase';
import AddTaskModal from './CreateTask';

/**
 * Case Details Component (Right side of Intake Page)
 */
export const CaseDetails: React.FC<CaseDetailsProps> = ({
    selectedCase,
    setSelectedCase,
    onCaseUpdated,
    onCaseCreated,
}) => {
    const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

    const toggleAccordion = (id: string) => {
        setOpenAccordionId(openAccordionId === id ? null : id);
    };

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const handleOpenAddTaskModal = () => {
        setIsAddTaskModalOpen(true);
    };

    const handleCloseAddTaskModal = () => {
        setIsAddTaskModalOpen(false);
    };

    const handleCaseCreatedLocal = (newCase: CaseType) => {
        if (onCaseCreated) {
            onCaseCreated(newCase);
        }
        console.log('New case created in CaseDetails:', newCase);
    };

    const handleTaskCreated = (newTask: TaskType) => {
        if (selectedCase && setSelectedCase) {
            setSelectedCase(prevCase => ({
                ...prevCase,
                tasks: [...(prevCase?.tasks || []), newTask],
            } as CaseType));
        }
    };

    const updateCaseStatus = async (status: 'accepted' | 'archived') => {
        if (!selectedCase?._id) return;
        try {
            const response = await axios.patch(`http://localhost:3000/api/updateCase/${selectedCase._id}`, { status });
            console.log(`Case status updated to ${status}:`, response.data);
            if (setSelectedCase) {
                setSelectedCase(prevCase => ({ ...prevCase, status }));
            }
            if (onCaseUpdated) {
                onCaseUpdated(selectedCase._id, status);
            }
        } catch (error) {
            console.error(`Error updating case status to ${status}:`, error);
        }
    };

    const handleAcceptCase = () => {
        updateCaseStatus('accepted');
    };

    const handleArchiveCase = () => {
        updateCaseStatus('archived');
    };

    const handleDeleteCase = async () => {
        if (!selectedCase?._id) return;
        try {
            await axios.delete(`http://localhost:3000/api/deleteCase/${selectedCase._id}`);
            console.log(`Case deleted: ${selectedCase._id}`);
            //  Notify the parent component to refresh the case list
            if (onCaseUpdated) {
                onCaseUpdated();
            }
            //  Clear selected case.
            if (setSelectedCase) {
                setSelectedCase(null);
            }

        } catch (error: any) {
            console.error('Error deleting case:', error);
            //  Show error to user.
        }
    };

    const accordionSections: AccordionDetail[] = [
        { id: 'name', title: 'Name', icon: User, status: selectedCase?.status || 'N/A' },
        { id: 'email', title: 'Email', icon: ArrowBigDown, status: selectedCase?.status || 'N/A' },
        { id: 'phone', title: 'Phone', icon: Phone, status: selectedCase?.status || 'N/A' },
        { id: 'gender', title: 'Gender', icon: ArrowBigDown, status: selectedCase?.status || 'N/A' },
        { id: 'dob', title: 'Date of Birth', icon: Calendar, status: selectedCase?.status || 'N/A' },
        { id: 'streetAddress', title: 'Street Address', icon: MapPin, status: selectedCase?.status || 'N/A' },
        ...(selectedCase?.tasks?.map((task) => ({
            id: task._id || task.taskTitle,
            title: task.taskTitle,
            icon: ArrowBigDown,
            status: task.status,
            type: 'task' // Add type property for task
        })) || []),
    ];

    if (!selectedCase) {
        return (
            <div className="flex-grow p-6 flex items-center justify-center text-gray-500 bg-gray-50">
                <button
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-1.5"
                    onClick={handleOpenCreateModal}
                >
                    <Plus className="w-4 h-4" />
                    <span>Create New Case</span>
                </button>
            </div>
        );
    }

    const renderAccordionContent = (id: string) => {
        switch (id) {
            case 'name':
                return <p>{selectedCase.name || 'N/A'}</p>;
            case 'email':
                return <p>{selectedCase.email || 'N/A'}</p>;
            case 'phone':
                return <p>{selectedCase.phone || 'N/A'}</p>;
            case 'gender':
                return <p>{selectedCase.gender || 'N/A'}</p>;
            case 'dob':
                return <p>{selectedCase.dob ? new Date(selectedCase.dob).toLocaleDateString() : 'N/A'}</p>;
            case 'streetAddress':
                return <p>{selectedCase.streetAddress || 'N/A'}</p>;
            default: {
                const task = selectedCase?.tasks?.find((t) => t._id === id || t.taskTitle === id);
                if (task) {
                    return (
                        <div className="space-y-2">
                            <p><strong>Title:</strong> {task.taskTitle}</p>
                            <p><strong>Status:</strong> {task.status}</p>
                            {task.description && <p><strong>Description:</strong> {task.description}</p>}
                            {task.docs && task.docs?.length > 0 && (
                                <div>
                                    <strong>Documents:</strong>
                                    <ul>
                                        {task.docs.map((doc, index) => (
                                            <li key={index}>
                                                <a href={doc} target="_blank" rel="noopener noreferrer">
                                                    {doc}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    );
                }
                return <p>Content for this section is not available.</p>;
            }
        }
    };

    return (
        <div className="flex-grow p-6 overflow-y-auto bg-gray-50">
            <CreateCaseModal
                isOpen={isCreateModalOpen}
                onClose={handleCloseCreateModal}
                onCreateSuccess={handleCaseCreatedLocal}
            />
            <AddTaskModal
                isOpen={isAddTaskModalOpen}
                onClose={handleCloseAddTaskModal}
                caseId={selectedCase?._id}
                onTaskCreated={handleTaskCreated}
            />
            {/* Case Header Section */}
            <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-gray-200 gap-2">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">{selectedCase?.name}</h2>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                    <button className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-800 transition-colors">
                        <Download className="w-4 h-4" />
                    </button>
                    <button
                        className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-800 transition-colors"
                        onClick={handleOpenCreateModal}
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                    <button
                        className="p-2 rounded-lg border border-gray-300 text-red-500 hover:bg-gray-100 hover:border-red-400 hover:text-red-700 transition-colors"
                        onClick={handleArchiveCase}
                    >
                        <X className="w-4 h-4" />
                    </button>
                    <button
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-1.5"
                        onClick={handleAcceptCase}
                    >
                        <Check className="w-4 h-4" />
                        <span>Accept</span>
                    </button>
                    {/* <button
                        className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors flex items-center space-x-1.5"
                        onClick={handleDeleteCase}
                    >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete Case</span>
                    </button> */}
                </div>
            </div>

            {/* Details Section */}
            <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700">Details</h3>
                <div className='flex'>
                  <button
                      className="p-2 rounded-lg border border-gray-300 text-gray-600  hover:bg-gray-100 hover:border-gray-400 hover:text-gray-800 transition-colors"
                      onClick={handleOpenAddTaskModal}
                      >
                      <ListPlus className="w-4 h-4" />
                  </button>
                  <div className='px-1'>

                  </div>
                  <button
                      className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors flex items-center space-x-1.5"
                      onClick={handleDeleteCase}
                      >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Case</span>
                  </button>
                </div>
            </div>

            {/* Accordion List Section */}
            <div>
                {accordionSections.map((detail) => (
                    <AccordionItem
                        key={detail.id}
                        detail={detail}
                        isOpen={openAccordionId === detail.id}
                        onToggle={() => toggleAccordion(detail.id)}
                        caseData={selectedCase}
                        onCaseUpdated={onCaseUpdated} // Pass the onCaseUpdated prop
                    >
                        {renderAccordionContent(detail.id)}
                    </AccordionItem>
                ))}
            </div>
        </div>
    );
};
