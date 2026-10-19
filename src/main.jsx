import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.jsx';
import { registerServiceWorker } from './lib/pwa';

// Daftarkan PWA Service Worker
registerServiceWorker();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
