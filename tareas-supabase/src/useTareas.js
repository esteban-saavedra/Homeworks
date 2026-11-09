import { useState, useEffect, useCallback } from 'react'
import { supabase } from './supabaseClient.js'
import { useSesion } from './AuthContext.jsx'

export function useTareas() {
  const { usuario, estaLogueado } = useSesion()

  const [tareas, setTareas] = useState([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')
  const [enVivo, setEnVivo] = useState(false)

  const cargar = useCallback(async () => {
    if (!estaLogueado) {
      setTareas([])
      return
    }

    setCargando(true)
    setError('')

    const { data, error: fallo } = await supabase
      .from('tareas')
      .select('*')
      .order('creada', { ascending: false })

    if (fallo) {
      setError('No se pudieron cargar las tareas: ' + fallo.message)
    } else {
      setTareas(data)
    }

    setCargando(false)
  }, [estaLogueado])

  useEffect(() => {
    cargar()
  }, [cargar])

  useEffect(() => {
    if (!estaLogueado) {
      setEnVivo(false)
      return
    }

    const canal = supabase
      .channel('tareas-en-vivo')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tareas',
          filter: 'user_id=eq.' + usuario.id,
        },
        (cambio) => {
          if (cambio.eventType === 'INSERT') {
            setTareas((previas) => {
              if (previas.some((t) => t.id === cambio.new.id)) return previas
              return [cambio.new, ...previas]
            })
          }

          if (cambio.eventType === 'UPDATE') {
            setTareas((previas) =>
              previas.map((t) => (t.id === cambio.new.id ? cambio.new : t))
            )
          }

          if (cambio.eventType === 'DELETE') {
            setTareas((previas) => previas.filter((t) => t.id !== cambio.old.id))
          }
        }
      )
      .subscribe((estado) => {
        setEnVivo(estado === 'SUBSCRIBED')
      })

    return () => {
      supabase.removeChannel(canal)
    }
  }, [estaLogueado, usuario])

  async function crear(titulo, descripcion) {
    setError('')

    const { error: fallo } = await supabase.from('tareas').insert({
      titulo: titulo,
      descripcion: descripcion,
      user_id: usuario.id,
    })

    if (fallo) {
      setError('No se pudo crear: ' + fallo.message)
      return false
    }

    return true
  }

  async function editar(id, titulo, descripcion) {
    setError('')

    const { error: fallo } = await supabase
      .from('tareas')
      .update({ titulo: titulo, descripcion: descripcion })
      .eq('id', id)

    if (fallo) {
      setError('No se pudo actualizar: ' + fallo.message)
      return false
    }

    return true
  }

  async function alternar(id, hecha) {
    setError('')

    const { error: fallo } = await supabase
      .from('tareas')
      .update({ hecha: !hecha })
      .eq('id', id)

    if (fallo) {
      setError('No se pudo actualizar: ' + fallo.message)
      return false
    }

    return true
  }

  async function eliminar(id) {
    setError('')

    const { error: fallo } = await supabase.from('tareas').delete().eq('id', id)

    if (fallo) {
      setError('No se pudo eliminar: ' + fallo.message)
      return false
    }

    return true
  }

  const pendientes = tareas.filter((t) => !t.hecha)
  const completadas = tareas.filter((t) => t.hecha)

  return {
    tareas: tareas,
    pendientes: pendientes,
    completadas: completadas,
    cargando: cargando,
    error: error,
    enVivo: enVivo,
    limpiarError: () => setError(''),
    crear: crear,
    editar: editar,
    alternar: alternar,
    eliminar: eliminar,
    recargar: cargar,
  }
}
