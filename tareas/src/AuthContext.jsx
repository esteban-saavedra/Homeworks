import { createContext, useContext } from 'react'
import { useFirebaseAuth } from './useFirebaseAuth.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const auth = useFirebaseAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const contexto = useContext(AuthContext)

  if (contexto === null) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }

  return contexto
}
