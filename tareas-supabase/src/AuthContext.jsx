import { createContext, useContext } from 'react'
import { useAuth } from './useAuth.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const auth = useAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useSesion() {
  const contexto = useContext(AuthContext)

  if (contexto === null) {
    throw new Error('useSesion debe usarse dentro de AuthProvider')
  }

  return contexto
}
