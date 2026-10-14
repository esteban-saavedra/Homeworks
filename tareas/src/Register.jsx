import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from './AuthContext.jsx'

function Register() {
  const { registrar, error, limpiarError } = useAuth()
  const navegar = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetir, setRepetir] = useState('')
  const [aviso, setAviso] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function enviar(evento) {
    evento.preventDefault()
    setAviso('')

    if (password !== repetir) {
      setAviso('Las contrasenas no coinciden.')
      return
    }

    setEnviando(true)

    const correcto = await registrar(email, password)

    setEnviando(false)

    if (correcto) {
      navegar('/tareas')
    }
  }

  return (
    <div className="pantalla-centrada">
      <Card className="tarjeta-acceso">
        <Card.Body>
          <h1 className="titulo-acceso">Crear cuenta</h1>
          <p className="sub-acceso">Registrate para empezar</p>

          {error && (
            <Alert variant="danger" onClose={limpiarError} dismissible>
              {error}
            </Alert>
          )}

          {aviso && <Alert variant="warning">{aviso}</Alert>}

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

            <Form.Group className="mb-3">
              <Form.Label>Contrasena</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimo 6 caracteres"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Repetir contrasena</Form.Label>
              <Form.Control
                type="password"
                value={repetir}
                onChange={(e) => setRepetir(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="dark" className="w-100" disabled={enviando}>
              {enviando ? 'Creando...' : 'Crear cuenta'}
            </Button>
          </Form>

          <p className="pie-acceso">
            Ya tienes cuenta? <Link to="/login">Inicia sesion</Link>
          </p>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Register
