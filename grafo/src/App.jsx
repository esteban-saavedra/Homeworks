import { useState, useRef } from 'react'
import Grafica from './Grafica.jsx'
import { construirGrafo, generarId, COLORES } from './datos.js'

function App() {
  const grafo = useRef(null)

  if (grafo.current === null) {
    grafo.current = construirGrafo()

    const inicial = grafo.current.ciudades()[0]
    console.log('Personas en ' + inicial.nombre + ':')
    console.table(
      grafo.current.personasEnCiudad(inicial.id).map((p) => ({
        nombre: p.nombre,
        edad: p.edad,
      }))
    )
  }

  const [version, setVersion] = useState(0)
  const refrescar = () => setVersion((v) => v + 1)

  const ciudades = grafo.current.ciudades()
  const personas = grafo.current.personas()
  const conteo = grafo.current.contar()

  const [ciudadElegida, setCiudadElegida] = useState(ciudades[0].id)
  const [seleccionado, setSeleccionado] = useState(null)

  const [nombre, setNombre] = useState('')
  const [edad, setEdad] = useState('')
  const [ciudadNueva, setCiudadNueva] = useState(ciudades[0].id)
  const [amigoUno, setAmigoUno] = useState(personas[0].id)
  const [amigoOtro, setAmigoOtro] = useState(personas[1].id)
  const [error, setError] = useState('')
  const [aviso, setAviso] = useState('')

  const residentes = grafo.current.personasEnCiudad(ciudadElegida)
  const ciudadActual = grafo.current.obtener(ciudadElegida)
  const nodoSeleccionado = seleccionado ? grafo.current.obtener(seleccionado) : null

  function crearPersona(evento) {
    evento.preventDefault()
    setError('')
    setAviso('')

    const limpio = nombre.trim()

    if (limpio === '') {
      setError('Escribe el nombre de la persona.')
      return
    }

    const numero = Number(edad)

    if (edad === '' || isNaN(numero) || numero <= 0 || numero > 120) {
      setError('La edad debe ser un numero entre 1 y 120.')
      return
    }

    const id = generarId(limpio, grafo.current.nodos)

    grafo.current.agregarPersona(id, limpio, numero, ciudadNueva)

    const ciudad = grafo.current.obtener(ciudadNueva)
    setAviso(limpio + ' se agrego al grafo y vive en ' + ciudad.nombre)
    setNombre('')
    setEdad('')
    setCiudadElegida(ciudadNueva)

    console.log('Personas en ' + ciudad.nombre + ':')
    console.table(
      grafo.current.personasEnCiudad(ciudadNueva).map((p) => ({
        nombre: p.nombre,
        edad: p.edad,
      }))
    )

    refrescar()
  }

  function crearAmistad(evento) {
    evento.preventDefault()
    setError('')
    setAviso('')

    if (amigoUno === amigoOtro) {
      setError('Elige dos personas distintas.')
      return
    }

    if (grafo.current.existeArista(amigoUno, amigoOtro)) {
      setError('Esas dos personas ya son amigas.')
      return
    }

    grafo.current.conectarAmigos(amigoUno, amigoOtro)

    const uno = grafo.current.obtener(amigoUno)
    const otro = grafo.current.obtener(amigoOtro)
    setAviso(uno.nombre + ' y ' + otro.nombre + ' ahora son amigos')

    refrescar()
  }

  const datosD3 = grafo.current.aFormatoD3(COLORES)

  return (
    <div className="pagina">
      <header>
        <h1>Grafo de amigos y ciudades</h1>
        <p>
          {conteo.personas} personas, {conteo.ciudades} ciudades,{' '}
          {conteo.amistades} amistades
        </p>
      </header>

      {error && <div className="alerta error">{error}</div>}
      {aviso && <div className="alerta aviso">{aviso}</div>}

      <div className="rejilla">
        <section className="tarjeta">
          <div className="cabecera">
            <h2>Nueva persona</h2>
            <span className="tipo">Nodo</span>
          </div>

          <form onSubmit={crearPersona}>
            <label>
              Nombre
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Mariana"
              />
            </label>

            <label>
              Edad
              <input
                type="number"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                placeholder="Ej: 24"
              />
            </label>

            <label>
              Ciudad
              <select
                value={ciudadNueva}
                onChange={(e) => setCiudadNueva(e.target.value)}
              >
                {ciudades.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </select>
            </label>

            <button type="submit">Agregar al grafo</button>
          </form>
        </section>

        <section className="tarjeta">
          <div className="cabecera">
            <h2>Nueva amistad</h2>
            <span className="tipo">Arista</span>
          </div>

          <form onSubmit={crearAmistad}>
            <label>
              Persona
              <select value={amigoUno} onChange={(e) => setAmigoUno(e.target.value)}>
                {personas.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Amiga o amigo de
              <select value={amigoOtro} onChange={(e) => setAmigoOtro(e.target.value)}>
                {personas.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </select>
            </label>

            <button type="submit">Conectar</button>
          </form>
        </section>

        <section className="tarjeta ancha">
          <div className="cabecera">
            <h2>Quien vive en una ciudad</h2>
            <span className="tipo">personasEnCiudad()</span>
          </div>

          <div className="barra-ciudades">
            {ciudades.map((c) => (
              <button
                key={c.id}
                type="button"
                className={c.id === ciudadElegida ? 'pestana activa' : 'pestana'}
                onClick={() => setCiudadElegida(c.id)}
              >
                {c.nombre}
                <span className="contador">
                  {grafo.current.personasEnCiudad(c.id).length}
                </span>
              </button>
            ))}
          </div>

          {residentes.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Edad</th>
                  <th>Amistades</th>
                </tr>
              </thead>
              <tbody>
                {residentes.map((p, i) => (
                  <tr key={p.id}>
                    <td className="tenue">{i + 1}</td>
                    <td>{p.nombre}</td>
                    <td>{p.edad} anos</td>
                    <td className="tenue">
                      {grafo.current.amigosDe(p.id).map((a) => a.nombre).join(', ') ||
                        'sin amistades'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="vacio">Nadie vive en {ciudadActual.nombre} todavia.</p>
          )}
        </section>

        <section className="tarjeta ancha">
          <div className="cabecera">
            <h2>Estructura</h2>
            <span className="tipo">react-d3-graph</span>
          </div>

          <div className="leyenda">
            <span className="marca">
              <i style={{ background: COLORES.persona }} /> Persona
            </span>
            <span className="marca">
              <i className="cuadro" style={{ background: COLORES.ciudad }} /> Ciudad
            </span>
          </div>

          <Grafica
            datos={datosD3}
            version={version}
            onSeleccionar={setSeleccionado}
          />

          {nodoSeleccionado && (
            <div className="detalle">
              {nodoSeleccionado.esPersona() ? (
                <>
                  <strong>{nodoSeleccionado.nombre}</strong>
                  <span className="tenue">
                    {nodoSeleccionado.edad} anos, vive en{' '}
                    {grafo.current.ciudadDe(nodoSeleccionado.id).nombre}
                  </span>
                  <span className="tenue">
                    Amistades:{' '}
                    {grafo.current
                      .amigosDe(nodoSeleccionado.id)
                      .map((a) => a.nombre)
                      .join(', ') || 'ninguna'}
                  </span>
                </>
              ) : (
                <>
                  <strong>{nodoSeleccionado.nombre}</strong>
                  <span className="tenue">
                    {grafo.current.personasEnCiudad(nodoSeleccionado.id).length}{' '}
                    habitante(s) en el grafo
                  </span>
                </>
              )}
            </div>
          )}

          <p className="pie">
            Dale clic a cualquier nodo para ver su informacion. Puedes arrastrarlos
            para reacomodar el grafo.
          </p>
        </section>
      </div>
    </div>
  )
}

export default App
