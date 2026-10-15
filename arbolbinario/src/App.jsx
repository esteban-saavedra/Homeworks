import { useState, useRef, useEffect } from 'react'
import Tree from 'react-d3-tree'
import { ArbolBinario } from './ArbolBinario.js'

const VALORES_INICIALES = [50, 30, 70, 20, 40, 60, 80, 35, 65, 90]

function nodoPersonalizado({ nodeDatum, toggleNode }) {
  if (nodeDatum.attributes && nodeDatum.attributes.vacio) {
    return <g />
  }

  const tieneHijos = nodeDatum.children && nodeDatum.children.length > 0

  return (
    <g onClick={toggleNode} className="nodo-d3">
      <circle r={20} className={tieneHijos ? 'circulo' : 'circulo hoja'} />
      <text className="etiqueta" dy={5} textAnchor="middle">
        {nodeDatum.name}
      </text>
    </g>
  )
}

function App() {
  const arbol = useRef(null)

  if (arbol.current === null) {
    arbol.current = new ArbolBinario()
    arbol.current.insertarVarios(VALORES_INICIALES)
    console.log('Arbol inicial con:', VALORES_INICIALES.join(', '))
    arbol.current.imprimirRecorridos()
  }

  const [version, setVersion] = useState(0)
  const refrescar = () => setVersion((v) => v + 1)

  const [entrada, setEntrada] = useState('')
  const [aviso, setAviso] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [resultado, setResultado] = useState(null)
  const [centro, setCentro] = useState({ x: 400, y: 80 })

  const contenedor = useRef(null)

  useEffect(() => {
    if (contenedor.current) {
      const medidas = contenedor.current.getBoundingClientRect()
      setCentro({ x: medidas.width / 2, y: 70 })
    }
  }, [])

  function insertar(evento) {
    evento.preventDefault()

    const numeros = ArbolBinario.desdeTexto(entrada)

    if (numeros.length === 0) {
      setAviso('Escribe uno o varios numeros separados por comas o espacios.')
      return
    }

    const salida = arbol.current.insertarVarios(numeros)

    const partes = []
    if (salida.insertados.length > 0) {
      partes.push('Insertados: ' + salida.insertados.join(', '))
    }
    if (salida.repetidos.length > 0) {
      partes.push('Ya estaban: ' + salida.repetidos.join(', '))
    }

    setAviso(partes.join('. '))
    setEntrada('')
    setResultado(null)

    console.log('Despues de insertar', numeros.join(', '))
    arbol.current.imprimirRecorridos()

    refrescar()
  }

  function buscar(evento) {
    evento.preventDefault()

    const numeros = ArbolBinario.desdeTexto(busqueda)

    if (numeros.length === 0) {
      setResultado(null)
      setAviso('Escribe un numero para buscar.')
      return
    }

    const valor = numeros[0]
    const salida = arbol.current.buscar(valor)

    setResultado({ valor: valor, ...salida })
    setAviso('')

    console.log(
      'Buscar ' + valor + ': ' + (salida.encontrado ? 'encontrado' : 'no esta') +
      ' en ' + salida.pasos + ' paso(s). Camino: ' + salida.camino.join(' -> ')
    )
  }

  function reiniciar() {
    arbol.current.vaciar()
    arbol.current.insertarVarios(VALORES_INICIALES)
    setAviso('Arbol reiniciado con los valores de ejemplo.')
    setResultado(null)
    console.log('Arbol reiniciado')
    arbol.current.imprimirRecorridos()
    refrescar()
  }

  function vaciar() {
    arbol.current.vaciar()
    setAviso('Arbol vacio.')
    setResultado(null)
    refrescar()
  }

  const datos = arbol.current.aFormatoD3()
  const inorden = arbol.current.inorden()
  const preorden = arbol.current.preorden()
  const postorden = arbol.current.postorden()

  return (
    <div className="pagina">
      <header>
        <h1>Arbol binario de busqueda</h1>
        <p>
          {arbol.current.tamano} nodo(s), altura {arbol.current.altura()},{' '}
          {arbol.current.contarHojas()} hoja(s)
        </p>
      </header>

      {aviso && <div className="aviso">{aviso}</div>}

      <div className="rejilla">
        <section className="tarjeta">
          <div className="cabecera">
            <h2>Insertar</h2>
            <span className="tipo">Nuevos nodos</span>
          </div>

          <form onSubmit={insertar}>
            <label>
              Numeros
              <input
                value={entrada}
                onChange={(e) => setEntrada(e.target.value)}
                placeholder="Ej: 25, 45, 75"
              />
            </label>

            <p className="nota">
              Puedes escribir varios separados por comas o espacios. Los repetidos se
              ignoran porque en un arbol de busqueda cada valor aparece una sola vez.
            </p>

            <div className="botones">
              <button type="submit">Insertar</button>
              <button type="button" className="secundario" onClick={reiniciar}>
                Reiniciar
              </button>
              <button type="button" className="secundario" onClick={vaciar}>
                Vaciar
              </button>
            </div>
          </form>
        </section>

        <section className="tarjeta">
          <div className="cabecera">
            <h2>Buscar</h2>
            <span className="tipo">contiene(valor)</span>
          </div>

          <form onSubmit={buscar}>
            <label>
              Valor
              <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Ej: 40"
              />
            </label>

            <div className="botones">
              <button type="submit">Buscar</button>
            </div>
          </form>

          {resultado && (
            <div className={resultado.encontrado ? 'resultado si' : 'resultado no'}>
              <strong>
                {resultado.encontrado
                  ? 'El ' + resultado.valor + ' si esta en el arbol'
                  : 'El ' + resultado.valor + ' no esta en el arbol'}
              </strong>
              <span className="mini">
                {resultado.pasos} comparacion(es): {resultado.camino.join(' → ')}
              </span>
            </div>
          )}
        </section>

        <section className="tarjeta ancha">
          <div className="cabecera">
            <h2>Recorridos</h2>
            <span className="tipo">Tambien salen por consola</span>
          </div>

          <div className="recorridos">
            <div className="recorrido">
              <span className="etiqueta-recorrido">Inorden</span>
              <code>{inorden.join(', ') || 'vacio'}</code>
              <span className="mini">Izquierda, raiz, derecha. Sale ordenado.</span>
            </div>

            <div className="recorrido">
              <span className="etiqueta-recorrido">Preorden</span>
              <code>{preorden.join(', ') || 'vacio'}</code>
              <span className="mini">Raiz, izquierda, derecha.</span>
            </div>

            <div className="recorrido">
              <span className="etiqueta-recorrido">Postorden</span>
              <code>{postorden.join(', ') || 'vacio'}</code>
              <span className="mini">Izquierda, derecha, raiz.</span>
            </div>
          </div>
        </section>

        <section className="tarjeta ancha">
          <div className="cabecera">
            <h2>Estructura</h2>
            <span className="tipo">react-d3-tree</span>
          </div>

          <div className="lienzo" ref={contenedor}>
            {datos ? (
              <Tree
                data={datos}
                orientation="vertical"
                translate={centro}
                pathFunc="straight"
                separation={{ siblings: 1, nonSiblings: 1.2 }}
                nodeSize={{ x: 70, y: 90 }}
                renderCustomNodeElement={nodoPersonalizado}
                zoomable
                collapsible={false}
              />
            ) : (
              <p className="vacio">El arbol esta vacio. Inserta algun numero.</p>
            )}
          </div>

          <p className="pie">
            Cada nodo tiene a su izquierda los valores menores y a su derecha los
            mayores. Puedes arrastrar el lienzo y hacer zoom con la rueda.
          </p>
        </section>
      </div>
    </div>
  )
}

export default App
