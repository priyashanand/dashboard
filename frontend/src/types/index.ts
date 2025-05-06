import React from 'react';

// Interface for navigation items in the sidebar
export interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  href?: string;
  onClick?: () => void;
}

// Interface for the user profile component
export interface UserProfileProps {
  name: string;
  avatarUrl?: string;
}

// Interface for tab items (e.g., New Cases, Archived)
export interface TabItem {
  label: string;
  count?: number;
}

// Interface for file information (e.g., PDFs)
export interface FileInfo {
    name: string;
    type: 'PDF' | 'Image' | 'Other'; // Example file types
    url: string; // URL for download/preview
}

// Interface defining the structure of a Case object
export interface Case {
  _id?: string; // Optional ID, likely from the database
  // id: string; // Unique identifier (could be temporary or fallback)
  name: {
    type: string;
    indStatus:string
  };
  email?: {
    type: string;
    indStatus:string
  };// Added email field
  phone?: {
    type: string;
    indStatus:string
  }; // General contact   phone (used in list item if casePhone not available)
  // gender?: 'male' | 'female' | 'other' | string; // Added gender with more options
  gender?: {
    type:'male' | 'female' | 'other' | string,
    indStatus:string
  }
    dob?:{
    type: string;
    indStatus:string
  }; // Represent date as string for simplicity
  streetAddress?: {
    type: string;
    indStatus:string
  }; // Added street address
  status?: 'accepted' | 'archived' | 'inProcess' | string; // Added 'inProcess' and allow other string values
  tasks?: Task[]; // Added tasks array
  __v?: number; // Likely a version key from MongoDB
}

// Interface for tasks within a case
export interface Task {
  taskTitle: string;
  indStatus: 'pending' | 'in-progress' | 'completed' | string; // Added more status options
  description?: string;
  docs?: string[];
  _id?: string;
}

// Interface for the metadata of an accordion section in CaseDetails
export interface AccordionDetail {
  id: string; // Links the accordion section to a specific field in the Case type
  title: string;
  icon: React.ElementType;
  status: string;
}

export interface Provider {
  id: string;
  name: string;
  speciality: string;
  address: string;
  contactNumber: string;
  email: string;
  availableOnInjurySync: boolean;
}

// Props for the SearchInput component
export interface SearchInputProps {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Props for the Tabs component
export interface TabsProps {
    tabs: TabItem[];
    activeTab: number;
    onTabClick: (index: number) => void;
}

// Props for the CaseListItem component
export interface CaseListItemProps {
    caseData: Case;
    isSelected: boolean;
    onClick: () => void;
}

// Props for the FilePreview component
export interface FilePreviewProps {
    file: FileInfo;
}

// Props for the AccordionItem component
export interface AccordionItemProps {
  detail: AccordionDetail;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode; // Content to display when open
  caseData?: Case | null; // Optional: The current case data
  onCaseUpdated?: (updatedCase: Case) => void;
}

// Props for the CaseList component
export interface CaseListProps {
    cases: Case[];
    selectedCaseId: string | null;
    onSelectCase: (id: string) => void;
}

// Props for the CaseDetails component
export interface CaseDetailsProps {
    selectedCase: Case | null;
}

export interface TableColumn<T> {
  key: keyof T | string; // Key in the data object or a custom key
  header: string; // Text to display in the table header
  render?: (item: T) => React.ReactNode; // Optional custom render function for the cell
}

// Props for the generic Table component
export interface TableProps<T> {
  columns: TableColumn<T>[]; // Array of column definitions
  data: T[]; // Array of data objects
  keyExtractor: (item: T) => string | number; // Function to extract a unique key for each row
}

export interface OngoingCaseCardProps {
  caseData: Case;
}

export interface OngoingCase {
  _id?: string; // Optional ID, likely from the database
  // id: string; // Unique identifier (could be temporary or fallback)
  name: {
    type: string;
    indStatus:string
  };
  email?: {
    type: string;
    indStatus:string
  };// Added email field
  phone?: {
    type: string;
    indStatus:string
  }; // General contact   phone (used in list item if casePhone not available)
  // gender?: 'male' | 'female' | 'other' | string; // Added gender with more options
  gender?: {
    type:'male' | 'female' | 'other' | string,
    indStatus:string
  }
    dob?:{
    type: string;
    indStatus:string
  }; // Represent date as string for simplicity
  streetAddress?: {
    type: string;
    indStatus:string
  }; // Added street address
}