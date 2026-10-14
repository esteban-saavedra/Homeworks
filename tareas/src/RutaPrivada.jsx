import { Navigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { useAuth } from './AuthContext.jsx'

function RutaPrivada({ children }) {
  const { estaLogueado, cargando } = useAuth()

  if (cargando) {
    return (
      <div className="pantalla-centrada">
        <Spinner animation="border" />
      </div>
    )
  }

  if (!estaLogueado) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default RutaPrivada
