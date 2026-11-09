import { arbolMenu } from './menu.js'
import ItemMenu from './ItemMenu.jsx'

function Sidebar() {
  const conteo = arbolMenu.contar()

  return (
    <aside className="sidebar">
      <div className="marca">
        <span className="logo">{arbolMenu.raiz.titulo}</span>
        <span className="sub">
          {conteo.total} opciones, {arbolMenu.profundidad()} niveles
        </span>
      </div>

      <nav>
        <ul className="rama raiz">
          {arbolMenu.raiz.hijos.map((hijo) => (
            <ItemMenu key={hijo.id} nodo={hijo} nivel={0} />
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
