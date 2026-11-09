import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient.js'
import { useSesion } from './AuthContext.jsx'

const BUCKET = 'avatars'
const TIPOS = ['image/png', 'image/jpeg', 'image/webp']
const MAXIMO = 2 * 1024 * 1024

export function useAvatar() {
  const { usuario, estaLogueado } = useSesion()

  const [url, setUrl] = useState(null)
  const [subiendo, setSubiendo] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!estaLogueado) {
      setUrl(null)
      return
    }

    buscarExistente()
  }, [estaLogueado, usuario])

  async function buscarExistente() {
    const { data, error: fallo } = await supabase.storage
      .from(BUCKET)
      .list(usuario.id, { limit: 1, sortBy: { column: 'created_at', order: 'desc' } })

    if (fallo || !data || data.length === 0) {
      setUrl(null)
      return
    }

    const ruta = usuario.id + '/' + data[0].name
    const { data: publico } = supabase.storage.from(BUCKET).getPublicUrl(ruta)

    setUrl(publico.publicUrl + '?v=' + Date.now())
  }

  async function subir(archivo) {
    setError('')

    if (!archivo) return false

    if (!TIPOS.includes(archivo.type)) {
      setError('Solo se aceptan imagenes PNG, JPG o WEBP.')
      return false
    }

    if (archivo.size > MAXIMO) {
      setError('La imagen no puede pesar mas de 2 MB.')
      return false
    }

    setSubiendo(true)

    const extension = archivo.name.split('.').pop().toLowerCase()
    const ruta = usuario.id + '/avatar.' + extension

    const { error: fallo } = await supabase.storage
      .from(BUCKET)
      .upload(ruta, archivo, { upsert: true })

    setSubiendo(false)

    if (fallo) {
      setError('No se pudo subir la imagen: ' + fallo.message)
      return false
    }

    const { data: publico } = supabase.storage.from(BUCKET).getPublicUrl(ruta)
    setUrl(publico.publicUrl + '?v=' + Date.now())

    return true
  }

  return {
    url: url,
    subiendo: subiendo,
    error: error,
    limpiarError: () => setError(''),
    subir: subir,
  }
}
