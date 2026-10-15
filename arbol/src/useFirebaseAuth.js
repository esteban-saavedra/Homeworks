import { useState, useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from './config.js'

const MENSAJES = {
  'auth/invalid-email': 'El correo no tiene un formato valido.',
  'auth/missing-password': 'Escribe la contrasena.',
  'auth/invalid-credential': 'Correo o contrasena incorrectos.',
  'auth/user-not-found': 'No existe una cuenta con ese correo.',
  'auth/wrong-password': 'Correo o contrasena incorrectos.',
  'auth/email-already-in-use': 'Ya existe una cuenta con ese correo.',
  'auth/weak-password': 'La contrasena debe tener al menos 6 caracteres.',
  'auth/too-many-requests': 'Demasiados intentos. Espera un momento.',
  'auth/network-request-failed': 'Sin conexion con Firebase.',
}

function traducir(codigo) {
  return MENSAJES[codigo] || 'Ocurrio un error inesperado.'
}

export function useFirebaseAuth() {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const cancelar = onAuthStateChanged(auth, (cuenta) => {
      setUsuario(cuenta)
      setCargando(false)
    })

    return () => cancelar()
  }, [])

  async function login(email, password) {
    setError('')

    try {
      await signInWithEmailAndPassword(auth, email, password)
      return true
    } catch (fallo) {
      setError(traducir(fallo.code))
      return false
    }
  }

  async function registrar(email, password) {
    setError('')

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      return true
    } catch (fallo) {
      setError(traducir(fallo.code))
      return false
    }
  }

  async function logout() {
    setError('')

    try {
      await signOut(auth)
      return true
    } catch (fallo) {
      setError(traducir(fallo.code))
      return false
    }
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
