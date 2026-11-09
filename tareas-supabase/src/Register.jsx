import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSesion } from './AuthContext.jsx'

function Register() {
  const { registrar, error, limpiarError } = useSesion()
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

    if (correcto) navegar('/tareas')
  }

  return (
    <div className="pantalla-centrada">
      <section className="tarjeta-acceso">
        <h1>Crear cuenta</h1>
        <p className="sub">Registrate para empezar</p>

        {error && (
          <div className="alerta error" onClick={limpiarError}>
            {error}
          </div>
        )}

        {aviso && <div className="alerta aviso">{aviso}</div>}

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

          <label>
            Repetir contrasena
            <input
              type="password"
              value={repetir}
              onChange={(e) => setRepetir(e.target.value)}
            />
          </label>

          <button type="submit" disabled={enviando}>
            {enviando ? 'Creando...' : 'Crear cuenta'}
          </button>
        </form>

        <p className="pie">
          Ya tienes cuenta? <Link to="/login">Inicia sesion</Link>
        </p>
      </section>
    </div>
  )
}

export default Register
