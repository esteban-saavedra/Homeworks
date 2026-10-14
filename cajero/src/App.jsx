import { useState, useRef } from 'react'
import { Cola } from './estructuras/Cola.js'
import {
  PERSONAS_INICIALES,
  fechaLlegadaAleatoria,
  formatearHora,
  formatearMonto,
} from './datos.js'

function App() {
  const cola = useRef(null)

  if (cola.current === null) {
    cola.current = new Cola()
    PERSONAS_INICIALES.forEach((p) =>
      cola.current.encolar({ ...p, llegada: fechaLlegadaAleatoria() })
    )
  }

  const [version, setVersion] = useState(0)
  const refrescar = () => setVersion((v) => v + 1)

  const [nombre, setNombre] = useState('')
  const [monto, setMonto] = useState('')
  const [error, setError] = useState('')
  const [aviso, setAviso] = useState('')

  function crearPersona(evento) {
    evento.preventDefault()

    if (nombre.trim() === '') {
      setError('Escribe el nombre de la persona.')
      return
    }

    const valor = Number(monto)

    if (monto === '' || isNaN(valor) || valor <= 0) {
      setError('El monto debe ser un numero mayor a cero.')
      return
    }

    const persona = {
      nombre: nombre.trim(),
      monto: valor,
      llegada: fechaLlegadaAleatoria(),
    }
    // la hora de llegada no la escribe el usuario, se la pone el sistema

    cola.current.encolar(persona)

    setNombre('')
    setMonto('')
    setError('')
    setAviso(persona.nombre + ' entro a la fila')
    refrescar()
  }

  function atender() {
    if (cola.current.estaVacia()) {
      setAviso('No hay nadie en la fila.')
      return
    }

    const persona = cola.current.desencolar()
    setAviso(persona.nombre + ' retiro ' + formatearMonto(persona.monto))
    refrescar()
  }

  const fila = cola.current.aArreglo()
  const porLlegada = cola.current.aArregloPorLlegada()
  const siguiente = cola.current.verFrente()

  return (
    <div className="panel">
      <header>
        <h1>Cajero automático</h1>
        <p>Cola de personas en espera de retiro</p>
      </header>

      {aviso && <div className="aviso">{aviso}</div>}

      <div className="rejilla">

        {/* FORMULARIO */}
        <section className="tarjeta">
          <div className="cabecera">
            <h2>Nueva persona</h2>
            <span className="tipo">Encolar</span>
          </div>

          <form onSubmit={crearPersona}>
            <label>
              Nombre
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Camila Rios"
              />
            </label>

            <label>
              Monto a retirar
              <input
                type="number"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                placeholder="Ej: 200000"
              />
            </label>

            <p className="nota">
              La hora de llegada la asigna el sistema de forma aleatoria.
            </p>

            {error && <p className="error">{error}</p>}

            <button type="submit">Agregar a la fila</button>
          </form>
          {}
        </section>

        {/* ESTADO DE LA COLA */}
        <section className="tarjeta">
          <div className="cabecera">
            <h2>Atención</h2>
            <span className="tipo">Desencolar</span>
          </div>

          <p className="dato">{cola.current.tamano} persona(s) en la fila</p>

          {siguiente ? (
            <div className="destacado">
              <span className="mini">En el cajero</span>
              <strong>{siguiente.nombre}</strong>
              <span className="mini">{formatearMonto(siguiente.monto)}</span>
              <span className="mini">Llegó a las {formatearHora(siguiente.llegada)}</span>
            </div>
          ) : (
            <div className="destacado vacio">No hay nadie en la fila</div>
          )}

          <button onClick={atender} disabled={cola.current.estaVacia()}>
            Atender al siguiente
          </button>

          <h3>Orden de la fila</h3>
          <ol className="lista">
            {fila.map((p, i) => (
              <li key={i} className={i === 0 ? 'primero' : ''}>
                <span>{p.nombre}</span>
                <span className="tenue">{formatearMonto(p.monto)}</span>
              </li>
            ))}
          </ol>
          {}
        </section>

        {/* ORDENADA POR LLEGADA */}
        <section className="tarjeta ancha">
          <div className="cabecera">
            <h2>Fila ordenada por hora de llegada</h2>
            <span className="tipo">Punto 4 del reto</span>
          </div>

          {porLlegada.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Monto</th>
                  <th>Hora de llegada</th>
                </tr>
              </thead>
              <tbody>
                {porLlegada.map((p, i) => (
                  <tr key={i}>
                    <td className="tenue">{i + 1}</td>
                    <td>{p.nombre}</td>
                    <td>{formatearMonto(p.monto)}</td>
                    <td>{formatearHora(p.llegada)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="destacado vacio">No hay nadie en la fila</div>
          )}

          <p className="pie">
            Esta tabla no es la cola: es una copia ordenada por hora. La cola por
            dentro sigue siendo FIFO y se atiende por el frente.
          </p>
        </section>
      </div>
    </div>
  )
}

export default App
