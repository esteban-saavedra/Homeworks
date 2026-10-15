import { useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { useArbol } from './ArbolContext.jsx'
import NodoArbol from './NodoArbol.jsx'

function Explorador() {
  const {
    arbol,
    raiz,
    conteo,
    altura,
    cargando,
    error,
    aviso,
    limpiarAviso,
    limpiarFallo,
    crear,
    CARPETA,
    ARCHIVO,
  } = useArbol()

  const [seleccionado, setSeleccionado] = useState('raiz')
  const [nombre, setNombre] = useState('')
  const [tipo, setTipo] = useState(CARPETA)
  const [enviando, setEnviando] = useState(false)

  const destino = arbol.buscar(seleccionado) || raiz
  const ruta = arbol.ruta(destino.id)
  const puedeCrear = destino.aceptaHijos()

  async function enviar(evento) {
    evento.preventDefault()
    setEnviando(true)

    const correcto = await crear(destino.id, nombre, tipo)

    setEnviando(false)

    if (correcto) setNombre('')
  }

  return (
    <Container className="contenedor-arbol">
      <header className="cabecera-arbol">
        <h1>Explorador de archivos</h1>
        <p>
          {conteo.carpetas} carpeta(s), {conteo.archivos} archivo(s), profundidad {altura}
        </p>
      </header>

      {error && (
        <Alert variant="danger" onClose={limpiarFallo} dismissible>
          {error}
        </Alert>
      )}

      {aviso && (
        <Alert variant="success" onClose={limpiarAviso} dismissible>
          {aviso}
        </Alert>
      )}

      <Row>
        <Col lg={4} className="mb-4">
          <Card className="panel-crear">
            <Card.Body>
              <h2 className="titulo-seccion">Crear elemento</h2>

              <div className="destino">
                <span className="etiqueta">Se creara dentro de</span>
                <div className="ruta">
                  {ruta.map((n, i) => (
                    <span key={n.id}>
                      {i > 0 && <span className="separador">/</span>}
                      <span className={i === ruta.length - 1 ? 'actual' : ''}>{n.nombre}</span>
                    </span>
                  ))}
                </div>
                {!puedeCrear && (
                  <p className="advertencia">
                    Seleccionaste un archivo. Los archivos no pueden contener elementos.
                  </p>
                )}
              </div>

              <Form onSubmit={enviar}>
                <Form.Group className="mb-3">
                  <Form.Label>Tipo</Form.Label>
                  <div className="opciones-tipo">
                    <Form.Check
                      type="radio"
                      id="tipo-carpeta"
                      label="Carpeta"
                      checked={tipo === CARPETA}
                      onChange={() => setTipo(CARPETA)}
                    />
                    <Form.Check
                      type="radio"
                      id="tipo-archivo"
                      label="Archivo"
                      checked={tipo === ARCHIVO}
                      onChange={() => setTipo(ARCHIVO)}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder={tipo === CARPETA ? 'Ej: Documentos' : 'Ej: informe.pdf'}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="dark"
                  className="w-100"
                  disabled={!puedeCrear || enviando}
                >
                  {enviando ? 'Guardando...' : 'Crear'}
                </Button>
              </Form>

              <Button
                variant="outline-secondary"
                size="sm"
                className="w-100 mt-2"
                onClick={() => setSeleccionado('raiz')}
              >
                Volver a la raiz
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="panel-arbol">
            <Card.Body>
              <div className="cabecera-panel">
                <h2 className="titulo-seccion">Estructura</h2>
                <span className="tipo-estructura">Arbol n-ario</span>
              </div>

              {cargando && (
                <div className="cargando">
                  <Spinner animation="border" size="sm" /> Cargando estructura...
                </div>
              )}

              <ul className="ramas raiz-lista">
                <NodoArbol
                  nodo={raiz}
                  nivel={0}
                  seleccionado={seleccionado}
                  onSeleccionar={setSeleccionado}
                />
              </ul>

              {raiz.estaVacia() && !cargando && (
                <p className="vacio">
                  Todavia no hay nada. Crea tu primera carpeta desde el panel de la izquierda.
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Explorador
