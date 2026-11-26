import { useState, useRef } from 'react'
import { MonticuloMaximo } from './MonticuloMaximo.js'
import {
  CANCIONES,
  GENEROS,
  construirTrie,
  construirGrafo,
  formatearReproducciones,
} from './datos.js'

const PALETA = ['#c2410c', '#65a30d', '#1e3a5f', '#7c3aed', '#db2777', '#0891b2', '#e11d48', '#0d9488']

function inicial(titulo) {
  return titulo.trim().charAt(0).toUpperCase()
}

function App() {
  const trie = useRef(null)
  const grafo = useRef(null)

  if (trie.current === null) {
    trie.current = construirTrie()
    grafo.current = construirGrafo()

    console.log('Plataforma lista con ' + trie.current.tamano + ' canciones')
    console.log('Trie: ' + trie.current.contarNodos() + ' nodos, profundidad ' + trie.current.profundidad())
    console.log('sugerencias("la"):', trie.current.sugerencias('la').map((c) => c.titulo))
    console.log('existe("Normal"):', trie.current.existe('Normal'))
    console.log('top(5):', MonticuloMaximo.top(trie.current.todas(), 5).map((c) => c.titulo))
    console.log('relacionadas("' + CANCIONES[0].titulo + '"):', grafo.current.relacionadas(CANCIONES[0].titulo))
  }

  const [version, setVersion] = useState(0)
  const refrescar = () => setVersion((v) => v + 1)

  const [prefijo, setPrefijo] = useState('la')
  const [k, setK] = useState(5)
  const [seleccionada, setSeleccionada] = useState(CANCIONES[0].titulo)

  const [titulo, setTitulo] = useState('')
  const [artista, setArtista] = useState('')
  const [genero, setGenero] = useState(GENEROS[0])
  const [reproducciones, setReproducciones] = useState('')
  const [similarA, setSimilarA] = useState(CANCIONES[1].titulo)
  const [error, setError] = useState('')
  const [aviso, setAviso] = useState('')

  const todas = trie.current.todas()
  const sugerencias = trie.current.sugerencias(prefijo)
  const existeExacta = trie.current.existe(prefijo)
  const top = MonticuloMaximo.top(todas, Number(k))
  const maximo = top.length > 0 ? top[0].reproducciones : 1

  const cancionSel = trie.current.obtener(seleccionada)
  const directas = grafo.current.relacionadas(seleccionada)
  const lejanas = grafo.current
    .recomendar(seleccionada, 2)
    .filter((r) => r.saltos === 2)

  function buscarEnConsola() {
    console.log('sugerencias("' + prefijo + '"):', trie.current.sugerencias(prefijo).map((c) => c.titulo))
    console.log('existe("' + prefijo + '"):', trie.current.existe(prefijo))
  }

  function agregarCancion(evento) {
    evento.preventDefault()
    setError('')
    setAviso('')

    const nombre = titulo.trim()

    if (nombre === '') {
      setError('Escribe el titulo de la cancion.')
      return
    }

    if (artista.trim() === '') {
      setError('Escribe el artista.')
      return
    }

    const numero = Number(reproducciones)

    if (reproducciones === '' || isNaN(numero) || numero < 0) {
      setError('Las reproducciones deben ser un numero positivo.')
      return
    }

    const yaEstaba = trie.current.existe(nombre)

    trie.current.insertar({
      titulo: nombre,
      artista: artista.trim(),
      genero: genero,
      reproducciones: numero,
      color: PALETA[trie.current.tamano % PALETA.length],
    })

    grafo.current.agregarCancion(nombre)

    if (similarA !== '' && similarA !== nombre) {
      grafo.current.conectar(nombre, similarA)
    }

    console.log('insertar("' + nombre + '", ' + numero + ')')

    setAviso(
      yaEstaba
        ? 'Se actualizo "' + nombre + '" en el Trie'
        : 'Se inserto "' + nombre + '" y se relaciono con "' + similarA + '"'
    )

    setTitulo('')
    setArtista('')
    setReproducciones('')
    setSeleccionada(nombre)
    refrescar()
  }

  function pintarFila(cancion, posicion) {
    return (
      <li key={cancion.titulo}>
        <button
          type="button"
          className={
            cancion.titulo === seleccionada ? 'fila-cancion activa' : 'fila-cancion'
          }
          onClick={() => setSeleccionada(cancion.titulo)}
        >
          {posicion !== null && <span className="puesto">{posicion}</span>}

          <span className="portada" style={{ background: cancion.color }}>
            {inicial(cancion.titulo)}
          </span>

          <span className="meta">
            <strong>{cancion.titulo}</strong>
            <span>
              {cancion.artista} · {cancion.genero}
            </span>
          </span>

          {posicion !== null && (
            <span className="medidor">
              <i style={{ width: (cancion.reproducciones / maximo) * 100 + '%' }} />
            </span>
          )}

          <span className="cifra">
            <strong>{formatearReproducciones(cancion.reproducciones)}</strong>
            <span>repros</span>
          </span>
        </button>
      </li>
    )
  }

  return (
    <div className="panel">
      <header className="encabezado">
        <div>
          <h1>
            Mini<span>fy</span>
          </h1>
          <p>Buscador, ranking y recomendaciones con estructuras de datos</p>
        </div>

        <div className="indicadores">
          <div className="indicador">
            <strong>{trie.current.tamano}</strong>
            <span>Canciones</span>
          </div>
          <div className="indicador">
            <strong>{trie.current.contarNodos()}</strong>
            <span>Nodos del Trie</span>
          </div>
          <div className="indicador">
            <strong>{grafo.current.contarConexiones()}</strong>
            <span>Conexiones</span>
          </div>
        </div>
      </header>

      {error && <div className="alerta error">{error}</div>}
      {aviso && <div className="alerta aviso">{aviso}</div>}

      <div className="rejilla">
        <section className="tarjeta">
          <div className="cabecera">
            <h2>Buscador predictivo</h2>
            <span className="estructura">Trie</span>
          </div>

          <div className="controles">
            <label className="ancho-libre">
              Prefijo
              <input
                value={prefijo}
                onChange={(e) => setPrefijo(e.target.value)}
                placeholder="Escribe: la, te, fe..."
                autoFocus
              />
            </label>

            <button type="button" className="secundario" onClick={buscarEnConsola}>
              Ver en consola
            </button>
          </div>

          <div className={existeExacta ? 'senal existe' : 'senal no-existe'}>
            <i />
            {prefijo.trim() === ''
              ? 'Escribe algo para buscar'
              : existeExacta
                ? '"' + prefijo + '" existe como cancion'
                : '"' + prefijo + '" no es una cancion exacta, pero hay ' +
                  sugerencias.length +
                  ' sugerencia(s)'}
          </div>

          {sugerencias.length > 0 ? (
            <ul className="listado">{sugerencias.map((c) => pintarFila(c, null))}</ul>
          ) : (
            <p className="vacio">Ninguna cancion empieza con ese prefijo.</p>
          )}
        </section>

        <section className="tarjeta">
          <div className="cabecera">
            <h2>Top {k} mas escuchadas</h2>
            <span className="estructura">Max Heap</span>
          </div>

          <div className="controles">
            <label className="angosto">
              Cuantas
              <input
                type="number"
                min="1"
                max="20"
                value={k}
                onChange={(e) => setK(e.target.value)}
              />
            </label>
          </div>

          <ul className="listado">{top.map((c, i) => pintarFila(c, i + 1))}</ul>
        </section>

        <section className="tarjeta">
          <div className="cabecera">
            <h2>Canciones relacionadas</h2>
            <span className="estructura">Grafo no dirigido</span>
          </div>

          {cancionSel ? (
            <>
              <div className="destacado">
                <span className="portada" style={{ background: cancionSel.color }}>
                  {inicial(cancionSel.titulo)}
                </span>
                <span className="meta">
                  <strong>{cancionSel.titulo}</strong>
                  <span>
                    {cancionSel.artista} · {grafo.current.grado(seleccionada)} conexion(es)
                  </span>
                </span>
              </div>

              <div className="grupo-relacion">
                <h3>Relacionadas directamente</h3>
                {directas.length > 0 ? (
                  <div className="fichas">
                    {directas.map((t) => {
                      const c = trie.current.obtener(t)
                      return (
                        <button
                          key={t}
                          type="button"
                          className="ficha"
                          onClick={() => setSeleccionada(t)}
                        >
                          <i style={{ background: c ? c.color : '#555' }} />
                          {t}
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <p className="vacio">Esta cancion no tiene conexiones todavia.</p>
                )}
              </div>

              <div className="grupo-relacion">
                <h3>Tambien te puede gustar (a dos saltos)</h3>
                {lejanas.length > 0 ? (
                  <div className="fichas">
                    {lejanas.map((r) => {
                      const c = trie.current.obtener(r.titulo)
                      return (
                        <button
                          key={r.titulo}
                          type="button"
                          className="ficha lejana"
                          onClick={() => setSeleccionada(r.titulo)}
                        >
                          <i style={{ background: c ? c.color : '#555' }} />
                          {r.titulo}
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <p className="vacio">Nada nuevo a dos saltos.</p>
                )}
              </div>

              <p className="pie">
                Dale clic a cualquier cancion de las listas o de las fichas para ver sus
                recomendaciones. Como el grafo es no dirigido, la relacion funciona en
                los dos sentidos.
              </p>
            </>
          ) : (
            <p className="vacio">Elige una cancion de las listas.</p>
          )}
        </section>

        <section className="tarjeta">
          <div className="cabecera">
            <h2>Agregar cancion</h2>
            <span className="estructura">Trie + Grafo</span>
          </div>

          <form onSubmit={agregarCancion}>
            <div className="campos-pareados">
              <label>
                Titulo
                <input
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ej: Luna"
                />
              </label>

              <label>
                Artista
                <input
                  value={artista}
                  onChange={(e) => setArtista(e.target.value)}
                  placeholder="Ej: Feid"
                />
              </label>

              <label>
                Genero
                <select value={genero} onChange={(e) => setGenero(e.target.value)}>
                  {GENEROS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Reproducciones
                <input
                  type="number"
                  min="0"
                  value={reproducciones}
                  onChange={(e) => setReproducciones(e.target.value)}
                  placeholder="Ej: 150"
                />
              </label>
            </div>

            <label>
              Parecida a
              <select value={similarA} onChange={(e) => setSimilarA(e.target.value)}>
                {todas.map((c) => (
                  <option key={c.titulo} value={c.titulo}>
                    {c.titulo}
                  </option>
                ))}
              </select>
            </label>

            <button type="submit">Insertar en la plataforma</button>
          </form>

          <p className="pie">
            Al insertar, el titulo entra al Trie letra por letra, la cancion pasa a
            competir en el Max Heap y se crea una arista en el grafo con la cancion
            parecida que elijas.
          </p>
        </section>
      </div>
    </div>
  )
}

export default App
