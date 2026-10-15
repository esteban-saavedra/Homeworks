import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useArbol } from './ArbolContext.jsx'

function NodoArbol({ nodo, nivel, seleccionado, onSeleccionar }) {
  const { renombrar, eliminar } = useArbol()

  const [abierto, setAbierto] = useState(true)
  const [editando, setEditando] = useState(false)
  const [nombreEdit, setNombreEdit] = useState(nodo.nombre)

  const esRaiz = nodo.id === 'raiz'
  const activo = seleccionado === nodo.id

  async function guardar(evento) {
    evento.preventDefault()
    const correcto = await renombrar(nodo.id, nombreEdit)
    if (correcto) setEditando(false)
  }

  function confirmarBorrado() {
    const cantidad = nodo.cantidadHijos()
    const texto =
      cantidad > 0
        ? 'Eliminar "' + nodo.nombre + '" y todo su contenido?'
        : 'Eliminar "' + nodo.nombre + '"?'

    if (window.confirm(texto)) {
      eliminar(nodo.id)
    }
  }

  return (
    <li className="rama">
      <div
        className={activo ? 'fila activa' : 'fila'}
        style={{ paddingLeft: nivel * 1.25 + 'rem' }}
      >
        {nodo.esCarpeta() ? (
          <button
            type="button"
            className="pliegue"
            onClick={() => setAbierto(!abierto)}
            disabled={nodo.estaVacia()}
          >
            {nodo.estaVacia() ? '' : abierto ? '▾' : '▸'}
          </button>
        ) : (
          <span className="pliegue" />
        )}

        <span className={nodo.esCarpeta() ? 'icono carpeta' : 'icono archivo'}>
          {nodo.esCarpeta() ? '\u{1F4C1}' : '\u{1F4C4}'}
        </span>

        {editando ? (
          <Form className="form-renombrar" onSubmit={guardar}>
            <Form.Control
              size="sm"
              value={nombreEdit}
              onChange={(e) => setNombreEdit(e.target.value)}
              autoFocus
            />
            <Button size="sm" variant="dark" type="submit">
              Guardar
            </Button>
            <Button
              size="sm"
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setNombreEdit(nodo.nombre)
                setEditando(false)
              }}
            >
              Cancelar
            </Button>
          </Form>
        ) : (
          <>
            <button
              type="button"
              className="nombre"
              onClick={() => onSeleccionar(nodo.id)}
            >
              {nodo.nombre}
            </button>

            {nodo.esCarpeta() && !nodo.estaVacia() && (
              <span className="conteo">{nodo.cantidadHijos()}</span>
            )}

            {nodo.email && <span className="autor">{nodo.email}</span>}

            {!esRaiz && (
              <span className="acciones-nodo">
                <Button
                  size="sm"
                  variant="outline-dark"
                  onClick={() => setEditando(true)}
                >
                  Renombrar
                </Button>
                <Button size="sm" variant="outline-danger" onClick={confirmarBorrado}>
                  Eliminar
                </Button>
              </span>
            )}
          </>
        )}
      </div>

      {nodo.esCarpeta() && abierto && !nodo.estaVacia() && (
        <ul className="ramas">
          {nodo.hijos.map((hijo) => (
            <NodoArbol
              key={hijo.id}
              nodo={hijo}
              nivel={nivel + 1}
              seleccionado={seleccionado}
              onSeleccionar={onSeleccionar}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export default NodoArbol
