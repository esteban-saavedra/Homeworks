import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Navbar, Container, Button } from 'react-bootstrap'
import { useAuth } from './AuthContext.jsx'
import RutaPrivada from './RutaPrivada.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Explorador from './Explorador.jsx'

function Barra() {
  const { usuario, estaLogueado, logout } = useAuth()
  const navegar = useNavigate()

  if (!estaLogueado) return null

  async function salir() {
    await logout()
    navegar('/login')
  }

  return (
    <Navbar className="barra-superior">
      <Container>
        <Navbar.Brand>Arbol de archivos</Navbar.Brand>
        <div className="sesion">
          <span>{usuario.email}</span>
          <Button size="sm" variant="outline-light" onClick={salir}>
            Cerrar sesion
          </Button>
        </div>
      </Container>
    </Navbar>
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
          path="/explorador"
          element={
            <RutaPrivada>
              <Explorador />
            </RutaPrivada>
          }
        />

        <Route path="*" element={<Navigate to="/explorador" replace />} />
      </Routes>
    </>
  )
}

export default App
