import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Kutilgan va zararsiz bo'lgan Vite WebSocket xatolarini brauzerda chalkashib qolmasligi uchun filtrlaymiz
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason?.message || String(event.reason || '');
  if (
    reason.includes('WebSocket') || 
    reason.includes('websocket') || 
    reason.includes('WebSocket closed') ||
    reason.includes('failed to connect')
  ) {
    event.preventDefault(); // Prevents browser or framework-overlay popup
    console.debug('DevServer: Kutilgan HMR websocket uzilishi filtrlandi:', reason);
  }
});

window.addEventListener('error', (event) => {
  const msg = event.message || '';
  if (
    msg.includes('WebSocket') || 
    msg.includes('websocket') || 
    msg.includes('WebSocket closed')
  ) {
    event.preventDefault();
    console.debug('DevServer: Kutilgan HMR error filtrlandi:', msg);
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
