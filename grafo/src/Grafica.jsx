import { useRef, useState, useEffect } from 'react'
import { Graph } from 'react-d3-graph'

function Grafica({ datos, version, onSeleccionar }) {
  const contenedor = useRef(null)
  const [ancho, setAncho] = useState(700)

  useEffect(() => {
    function medir() {
      if (contenedor.current) {
        setAncho(contenedor.current.getBoundingClientRect().width)
      }
    }

    medir()
    window.addEventListener('resize', medir)

    return () => window.removeEventListener('resize', medir)
  }, [])

  const configuracion = {
    directed: false,
    nodeHighlightBehavior: true,
    linkHighlightBehavior: true,
    height: 480,
    width: ancho,
    staticGraph: false,
    d3: {
      gravity: -420,
      linkLength: 130,
      alphaTarget: 0.05,
    },
    node: {
      labelProperty: 'nombre',
      labelPosition: 'bottom',
      fontSize: 12,
      highlightFontSize: 13,
      highlightFontWeight: 'bold',
      highlightStrokeColor: '#1b2b33',
      highlightStrokeWidth: 2,
      fontColor: '#1b2b33',
    },
    link: {
      highlightColor: '#1b2b33',
    },
  }

  return (
    <div className="lienzo" ref={contenedor}>
      {datos.nodes.length > 0 ? (
        <Graph
          id={'grafo-' + version}
          data={datos}
          config={configuracion}
          onClickNode={onSeleccionar}
        />
      ) : (
        <p className="vacio">El grafo esta vacio.</p>
      )}
    </div>
  )
}

export default Grafica
