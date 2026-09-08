import { useState } from 'react'
import { ListaEnlazada } from '../estructuras/ListaEnlazada.js'

// datos inventados para llenar la lista (mocked data como pide el reto)
const CANCIONES = [
  { titulo: 'AGAIN', artista: 'Feid - Sky Rompiendo - Majid Jordan', duracion: '2:35' },
  { titulo: '4 Life', artista: 'Kris R.', duracion: '2:47' },
  { titulo: 'SUIZA', artista: 'Calle 24', duracion: '1:55' },
  { titulo: 'BIMEL', artista: 'Alvaro Diaz', duracion: '2:41' },
  { titulo: 'SKY', artista: 'Omar Courtz', duracion: '3:34' },
]

// aqui construyo la lista enlazada y le meto las canciones una por una
function construirPlaylist() {
  const lista = new ListaEnlazada()
  CANCIONES.forEach((cancion) => lista.agregar(cancion))
  return lista
}

function Canciones() {
  const [playlist] = useState(construirPlaylist)
  // le paso la funcion en vez del resultado para que React
  // solo arme la lista una vez y no la vuelva a construir en cada render

  const [posicion, setPosicion] = useState(0)
  // esta es la posicion de la cancion que esta sonando

  const cancionActual = playlist.obtener(posicion)
  const canciones = playlist.aArreglo()
  const esUltima = posicion === playlist.tamano - 1

  function siguiente() {
    if (!esUltima) setPosicion(posicion + 1)
  }
  // solo avanzo, nunca me devuelvo
  // esa es la limitacion real de la lista enlazada simple:
  // los nodos no saben quien iba antes, entonces no hay como retroceder

  function reiniciar() {
    setPosicion(0)
  }
  // para volver al inicio toca empezar de la cabeza otra vez

  return (
    <section className="pagina">
      <h2>Reproductor de canciones</h2>
      <p className="nota">
        Lista enlazada simple. Cada canción solo conoce cuál sigue, por eso
        únicamente se puede avanzar.
      </p>

      <div className="tarjeta tarjeta--musica">
        <span className="etiqueta">Sonando ahora</span>
        <h3>{cancionActual.titulo}</h3>
        <p>{cancionActual.artista}</p>
        <p className="duracion">{cancionActual.duracion}</p>
      </div>

      <div className="botones">
        <button onClick={siguiente} disabled={esUltima}>
          Siguiente canción
        </button>
        <button onClick={reiniciar} className="secundario">
          Volver al inicio
        </button>
      </div>
      {/* el boton de siguiente se bloquea cuando llego al final
          porque el ultimo nodo apunta a null y ya no hay a donde ir */}

      {esUltima && <p className="aviso">Fin de la lista.</p>}

      <ol className="listado">
        {canciones.map((cancion, i) => (
          <li key={i} className={i === posicion ? 'activo' : ''}>
            <span>{cancion.titulo}</span>
            <span className="artista">{cancion.artista}</span>
          </li>
        ))}
      </ol>
      {/* uso aArreglo() porque React necesita un array para poder pintar la lista
          la estructura por dentro sigue siendo de nodos enlazados */}
    </section>
  )
}

export default Canciones
