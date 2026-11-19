import { useState, useRef } from 'react'
import { construirTrie } from './datos.js'
import { MonticuloMaximo } from './Monticulo.js'

function App() {
  const trie = useRef(null)

  if (trie.current === null) {
    trie.current = construirTrie()

    console.log('Buscador listo con ' + trie.current.tamano + ' productos')
    console.log('searchTopK("air", 2):')
    console.log(MonticuloMaximo.topK(trie.current.buscarPorPrefijo('air'), 2))
  }

  const [version, setVersion] = useState(0)
  const refrescar = () => setVersion((v) => v + 1)

  const [prefijo, setPrefijo] = useState('air')
  const [k, setK] = useState(3)

  const [nombre, setNombre] = useState('')
  const [popularidad, setPopularidad] = useState('')
  const [error, setError] = useState('')
  const [aviso, setAviso] = useState('')

  const coincidencias = trie.current.buscarPorPrefijo(prefijo)
  const mejores = MonticuloMaximo.topK(coincidencias, Number(k))

  function buscarEnConsola() {
    console.log('searchTopK("' + prefijo + '", ' + k + '):')
    console.log(MonticuloMaximo.topK(trie.current.buscarPorPrefijo(prefijo), Number(k)))
  }

  function insertar(evento) {
    evento.preventDefault()
    setError('')
    setAviso('')

    const limpio = nombre.trim()

    if (limpio === '') {
      setError('Escribe el nombre del producto.')
      return
    }

    const numero = Number(popularidad)

    if (popularidad === '' || isNaN(numero) || numero < 0 || numero > 100) {
      setError('La popularidad debe ser un numero entre 0 y 100.')
      return
    }

    const existia = trie.current.contiene(limpio)

    trie.current.insertar(limpio, numero)

    setAviso(
      existia
        ? 'Se actualizo la popularidad de "' + limpio + '" a ' + numero
        : 'Se inserto "' + limpio + '" con popularidad ' + numero
    )

    console.log('insert("' + limpio + '", ' + numero + ')')

    setNombre('')
    setPopularidad('')
    refrescar()
  }

  return (
    <div className="pagina">
      <header>
        <h1>Buscador inteligente</h1>
        <p>
          {trie.current.tamano} productos, {trie.current.contarNodos()} nodos en el
          Trie, profundidad {trie.current.profundidad()}
        </p>
      </header>

      {error && <div className="alerta error">{error}</div>}
      {aviso && <div className="alerta aviso">{aviso}</div>}

      <section className="tarjeta buscador">
        <div className="cabecera">
          <h2>Buscar por prefijo</h2>
          <span className="tipo">Trie + Heap</span>
        </div>

        <div className="controles">
          <label className="campo-prefijo">
            Prefijo
            <input
              value={prefijo}
              onChange={(e) => setPrefijo(e.target.value)}
              placeholder="Escribe: air, ad, nike..."
              autoFocus
            />
          </label>

          <label className="campo-k">
            Top K
            <input
              type="number"
              min="1"
              max="10"
              value={k}
              onChange={(e) => setK(e.target.value)}
            />
          </label>

          <button type="button" className="secundario" onClick={buscarEnConsola}>
            Imprimir en consola
          </button>
        </div>

        <p className="resumen">
          {prefijo.trim() === ''
            ? 'Escribe un prefijo para empezar'
            : coincidencias.length +
              ' coincidencia(s) con "' +
              prefijo +
              '", mostrando las ' +
              mejores.length +
              ' mas populares'}
        </p>
      </section>

      <div className="rejilla">
        <section className="tarjeta">
          <div className="cabecera">
            <h2>Top {k} mas populares</h2>
            <span className="tipo">Monticulo maximo</span>
          </div>

          {mejores.length > 0 ? (
            <ol className="podio">
              {mejores.map((p, i) => (
                <li key={p.name}>
                  <span className="puesto">{i + 1}</span>
                  <span className="nombre">{p.name}</span>
                  <span className="barra">
                    <i style={{ width: p.popularidad + '%' }} />
                  </span>
                  <span className="puntaje">{p.popularidad}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="vacio">Sin resultados para ese prefijo.</p>
          )}
        </section>

        <section className="tarjeta">
          <div className="cabecera">
            <h2>Todas las coincidencias</h2>
            <span className="tipo">Recorrido del Trie</span>
          </div>

          {coincidencias.length > 0 ? (
            <ul className="listado">
              {coincidencias.map((p) => (
                <li key={p.name}>
                  <span>{p.name}</span>
                  <span className="tenue">{p.popularidad}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="vacio">Nada coincide con ese prefijo.</p>
          )}
        </section>

        <section className="tarjeta ancha">
          <div className="cabecera">
            <h2>Insertar producto</h2>
            <span className="tipo">insert(nombre, popularidad)</span>
          </div>

          <form onSubmit={insertar}>
            <label>
              Nombre
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: air pegasus"
              />
            </label>

            <label>
              Popularidad
              <input
                type="number"
                min="0"
                max="100"
                value={popularidad}
                onChange={(e) => setPopularidad(e.target.value)}
                placeholder="0 a 100"
              />
            </label>

            <button type="submit">Insertar en el Trie</button>
          </form>

          <p className="pie">
            Si el producto ya existe se actualiza su popularidad en lugar de
            duplicarlo, porque en un Trie cada palabra ocupa un solo camino.
          </p>
        </section>
      </div>
    </div>
  )
}

export default App
