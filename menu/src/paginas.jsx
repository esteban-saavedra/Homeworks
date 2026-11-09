function Marco({ titulo, descripcion, children }) {
  return (
    <article className="pagina">
      <h1>{titulo}</h1>
      <p className="descripcion">{descripcion}</p>
      {children}
    </article>
  )
}

export function Perfil() {
  return (
    <Marco
      titulo="Perfil"
      descripcion="Datos publicos de tu cuenta: nombre, foto y biografia."
    >
      <div className="bloques">
        <div className="bloque">
          <span className="etiqueta">Nombre</span>
          <strong>Esteban Saavedra</strong>
        </div>
        <div className="bloque">
          <span className="etiqueta">Usuario</span>
          <strong>@esteban</strong>
        </div>
        <div className="bloque">
          <span className="etiqueta">Miembro desde</span>
          <strong>Octubre 2026</strong>
        </div>
      </div>
    </Marco>
  )
}

export function Mensajes() {
  const conversaciones = [
    { de: 'Camila Rios', texto: 'Te mando el informe manana', hora: '10:24' },
    { de: 'Soporte', texto: 'Tu ticket fue resuelto', hora: '09:03' },
    { de: 'Diego Salazar', texto: 'Quedamos a las 3?', hora: 'Ayer' },
  ]

  return (
    <Marco titulo="Mensajes" descripcion="Tus conversaciones recientes.">
      <ul className="listado">
        {conversaciones.map((c, i) => (
          <li key={i}>
            <div>
              <strong>{c.de}</strong>
              <span className="tenue">{c.texto}</span>
            </div>
            <span className="tenue">{c.hora}</span>
          </li>
        ))}
      </ul>
    </Marco>
  )
}

export function Cuenta() {
  return (
    <Marco
      titulo="Cuenta"
      descripcion="Informacion de acceso y plan contratado."
    >
      <div className="bloques">
        <div className="bloque">
          <span className="etiqueta">Correo</span>
          <strong>esteban@ejemplo.com</strong>
        </div>
        <div className="bloque">
          <span className="etiqueta">Plan</span>
          <strong>Gratuito</strong>
        </div>
      </div>
    </Marco>
  )
}

export function PerfilAjustes() {
  return (
    <Marco
      titulo="Perfil"
      descripcion="Como te ven los demas usuarios dentro de la plataforma."
    >
      <div className="bloques">
        <div className="bloque">
          <span className="etiqueta">Visibilidad</span>
          <strong>Publica</strong>
        </div>
        <div className="bloque">
          <span className="etiqueta">Idioma</span>
          <strong>Espanol</strong>
        </div>
      </div>
    </Marco>
  )
}

export function Seguridad() {
  return (
    <Marco
      titulo="Seguridad y privacidad"
      descripcion="Controla quien puede ver tu actividad y desde donde entras."
    >
      <div className="bloques">
        <div className="bloque">
          <span className="etiqueta">Verificacion en dos pasos</span>
          <strong>Activada</strong>
        </div>
        <div className="bloque">
          <span className="etiqueta">Perfil visible para</span>
          <strong>Solo contactos</strong>
        </div>
      </div>
    </Marco>
  )
}

export function Dispositivos() {
  const equipos = [
    { nombre: 'Windows - Chrome', lugar: 'Cali, Colombia', estado: 'Este equipo' },
    { nombre: 'Android - App', lugar: 'Cali, Colombia', estado: 'Hace 2 horas' },
  ]

  return (
    <Marco
      titulo="Dispositivos"
      descripcion="Equipos donde tu cuenta tiene sesion abierta."
    >
      <ul className="listado">
        {equipos.map((e, i) => (
          <li key={i}>
            <div>
              <strong>{e.nombre}</strong>
              <span className="tenue">{e.lugar}</span>
            </div>
            <span className="tenue">{e.estado}</span>
          </li>
        ))}
      </ul>
    </Marco>
  )
}

export function Sesiones() {
  return (
    <Marco
      titulo="Sesiones activas"
      descripcion="Puedes cerrar todas las sesiones menos la actual."
    >
      <div className="bloques">
        <div className="bloque">
          <span className="etiqueta">Sesiones abiertas</span>
          <strong>2</strong>
        </div>
        <div className="bloque">
          <span className="etiqueta">Ultimo acceso</span>
          <strong>Hoy, 03:15</strong>
        </div>
      </div>
    </Marco>
  )
}

export function Contrasena() {
  return (
    <Marco
      titulo="Contrasena"
      descripcion="Cambia tu clave de acceso periodicamente."
    >
      <div className="bloques">
        <div className="bloque">
          <span className="etiqueta">Ultimo cambio</span>
          <strong>Hace 3 meses</strong>
        </div>
      </div>
    </Marco>
  )
}

export function Notificaciones() {
  const avisos = [
    { tipo: 'Correo', estado: 'Activado' },
    { tipo: 'Push', estado: 'Activado' },
    { tipo: 'SMS', estado: 'Desactivado' },
  ]

  return (
    <Marco
      titulo="Notificaciones"
      descripcion="Elige por donde quieres recibir los avisos."
    >
      <ul className="listado">
        {avisos.map((a, i) => (
          <li key={i}>
            <strong>{a.tipo}</strong>
            <span className="tenue">{a.estado}</span>
          </li>
        ))}
      </ul>
    </Marco>
  )
}

export function Preguntas() {
  const preguntas = [
    'Como cambio mi contrasena',
    'Como cierro sesion en todos mis equipos',
    'Donde veo mis facturas',
  ]

  return (
    <Marco
      titulo="Preguntas frecuentes"
      descripcion="Las dudas mas comunes de los usuarios."
    >
      <ul className="listado">
        {preguntas.map((p, i) => (
          <li key={i}>
            <strong>{p}</strong>
          </li>
        ))}
      </ul>
    </Marco>
  )
}

export function Ticket() {
  return (
    <Marco
      titulo="Enviar un ticket"
      descripcion="Escribenos y te respondemos en menos de 24 horas."
    >
      <div className="bloques">
        <div className="bloque">
          <span className="etiqueta">Tickets abiertos</span>
          <strong>0</strong>
        </div>
        <div className="bloque">
          <span className="etiqueta">Tiempo de respuesta</span>
          <strong>12 horas</strong>
        </div>
      </div>
    </Marco>
  )
}

export function EstadoRed() {
  const servicios = [
    { nombre: 'Aplicacion web', estado: 'Operativo' },
    { nombre: 'Base de datos', estado: 'Operativo' },
    { nombre: 'Notificaciones', estado: 'Lento' },
  ]

  return (
    <Marco
      titulo="Estado de la red"
      descripcion="Como estan funcionando los servicios ahora mismo."
    >
      <ul className="listado">
        {servicios.map((s, i) => (
          <li key={i}>
            <strong>{s.nombre}</strong>
            <span className="tenue">{s.estado}</span>
          </li>
        ))}
      </ul>
    </Marco>
  )
}

export function CerrarSesion() {
  return (
    <Marco
      titulo="Cerrar sesion"
      descripcion="Saldras de tu cuenta en este equipo."
    >
      <div className="bloques">
        <div className="bloque">
          <span className="etiqueta">Sesion actual</span>
          <strong>esteban@ejemplo.com</strong>
        </div>
      </div>
    </Marco>
  )
}
