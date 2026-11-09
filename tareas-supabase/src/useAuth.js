import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient.js'

const MENSAJES = {
  'Invalid login credentials': 'Correo o contrasena incorrectos.',
  'User already registered': 'Ya existe una cuenta con ese correo.',
  'Password should be at least 6 characters.':
    'La contrasena debe tener al menos 6 caracteres.',
  'Unable to validate email address: invalid format':
    'El correo no tiene un formato valido.',
  'Email rate limit exceeded': 'Demasiados intentos. Espera un momento.',
}

function traducir(mensaje) {
  return MENSAJES[mensaje] || mensaje || 'Ocurrio un error inesperado.'
}

export function useAuth() {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUsuario(data.session ? data.session.user : null)
      setCargando(false)
    })

    const { data: escucha } = supabase.auth.onAuthStateChange((evento, sesion) => {
      setUsuario(sesion ? sesion.user : null)
      setCargando(false)
    })

    return () => escucha.subscription.unsubscribe()
  }, [])

  async function login(email, password) {
    setError('')

    const { error: fallo } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    })

    if (fallo) {
      setError(traducir(fallo.message))
      return false
    }

    return true
  }

  async function registrar(email, password) {
    setError('')

    const { data, error: fallo } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
    })

    if (fallo) {
      setError(traducir(fallo.message))
      return false
    }

    if (data.session === null) {
      setError('Revisa tu correo para confirmar la cuenta antes de entrar.')
      return false
    }

    return true
  }

  async function logout() {
    setError('')

    const { error: fallo } = await supabase.auth.signOut()

    if (fallo) {
      setError(traducir(fallo.message))
      return false
    }

    return true
  }

  return {
    usuario: usuario,
    cargando: cargando,
    error: error,
    estaLogueado: usuario !== null,
    login: login,
    registrar: registrar,
    logout: logout,
    limpiarError: () => setError(''),
  }
}
