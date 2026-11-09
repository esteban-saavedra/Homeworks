import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useSesion } from './AuthContext.jsx'
import RutaPrivada from './RutaPrivada.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Tareas from './Tareas.jsx'

function Barra() {
  const { usuario, estaLogueado, logout } = useSesion()
  const navegar = useNavigate()

  if (!estaLogueado) return null

  async function salir() {
    await logout()
    navegar('/login')
  }

  return (
    <header className="barra">
      <span className="marca">Tareas con Supabase</span>
      <div className="sesion">
        <span>{usuario.email}</span>
        <button type="button" className="claro" onClick={salir}>
          Cerrar sesion
        </button>
      </div>
    </header>
  )
}

function App() {
  return (
    <>
      <Barra />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/tareas"
          element={
            <RutaPrivada>
              <Tareas />
            </RutaPrivada>
          }
        />

        <Route path="*" element={<Navigate to="/tareas" replace />} />
      </Routes>
    </>
  )
}

export default App
