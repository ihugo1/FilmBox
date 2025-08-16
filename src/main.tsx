import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import { App } from './App'

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found. Make sure there is a <div id="root"></div> in your HTML.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
