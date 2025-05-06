import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { OngoingCaseCardProps } from '../../types';

/*
 * Card component to display details of an ongoing case.
 */
export const OngoingCaseCard: React.FC<OngoingCaseCardProps> = ({ caseData }) => {
    // Function to determine the status color (example)
    // const getStatusColor = (status: string): string => {
    //     switch (status.toLowerCase()) {
    //         case 'enrolled': return 'text-blue-600';
    //         case 'in progress': return 'text-yellow-600';
    //         case 'completed': return 'text-green-600';
    //         default: return 'text-gray-600';
    //     }
    // };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between h-full">
            <div className='bg-slate-100 p-5 rounded-lg'>
                {/* Card Header: Name and Arrow Icon */}
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-base font-semibold text-gray-800">{caseData.name?.type}</h3>
                    {/* Link or button to view case details */}
                    <button className="text-gray-400 hover:text-blue-600">
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Card Body: Details */}
                <div className="space-y-1.5 text-xs text-gray-600 ">
                    <p>Email: <span className="font-medium text-gray-800">{caseData.email?.type}</span></p>
                    <p>Phone: <span className="font-medium text-gray-800">{caseData.phone?.type}</span></p>
                    <p>DOB: <span className="font-medium text-gray-800">{caseData.dob?.type}</span></p>
                    <p>Street Address: <span className="font-medium text-gray-800">{caseData.streetAddress?.type}</span></p>
                </div>
            </div>
        </div>
    );
};