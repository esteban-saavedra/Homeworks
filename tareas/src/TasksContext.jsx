import { createContext, useContext, useState, useEffect } from 'react'
import { useCollection } from './useCollection.js'
import { useAuth } from './AuthContext.jsx'

const TasksContext = createContext(null)

export function TasksProvider({ children }) {
  const { usuario, estaLogueado } = useAuth()
  const { documentos, cargando, error, getAll, add, update, remove } = useCollection('tareas')

  const [aviso, setAviso] = useState('')

  useEffect(() => {
    if (estaLogueado) {
      getAll([['uid', '==', usuario.uid]])
    }
  }, [estaLogueado, usuario])

  async function recargar() {
    if (!estaLogueado) return
    await getAll([['uid', '==', usuario.uid]])
  }

  async function crear(titulo, descripcion) {
    const creado = await add({
      titulo: titulo,
      descripcion: descripcion,
      hecha: false,
      uid: usuario.uid,
      creada: Date.now(),
    })

    if (creado !== null) {
      setAviso('Tarea creada')
      await recargar()
    }

    return creado
  }

  async function editar(id, titulo, descripcion) {
    const correcto = await update(id, { titulo: titulo, descripcion: descripcion })

    if (correcto) {
      setAviso('Tarea actualizada')
      await recargar()
    }

    return correcto
  }

  async function alternar(id, hecha) {
    const correcto = await update(id, { hecha: !hecha })

    if (correcto) {
      setAviso(hecha ? 'Tarea marcada como pendiente' : 'Tarea completada')
      await recargar()
    }

    return correcto
  }

  async function eliminar(id) {
    const correcto = await remove(id)

    if (correcto) {
      setAviso('Tarea eliminada')
      await recargar()
    }

    return correcto
  }

  const ordenadas = [...documentos].sort((a, b) => b.creada - a.creada)
  const pendientes = ordenadas.filter((t) => !t.hecha)
  const completadas = ordenadas.filter((t) => t.hecha)

  const valor = {
    tareas: ordenadas,
    pendientes: pendientes,
    completadas: completadas,
    cargando: cargando,
    error: error,
    aviso: aviso,
    limpiarAviso: () => setAviso(''),
    crear: crear,
    editar: editar,
    alternar: alternar,
    eliminar: eliminar,
    recargar: recargar,
  }

  return <TasksContext.Provider value={valor}>{children}</TasksContext.Provider>
}

export function useTasks() {
  const contexto = useContext(TasksContext)

  if (contexto === null) {
    throw new Error('useTasks debe usarse dentro de TasksProvider')
  }

  return contexto
}
