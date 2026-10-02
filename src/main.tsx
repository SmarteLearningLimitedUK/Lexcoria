import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App.tsx';
import EnglishAccessGate from './app/EnglishAccessGate.tsx';
import './index.css';
import './english-theme.css';

const Router = import.meta.env.VITE_SITE_EMBED === 'true' ? HashRouter : BrowserRouter;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router><EnglishAccessGate><App /></EnglishAccessGate></Router>
  </StrictMode>,
);
