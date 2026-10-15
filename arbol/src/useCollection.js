import { useState } from 'react'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
} from 'firebase/firestore'
import { db } from './config.js'

export function useCollection(nombreColeccion) {
  const [documentos, setDocumentos] = useState([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  const referencia = collection(db, nombreColeccion)

  async function getAll(filtros = [], orden = null) {
    setCargando(true)
    setError('')

    try {
      const condiciones = filtros.map((f) => where(f[0], f[1], f[2]))

      if (orden !== null) {
        condiciones.push(orderBy(orden[0], orden[1]))
      }

      const consulta = condiciones.length > 0
        ? query(referencia, ...condiciones)
        : referencia

      const resultado = await getDocs(consulta)
      const lista = resultado.docs.map((d) => ({ id: d.id, ...d.data() }))

      setDocumentos(lista)
      return lista
    } catch (fallo) {
      setError('No se pudieron cargar los datos: ' + fallo.message)
      return []
    } finally {
      setCargando(false)
    }
  }

  async function add(datos) {
    setError('')

    try {
      const creado = await addDoc(referencia, datos)
      return creado.id
    } catch (fallo) {
      setError('No se pudo guardar: ' + fallo.message)
      return null
    }
  }

  async function update(id, datos) {
    setError('')

    try {
      await updateDoc(doc(db, nombreColeccion, id), datos)
      return true
    } catch (fallo) {
      setError('No se pudo actualizar: ' + fallo.message)
      return false
    }
  }

  async function remove(id) {
    setError('')

    try {
      await deleteDoc(doc(db, nombreColeccion, id))
      return true
    } catch (fallo) {
      setError('No se pudo eliminar: ' + fallo.message)
      return false
    }
  }

  return {
    documentos: documentos,
    cargando: cargando,
    error: error,
    getAll: getAll,
    add: add,
    update: update,
    remove: remove,
  }
}
