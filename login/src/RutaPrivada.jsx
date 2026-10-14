import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext.jsx'

function RutaPrivada({ children }) {
  const { estaLogueado } = useAuth()

  if (!estaLogueado) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default RutaPrivada
