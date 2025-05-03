import React from 'react';
import ReactDOM from 'react-dom/client';
// *** MODIFIED: Import BrowserRouter ***
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* *** MODIFIED: Wrap App with BrowserRouter *** */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);