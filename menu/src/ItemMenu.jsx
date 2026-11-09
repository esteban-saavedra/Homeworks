import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { arbolMenu } from './menu.js'

function ItemMenu({ nodo, nivel }) {
  const ubicacion = useLocation()
  const contieneActivo = arbolMenu.contieneEnlace(nodo, ubicacion.pathname)

  const [abierto, setAbierto] = useState(contieneActivo)

  useEffect(() => {
    if (contieneActivo) setAbierto(true)
  }, [contieneActivo])

  const sangria = { paddingLeft: 0.9 + nivel * 0.9 + 'rem' }

  if (nodo.esGrupo() && !nodo.esNavegable()) {
    return (
      <li className="item">
        <button
          type="button"
          className={abierto ? 'grupo abierto' : 'grupo'}
          style={sangria}
          onClick={() => setAbierto(!abierto)}
        >
          {nodo.icono && <span className="icono">{nodo.icono}</span>}
          <span className="titulo">{nodo.titulo}</span>
          <span className="flecha">{abierto ? '▴' : '▾'}</span>
        </button>

        {abierto && (
          <ul className="rama">
            {nodo.hijos.map((hijo) => (
              <ItemMenu key={hijo.id} nodo={hijo} nivel={nivel + 1} />
            ))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <li className="item">
      <div className="fila">
        <NavLink to={nodo.enlace} className="enlace" style={sangria}>
          {nodo.icono && <span className="icono">{nodo.icono}</span>}
          <span className="titulo">{nodo.titulo}</span>
        </NavLink>

        {nodo.esGrupo() && (
          <button
            type="button"
            className="desplegar"
            onClick={() => setAbierto(!abierto)}
          >
            {abierto ? '▴' : '▾'}
          </button>
        )}
      </div>

      {nodo.esGrupo() && abierto && (
        <ul className="rama">
          {nodo.hijos.map((hijo) => (
            <ItemMenu key={hijo.id} nodo={hijo} nivel={nivel + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

export default ItemMenu
