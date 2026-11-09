import { Navigate } from 'react-router-dom'
import { useSesion } from './AuthContext.jsx'

function RutaPrivada({ children }) {
  const { estaLogueado, cargando } = useSesion()

  if (cargando) {
    return <div className="pantalla-centrada">Cargando...</div>
  }

  if (!estaLogueado) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default RutaPrivada
