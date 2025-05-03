import React from 'react';
// *** MODIFIED: Import Routes and Route ***
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { IntakePage } from './pages/IntakePage';
import { ProvidersPage } from './pages/ProvidersPage';
import { OngoingCasesPage } from './pages/OngoingCasesPage';
import { ArchivedCasesPage } from './pages/ArchivedCasesPage'
// Import other page components as needed
// import { OngoingCasesPage } from './pages/OngoingCasesPage'; // Example

/**
 * Main Application Component with Routing
 */
const App: React.FC = () => {
    // *** REMOVED: activePage state and renderActivePage function ***

  return (
    <div className="flex h-screen bg-gray-50 font-inter overflow-hidden">
      {/* Sidebar remains part of the main layout */}
      {/* *** MODIFIED: Sidebar no longer needs activePage props *** */}
      <Sidebar />

      <div className="flex-1 flex flex-col ml-64 h-screen overflow-hidden">
        {/* Header remains part of the main layout */}
        {/* *** MODIFIED: Header no longer needs activePage prop *** */}
        <Header />

        {/* Main content area where routed pages will be rendered */}
        <main className="flex-1 overflow-y-auto pt-16 bg-white">
          {/* *** MODIFIED: Define Routes *** */}
          <Routes>
            <Route path="/" element={<IntakePage />} />
            <Route path="/providers" element={<ProvidersPage />} />
            <Route path="/ongoing-cases" element={<OngoingCasesPage />} />
            <Route path="/archived-cases" element={<ArchivedCasesPage />} />

          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;