import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './AuthContext.jsx'
import { ColaProvider } from './ColaContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ColaProvider>
          <App />
        </ColaProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
