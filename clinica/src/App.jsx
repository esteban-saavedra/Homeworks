import { useState, useRef, useEffect } from 'react'
import { ListaEspera } from './estructuras/ListaEspera.js'
import { HistorialAtencion } from './estructuras/HistorialAtencion.js'
import { RotacionMedicos } from './estructuras/RotacionMedicos.js'
import { ComiteCircular } from './estructuras/ComiteCircular.js'
import {
  PACIENTES_INICIALES,
  MEDICOS,
  COMITE,
  NUEVOS_PACIENTES,
  SEGUNDOS_ROTACION,
} from './datos.js'

function App() {
  const espera = useRef(null)
  const historial = useRef(null)
  const guardia = useRef(null)
  const comite = useRef(null)

  if (espera.current === null) {
    espera.current = new ListaEspera()
    PACIENTES_INICIALES.forEach((p) => espera.current.agregar(p))

    historial.current = new HistorialAtencion()

    guardia.current = new RotacionMedicos()
    MEDICOS.forEach((m) => guardia.current.agregar(m))

    comite.current = new ComiteCircular()
    COMITE.forEach((m) => comite.current.agregar(m))
  }

  const [version, setVersion] = useState(0)
  const refrescar = () => setVersion((v) => v + 1)

  const [posHistorial, setPosHistorial] = useState(0)
  const [restante, setRestante] = useState(SEGUNDOS_ROTACION)
  const [aviso, setAviso] = useState('')
  const [indiceNuevo, setIndiceNuevo] = useState(0)

  // ROTACION AUTOMATICA
  useEffect(() => {
    const reloj = setInterval(() => {
      setRestante((segundos) => {
        if (segundos <= 1) {
          guardia.current.siguienteTurno()
          refrescar()
          return SEGUNDOS_ROTACION
        }
        return segundos - 1
      })
    }, 1000)

    return () => clearInterval(reloj)
  }, [])

  function atenderPaciente() {
    if (espera.current.estaVacia()) {
      setAviso('No hay pacientes en espera.')
      return
    }

    const paciente = espera.current.atender()
    const medico = guardia.current.verActual()
    historial.current.registrar(paciente, medico)

        guardia.current.siguienteTurno()
        setRestante(SEGUNDOS_ROTACION)

    setPosHistorial(historial.current.tamano - 1)
    setAviso(paciente.nombre + ' fue atendido por ' + medico.nombre)
    refrescar()
  }

  function agregarPaciente() {
    const nuevo = NUEVOS_PACIENTES[indiceNuevo % NUEVOS_PACIENTES.length]

    espera.current.agregar({ ...nuevo })
    setIndiceNuevo(indiceNuevo + 1)
    setAviso(nuevo.nombre + ' entro a la sala de espera')
    refrescar()
  }

  const enEspera = espera.current.aArreglo()
  const proximo = espera.current.verPrimero()
  const registros = historial.current.aArreglo()
  const nodoHistorial = historial.current.obtenerNodo(posHistorial)
  const medicos = guardia.current.aArreglo()
  const medicoActual = guardia.current.verActual()
  const proximoMedico = guardia.current.verSiguiente()
  const miembros = comite.current.aArreglo()
  const miembroActual = comite.current.verActual()

  return (
    <div className="panel">
      <header>
        <h1>Clínica — panel de turnos</h1>
        <p>Sistema de gestión de pacientes, historial y guardias</p>
      </header>

      {aviso && <div className="aviso">{aviso}</div>}

      <div className="rejilla">

        {/* 1. SALA DE ESPERA - lista enlazada simple */}
        <section className="tarjeta espera">
          <div className="cabecera">
            <h2>Sala de espera</h2>
            <span className="tipo">Lista enlazada simple</span>
          </div>

          <p className="dato">
            {espera.current.tamano} paciente(s) en fila
          </p>

          {proximo ? (
            <div className="destacado">
              <span className="mini">Siguiente en pasar</span>
              <strong>{proximo.nombre}</strong>
              <span className="mini">{proximo.motivo}</span>
            </div>
          ) : (
            <div className="destacado vacio">Sala de espera vacía</div>
          )}

          <div className="botones">
            <button onClick={atenderPaciente} disabled={espera.current.estaVacia()}>
              Atender paciente
            </button>
            <button onClick={agregarPaciente} className="secundario">
              Registrar llegada
            </button>
          </div>

          <ol className="lista">
            {enEspera.map((p, i) => (
              <li key={i} className={i === 0 ? 'primero' : ''}>
                <span>{p.nombre}</span>
                <span className="tenue">{p.motivo}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* 2. HISTORIAL - lista doblemente enlazada */}
        <section className="tarjeta historial">
          <div className="cabecera">
            <h2>Historial de atención</h2>
            <span className="tipo">Lista doblemente enlazada</span>
          </div>

          {nodoHistorial ? (
            <>
              <div className="destacado">
                <span className="mini">
                  Registro {posHistorial + 1} de {historial.current.tamano}
                </span>
                <strong>{nodoHistorial.valor.paciente.nombre}</strong>
                <span className="mini">
                  Atendido por {nodoHistorial.valor.medico.nombre}
                </span>
                <span className="mini">{nodoHistorial.valor.hora}</span>
              </div>

              <div className="botones">
                <button
                  onClick={() => setPosHistorial(posHistorial - 1)}
                  disabled={nodoHistorial.anterior === null}
                >
                  Anterior
                </button>
                <button
                  onClick={() => setPosHistorial(posHistorial + 1)}
                  disabled={nodoHistorial.siguiente === null}
                >
                  Siguiente
                </button>
              </div>
              {/* los botones se bloquean preguntandole al nodo si tiene vecinos
                  esto es justo lo que la lista simple no puede hacer */}

              <ol className="lista">
                {registros.map((r, i) => (
                  <li
                    key={i}
                    className={i === posHistorial ? 'primero' : ''}
                    onClick={() => setPosHistorial(i)}
                  >
                    <span>{r.paciente.nombre}</span>
                    <span className="tenue">{r.hora}</span>
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <div className="destacado vacio">
              Todavía no se ha atendido a nadie
            </div>
          )}
        </section>

        {/* 3. GUARDIA - lista circular simple */}
        <section className="tarjeta guardia">
          <div className="cabecera">
            <h2>Médico de guardia</h2>
            <span className="tipo">Lista circular</span>
          </div>

          <div className="destacado">
            <span className="mini">En turno</span>
            <strong>{medicoActual.nombre}</strong>
            <span className="mini">{medicoActual.especialidad}</span>
          </div>

          <div className="reloj">
            <div className="barra">
              <div
                className="relleno"
                style={{ width: (restante / SEGUNDOS_ROTACION) * 100 + '%' }}
              />
            </div>
            <span className="mini">
              Cambia en {restante}s · sigue {proximoMedico.nombre}
            </span>
          </div>
          {/* la barra se va vaciando sola, es solo el ancho calculado
              con los segundos que quedan sobre el total */}

          <ol className="lista">
            {medicos.map((m, i) => (
              <li key={i} className={i === 0 ? 'primero' : ''}>
                <span>{m.nombre}</span>
                <span className="tenue">{m.especialidad}</span>
              </li>
            ))}
          </ol>

        </section>

        {/* 4. COMITE - lista circular doblemente enlazada */}
        <section className="tarjeta comite">
          <div className="cabecera">
            <h2>Comité administrativo</h2>
            <span className="tipo">Lista circular doble</span>
          </div>

          <div className="destacado">
            <span className="mini">Tiene la palabra</span>
            <strong>{miembroActual.nombre}</strong>
            <span className="mini">{miembroActual.cargo}</span>
          </div>

          <div className="botones">
            <button
              onClick={() => {
                comite.current.anterior()
                refrescar()
              }}
            >
              Ceder a la izquierda
            </button>
            <button
              onClick={() => {
                comite.current.siguiente()
                refrescar()
              }}
            >
              Pasar a la derecha
            </button>
          </div>
          {/* ninguno de los dos botones se bloquea nunca
              en un circulo doble siempre hay alguien a los dos lados */}

          <ol className="lista">
            {miembros.map((m, i) => (
              <li key={i} className={i === 0 ? 'primero' : ''}>
                <span>{m.nombre}</span>
                <span className="tenue">{m.cargo}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  )
}

export default App
