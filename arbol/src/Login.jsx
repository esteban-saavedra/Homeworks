import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from './AuthContext.jsx'

function Login() {
  const { login, error, limpiarError } = useAuth()
  const navegar = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function enviar(evento) {
    evento.preventDefault()
    setEnviando(true)

    const correcto = await login(email, password)

    setEnviando(false)

    if (correcto) {
      navegar('/explorador')
    }
  }

  return (
    <div className="pantalla-centrada">
      <Card className="tarjeta-acceso">
        <Card.Body>
          <h1 className="titulo-acceso">Iniciar sesion</h1>
          <p className="sub-acceso">Entra para ver tus tareas</p>

          {error && (
            <Alert variant="danger" onClose={limpiarError} dismissible>
              {error}
            </Alert>
          )}

          <Form onSubmit={enviar}>
            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@ejemplo.com"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Contrasena</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimo 6 caracteres"
              />
            </Form.Group>

            <Button type="submit" variant="dark" className="w-100" disabled={enviando}>
              {enviando ? 'Entrando...' : 'Entrar'}
            </Button>
          </Form>

          <p className="pie-acceso">
            No tienes cuenta? <Link to="/register">Registrate</Link>
          </p>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Login
