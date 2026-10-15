import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './AuthContext.jsx'
import { ArbolProvider } from './ArbolContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './estilos.scss'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ArbolProvider>
          <App />
        </ArbolProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
