import { Routes, Route, Navigate, NavLink, useNavigate } from 'react-router-dom'
import { Navbar, Container, Button, Nav } from 'react-bootstrap'
import { useAuth } from './AuthContext.jsx'
import RutaPrivada from './RutaPrivada.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Tareas from './Tareas.jsx'
import Cajero from './Cajero.jsx'
import Clinica from './Clinica.jsx'

function Barra() {
  const { usuario, estaLogueado, logout } = useAuth()
  const navegar = useNavigate()

  if (!estaLogueado) return null

  async function salir() {
    await logout()
    navegar('/login')
  }

  return (
    <Navbar className="barra-superior" expand="md">
      <Container>
        <Navbar.Brand>Challenge 07</Navbar.Brand>

        <Nav className="me-auto enlaces">
          <NavLink to="/tareas">Tareas</NavLink>
          <NavLink to="/cajero">Cajero</NavLink>
          <NavLink to="/clinica">Clinica</NavLink>
        </Nav>

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
          path="/tareas"
          element={
            <RutaPrivada>
              <Tareas />
            </RutaPrivada>
          }
        />

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

        <Route path="*" element={<Navigate to="/tareas" replace />} />
      </Routes>
    </>
  )
}

export default App
