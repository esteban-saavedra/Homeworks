import { useState } from 'react'
import { ListaDobleEnlazada } from '../estructuras/ListaDobleEnlazada.js'

// datos inventados de paginas visitadas
const PAGINAS = [
  { titulo: 'Google', url: 'google.com' },
  { titulo: 'GitHub', url: 'github.com' },
  { titulo: 'Instagram', url: 'instagram.com' },
  { titulo: 'Estudiante - Universidad Autónoma de Occidente | UAO Cali, Acreditada Alta Calidad', url: 'uao.edu.co/estudiante' },
  { titulo: 'YouTube', url: 'youtube.com' },
]

function construirHistorial() {
  const lista = new ListaDobleEnlazada()
  PAGINAS.forEach((pagina) => lista.agregar(pagina))
  return lista
}

function Navegador() {
  const [historial] = useState(construirHistorial)
  const [posicion, setPosicion] = useState(0)

  const nodoActual = historial.obtenerNodo(posicion)
  const paginas = historial.aArreglo()

  const hayAnterior = nodoActual.anterior !== null
  const haySiguiente = nodoActual.siguiente !== null
  // aqui esta lo bueno de la lista doble
  // le pregunto al nodo mismo si tiene vecinos, no tengo que contar posiciones
  // si anterior es null estoy en el inicio, si siguiente es null estoy en el final

  function atras() {
    if (hayAnterior) setPosicion(posicion - 1)
  }

  function adelante() {
    if (haySiguiente) setPosicion(posicion + 1)
  }
  // estos dos botones son exactamente las flechas de atras y adelante del navegador
  // y solo son posibles porque cada nodo guarda las dos direcciones

  return (
    <section className="pagina">
      <h2>Historial del navegador</h2>
      <p className="nota">
        Lista doblemente enlazada. Cada página conoce la anterior y la
        siguiente, así que se puede ir en los dos sentidos.
      </p>

      <div className="tarjeta tarjeta--web">
        <span className="etiqueta">Página actual</span>
        <h3>{nodoActual.valor.titulo}</h3>
        <p className="url">{nodoActual.valor.url}</p>
      </div>

      <div className="botones">
        <button onClick={atras} disabled={!hayAnterior}>
          Atrás
        </button>
        <button onClick={adelante} disabled={!haySiguiente}>
          Adelante
        </button>
      </div>
      {/* los botones se bloquean solos cuando llego a los extremos
          igualito a como se ponen grises las flechas de un navegador de verdad */}

      <ol className="listado">
        {paginas.map((pagina, i) => (
          <li key={i} className={i === posicion ? 'activo' : ''}>
            <span>{pagina.titulo}</span>
            <span className="artista">{pagina.url}</span>
          </li>
        ))}
      </ol>

      <details className="extra">
        <summary>Ver el historial al revés</summary>
        <ol className="listado">
          {historial.aArregloInverso().map((pagina, i) => (
            <li key={i}>
              <span>{pagina.titulo}</span>
              <span className="artista">{pagina.url}</span>
            </li>
          ))}
        </ol>
      </details>
      {/* agregue esto para demostrar algo que la lista simple no puede hacer:
          recorrer desde la cola hacia atras sin invertir nada */}
    </section>
  )
}

export default Navegador
