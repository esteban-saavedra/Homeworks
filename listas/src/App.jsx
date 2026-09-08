import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import Canciones from './paginas/Canciones.jsx'
import Navegador from './paginas/Navegador.jsx'

// este componente ya no muestra contenido directamente
// solo dice que pagina se ve segun la direccion en la que este el navegador
function App() {
  return (
    <div className="app">
      <header className="barra">
        <h1>Challenge 03</h1>

        <nav>
          <NavLink to="/canciones">Reproductor</NavLink>
          <NavLink to="/navegador">Historial</NavLink>
        </nav>
        {/* NavLink es como un link normal pero ademas sabe cual esta activo
            por eso se le puede pintar diferente al que estoy viendo */}
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/canciones" />} />
          <Route path="/canciones" element={<Canciones />} />
          <Route path="/navegador" element={<Navegador />} />
        </Routes>
        {/* cada Route conecta una direccion con una pagina
            el primero es para que si entro a la raiz me mande directo al reproductor */}
      </main>
    </div>
  )
}

export default App
