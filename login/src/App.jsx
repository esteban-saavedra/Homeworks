import { Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext.jsx'
import RutaPrivada from './RutaPrivada.jsx'
import Login from './Login.jsx'
import Cajero from './Cajero.jsx'
import Clinica from './Clinica.jsx'

function Barra() {
  const { usuario, estaLogueado, logout } = useAuth()
  const navegar = useNavigate()

  if (!estaLogueado) return null

  function salir() {
    logout()
    navegar('/login')
  }

  return (
    <header className="barra">
      <nav>
        <NavLink to="/cajero">Cajero</NavLink>
        <NavLink to="/clinica">Clinica</NavLink>
      </nav>

      <div className="sesion">
        <span>{usuario.nombre}</span>
        <button onClick={salir} className="secundario">
          Cerrar sesion
        </button>
      </div>
    </header>
  )
}

function App() {
  return (
    <div className="app">
      <Barra />

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/cajero"
          element={
            <RutaPrivada>
              <Cajero />
            </RutaPrivada>
          }
        />

        <Route
          path="/clinica"
          element={
            <RutaPrivada>
              <Clinica />
            </RutaPrivada>
          }
        />

        <Route path="*" element={<Navigate to="/cajero" replace />} />
      </Routes>
    </div>
  )
}

export default App
