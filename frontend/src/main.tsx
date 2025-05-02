import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SidebarProvider } from './context/SidebarContext.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <SidebarProvider><App/></SidebarProvider>
    </ThemeProvider>
  </StrictMode>,
)
