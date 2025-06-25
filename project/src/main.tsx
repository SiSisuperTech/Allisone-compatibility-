import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App_allisone.tsx';
import './index.css';
import { ToastProvider } from './components/Toast';
import { ThemeProvider } from './contexts/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
);
