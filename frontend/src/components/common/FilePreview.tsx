import React from 'react';
import { File as FileIcon, DownloadCloud } from 'lucide-react';
import type { FilePreviewProps } from '../../types';

/**
 * File Preview Component for Accordion Content
 */
export const FilePreview: React.FC<FilePreviewProps> = ({ file }) => (
    <div className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg bg-white max-w-xs">
        {/* Basic icon based on type - could be expanded */}
        <FileIcon className={`w-6 h-6 ${file.type === 'PDF' ? 'text-red-500' : 'text-gray-500'} flex-shrink-0`} />
        <div className="flex-grow min-w-0">
            <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
            <p className="text-xs text-gray-500">{file.type} - Download</p>
        </div>
        <a href={file.url} download={file.name} className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
            <DownloadCloud className="w-4 h-4" />
        </a>
    </div>
);