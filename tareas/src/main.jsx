import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './AuthContext.jsx'
import { TasksProvider } from './TasksContext.jsx'
import { ColaProvider } from './ColaContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './estilos.scss'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TasksProvider>
          <ColaProvider>
            <App />
          </ColaProvider>
        </TasksProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
