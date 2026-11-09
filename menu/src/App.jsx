import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { arbolMenu } from './menu.js'
import Sidebar from './Sidebar.jsx'

function Migas() {
  const ubicacion = useLocation()
  const camino = arbolMenu.ruta(ubicacion.pathname)

  if (camino.length === 0) return null

  return (
    <nav className="migas">
      {camino.map((nodo, i) => (
        <span key={nodo.id}>
          {i > 0 && <span className="separador">/</span>}
          <span className={i === camino.length - 1 ? 'actual' : ''}>
            {nodo.titulo}
          </span>
        </span>
      ))}
    </nav>
  )
}

function App() {
  const rutas = arbolMenu.rutasPlanas()
  const inicio = arbolMenu.primerEnlace()

  return (
    <div className="aplicacion">
      <Sidebar />

      <main className="contenido">
        <Migas />

        <Routes>
          {rutas.map((ruta) => {
            const Componente = ruta.componente
            return (
              <Route key={ruta.enlace} path={ruta.enlace} element={<Componente />} />
            )
          })}

          <Route path="*" element={<Navigate to={inicio} replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
