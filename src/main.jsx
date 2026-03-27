import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 🔥 FIX GITHUB PAGES REDIRECT (PLACE BEFORE RENDER)
const redirect = sessionStorage.redirect;
delete sessionStorage.redirect;

if (redirect && redirect !== location.pathname) {
  window.history.replaceState(null, null, redirect);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);