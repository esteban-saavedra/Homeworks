import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext.jsx'

function Login() {
  const { login } = useAuth()
  const navegar = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function enviar(evento) {
    evento.preventDefault()

    if (email.trim() === '' || password === '') {
      setError('Completa los dos campos.')
      return
    }

    const correcto = login(email, password)

    if (correcto) {
      navegar('/cajero')
    } else {
      setError('Correo o contrasena incorrectos.')
    }
  }

  return (
    <div className="pantalla-login">
      <section className="tarjeta-login">
        <h1>Iniciar sesion</h1>
        <p className="sub">Accede para ver los ejercicios</p>

        <form onSubmit={enviar}>
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@mail.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="123"
            />
          </label>

          {error && <p className="error">{error}</p>}

          <button type="submit">Entrar</button>
        </form>
      </section>
    </div>
  )
}

export default Login
