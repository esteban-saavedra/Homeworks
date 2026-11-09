import { useState } from 'react'
import { useTareas } from './useTareas.js'
import Avatar from './Avatar.jsx'

function Tareas() {
  const {
    tareas,
    pendientes,
    completadas,
    cargando,
    error,
    enVivo,
    limpiarError,
    crear,
    editar,
    alternar,
    eliminar,
  } = useTareas()

  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [validacion, setValidacion] = useState('')

  const [editando, setEditando] = useState(null)
  const [tituloEdit, setTituloEdit] = useState('')
  const [descripcionEdit, setDescripcionEdit] = useState('')

  async function enviar(evento) {
    evento.preventDefault()

    if (titulo.trim() === '') {
      setValidacion('La tarea necesita un titulo.')
      return
    }

    setValidacion('')

    const correcto = await crear(titulo.trim(), descripcion.trim())

    if (correcto) {
      setTitulo('')
      setDescripcion('')
    }
  }

  function abrirEdicion(tarea) {
    setEditando(tarea.id)
    setTituloEdit(tarea.titulo)
    setDescripcionEdit(tarea.descripcion || '')
  }

  async function guardarEdicion(id) {
    if (tituloEdit.trim() === '') return

    const correcto = await editar(id, tituloEdit.trim(), descripcionEdit.trim())

    if (correcto) setEditando(null)
  }

  function confirmarBorrado(tarea) {
    if (window.confirm('Eliminar "' + tarea.titulo + '"?')) {
      eliminar(tarea.id)
    }
  }

  function pintarTarea(tarea) {
    if (editando === tarea.id) {
      return (
        <article key={tarea.id} className="tarea editando">
          <input
            value={tituloEdit}
            onChange={(e) => setTituloEdit(e.target.value)}
          />
          <textarea
            rows={2}
            value={descripcionEdit}
            onChange={(e) => setDescripcionEdit(e.target.value)}
          />
          <div className="acciones">
            <button type="button" onClick={() => guardarEdicion(tarea.id)}>
              Guardar
            </button>
            <button
              type="button"
              className="secundario"
              onClick={() => setEditando(null)}
            >
              Cancelar
            </button>
          </div>
        </article>
      )
    }

    return (
      <article key={tarea.id} className={tarea.hecha ? 'tarea hecha' : 'tarea'}>
        <div className="encabezado">
          <label className="marca">
            <input
              type="checkbox"
              checked={tarea.hecha}
              onChange={() => alternar(tarea.id, tarea.hecha)}
            />
            <span className="titulo-tarea">{tarea.titulo}</span>
          </label>

          <span className={tarea.hecha ? 'insignia si' : 'insignia no'}>
            {tarea.hecha ? 'Hecha' : 'Pendiente'}
          </span>
        </div>

        {tarea.descripcion && <p className="descripcion">{tarea.descripcion}</p>}

        <div className="acciones">
          <button
            type="button"
            className="secundario"
            onClick={() => abrirEdicion(tarea)}
          >
            Editar
          </button>
          <button
            type="button"
            className="peligro"
            onClick={() => confirmarBorrado(tarea)}
          >
            Eliminar
          </button>
        </div>
      </article>
    )
  }

  return (
    <div className="contenido">
      <header className="cabecera-pagina">
        <div>
          <h1>Mis tareas</h1>
          <p>
            {pendientes.length} pendiente(s) y {completadas.length} completada(s)
          </p>
        </div>

        <span className={enVivo ? 'estado vivo' : 'estado'}>
          {enVivo ? 'En vivo' : 'Conectando...'}
        </span>
      </header>

      {error && (
        <div className="alerta error" onClick={limpiarError}>
          {error}
        </div>
      )}

      <div className="rejilla">
        <div className="columna-izquierda">
          <section className="tarjeta">
            <div className="cabecera">
              <h2>Nueva tarea</h2>
              <span className="tipo">Insert</span>
            </div>

            <form onSubmit={enviar}>
              <label>
                Titulo
                <input
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ej: Estudiar para el parcial"
                />
              </label>

              <label>
                Descripcion
                <textarea
                  rows={3}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Opcional"
                />
              </label>

              {validacion && <p className="texto-error">{validacion}</p>}

              <button type="submit">Agregar tarea</button>
            </form>
          </section>

          <Avatar />
        </div>

        <div className="columna-derecha">
          {cargando && <p className="tenue">Cargando tareas...</p>}

          {!cargando && tareas.length === 0 && (
            <section className="tarjeta vacia">
              Todavia no tienes tareas. Crea la primera.
            </section>
          )}

          {pendientes.length > 0 && (
            <>
              <h2 className="titulo-grupo">Pendientes</h2>
              {pendientes.map(pintarTarea)}
            </>
          )}

          {completadas.length > 0 && (
            <>
              <h2 className="titulo-grupo">Completadas</h2>
              {completadas.map(pintarTarea)}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Tareas
