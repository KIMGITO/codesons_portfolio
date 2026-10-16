import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { cfg } from './config'
import './index.css'

// Privacy-friendly analytics (only when VITE_PLAUSIBLE_DOMAIN is set)
if (cfg.plausibleDomain) {
  const s = document.createElement('script')
  s.defer = true
  s.dataset.domain = cfg.plausibleDomain
  s.src = 'https://plausible.io/js/script.js'
  document.head.appendChild(s)
}

// Make the site installable / usable offline (production only)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}))
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
