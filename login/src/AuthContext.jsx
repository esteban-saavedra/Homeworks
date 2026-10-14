import { createContext, useContext, useState } from 'react'

const EMAIL_VALIDO = 'user@mail.com'
const PASSWORD_VALIDO = '123'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)

  function login(email, password) {
    if (email.trim().toLowerCase() === EMAIL_VALIDO && password === PASSWORD_VALIDO) {
      setUsuario({
        email: EMAIL_VALIDO,
        nombre: EMAIL_VALIDO.split('@')[0],
      })
      return true
    }
    return false
  }

  function logout() {
    setUsuario(null)
  }

  const valor = {
    usuario: usuario,
    estaLogueado: usuario !== null,
    login: login,
    logout: logout,
  }

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const contexto = useContext(AuthContext)

  if (contexto === null) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }

  return contexto
}
