import { createContext, useContext, useState, useEffect } from 'react'
import { useCollection } from './useCollection.js'
import { useAuth } from './AuthContext.jsx'
import { ArbolNario, CARPETA, ARCHIVO } from './ArbolNario.js'

const ArbolContext = createContext(null)

export function ArbolProvider({ children }) {
  const { usuario, estaLogueado } = useAuth()
  const { documentos, cargando, error, getAll, add, update, remove } = useCollection('nodos')

  const [arbol, setArbol] = useState(new ArbolNario())
  const [aviso, setAviso] = useState('')
  const [fallo, setFallo] = useState('')

  useEffect(() => {
    if (estaLogueado) {
      getAll([['uid', '==', usuario.uid]])
    } else {
      setArbol(new ArbolNario())
    }
  }, [estaLogueado, usuario])

  useEffect(() => {
    setArbol(ArbolNario.desdeLista(documentos))
  }, [documentos])

  async function recargar() {
    if (!estaLogueado) return
    await getAll([['uid', '==', usuario.uid]])
  }

  async function crear(padreId, nombre, tipo) {
    setFallo('')

    if (!estaLogueado) {
      setFallo('Debes iniciar sesion para crear elementos.')
      return false
    }

    const limpio = nombre.trim()

    if (limpio === '') {
      setFallo('Escribe un nombre.')
      return false
    }

    const padre = arbol.buscar(padreId)

    if (padre === null) {
      setFallo('No existe la carpeta destino.')
      return false
    }

    if (!padre.aceptaHijos()) {
      setFallo('Un archivo no puede contener elementos.')
      return false
    }

    const repetido = padre.hijos.some(
      (h) => h.nombre.toLowerCase() === limpio.toLowerCase()
    )

    if (repetido) {
      setFallo('Ya existe un elemento con ese nombre en esta carpeta.')
      return false
    }

    const creado = await add({
      nombre: limpio,
      tipo: tipo,
      padreId: padreId,
      email: usuario.email,
      uid: usuario.uid,
      creado: Date.now(),
    })

    if (creado === null) return false

    setAviso(
      (tipo === CARPETA ? 'Carpeta' : 'Archivo') + ' "' + limpio + '" creado en ' + padre.nombre
    )
    await recargar()
    return true
  }

  async function renombrar(id, nombreNuevo) {
    setFallo('')

    const limpio = nombreNuevo.trim()

    if (limpio === '') {
      setFallo('El nombre no puede quedar vacio.')
      return false
    }

    const nodo = arbol.buscar(id)

    if (nodo === null) return false

    const padre = arbol.buscar(nodo.padreId)

    const repetido = padre.hijos.some(
      (h) => h.id !== id && h.nombre.toLowerCase() === limpio.toLowerCase()
    )

    if (repetido) {
      setFallo('Ya existe un elemento con ese nombre en esta carpeta.')
      return false
    }

    const correcto = await update(id, { nombre: limpio })

    if (correcto) {
      setAviso('Elemento renombrado a "' + limpio + '"')
      await recargar()
    }

    return correcto
  }

  async function eliminar(id) {
    setFallo('')

    const nodo = arbol.buscar(id)

    if (nodo === null) return false

    const hijos = arbol.descendientes(id)

    for (const hijo of hijos) {
      await remove(hijo.id)
    }

    const correcto = await remove(id)

    if (correcto) {
      const extra = hijos.length > 0 ? ' y sus ' + hijos.length + ' elemento(s)' : ''
      setAviso('Se elimino "' + nodo.nombre + '"' + extra)
      await recargar()
    }

    return correcto
  }

  const valor = {
    arbol: arbol,
    raiz: arbol.raiz,
    conteo: arbol.contar(),
    altura: arbol.altura(),
    cargando: cargando,
    error: error || fallo,
    aviso: aviso,
    limpiarAviso: () => setAviso(''),
    limpiarFallo: () => setFallo(''),
    crear: crear,
    renombrar: renombrar,
    eliminar: eliminar,
    recargar: recargar,
    CARPETA: CARPETA,
    ARCHIVO: ARCHIVO,
  }

  return <ArbolContext.Provider value={valor}>{children}</ArbolContext.Provider>
}

export function useArbol() {
  const contexto = useContext(ArbolContext)

  if (contexto === null) {
    throw new Error('useArbol debe usarse dentro de ArbolProvider')
  }

  return contexto
}
