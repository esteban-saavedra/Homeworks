import { useRef } from 'react'
import { useAvatar } from './useAvatar.js'
import { useSesion } from './AuthContext.jsx'

function Avatar() {
  const { usuario } = useSesion()
  const { url, subiendo, error, limpiarError, subir } = useAvatar()
  const entrada = useRef(null)

  const inicial = usuario.email.charAt(0).toUpperCase()

  async function elegir(evento) {
    const archivo = evento.target.files[0]
    await subir(archivo)
    evento.target.value = ''
  }

  return (
    <section className="tarjeta panel-avatar">
      <div className="cabecera">
        <h2>Tu avatar</h2>
        <span className="tipo">Bucket avatars</span>
      </div>

      <div className="avatar-fila">
        <div className="foto">
          {url ? <img src={url} alt="Avatar" /> : <span>{inicial}</span>}
        </div>

        <div className="avatar-datos">
          <strong>{usuario.email}</strong>
          <span className="tenue">PNG, JPG o WEBP. Maximo 2 MB.</span>

          <button
            type="button"
            className="secundario"
            onClick={() => entrada.current.click()}
            disabled={subiendo}
          >
            {subiendo ? 'Subiendo...' : url ? 'Cambiar foto' : 'Subir foto'}
          </button>

          <input
            ref={entrada}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={elegir}
            hidden
          />
        </div>
      </div>

      {error && (
        <div className="alerta error" onClick={limpiarError}>
          {error}
        </div>
      )}
    </section>
  )
}

export default Avatar
