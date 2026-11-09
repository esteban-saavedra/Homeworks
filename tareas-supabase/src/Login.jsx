import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSesion } from './AuthContext.jsx'

function Login() {
  const { login, error, limpiarError } = useSesion()
  const navegar = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function enviar(evento) {
    evento.preventDefault()
    setEnviando(true)

    const correcto = await login(email, password)

    setEnviando(false)

    if (correcto) navegar('/tareas')
  }

  return (
    <div className="pantalla-centrada">
      <section className="tarjeta-acceso">
        <h1>Iniciar sesion</h1>
        <p className="sub">Entra para ver tus tareas</p>

        {error && (
          <div className="alerta error" onClick={limpiarError}>
            {error}
          </div>
        )}

        <form onSubmit={enviar}>
          <label>
            Correo
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
            />
          </label>

          <label>
            Contrasena
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimo 6 caracteres"
            />
          </label>

          <button type="submit" disabled={enviando}>
            {enviando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="pie">
          No tienes cuenta? <Link to="/register">Registrate</Link>
        </p>
      </section>
    </div>
  )
}

export default Login
