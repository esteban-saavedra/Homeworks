import { useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Alert, Badge, Spinner } from 'react-bootstrap'
import { useTasks } from './TasksContext.jsx'

function Tareas() {
  const {
    tareas,
    pendientes,
    completadas,
    cargando,
    error,
    aviso,
    limpiarAviso,
    crear,
    editar,
    alternar,
    eliminar,
  } = useTasks()

  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [validacion, setValidacion] = useState('')

  const [editando, setEditando] = useState(null)
  const [tituloEdit, setTituloEdit] = useState('')
  const [descripcionEdit, setDescripcionEdit] = useState('')

  async function enviar(evento) {
    evento.preventDefault()

    if (titulo.trim() === '') {
      setValidacion('La tarea necesita un titulo.')
      return
    }

    setValidacion('')
    await crear(titulo.trim(), descripcion.trim())
    setTitulo('')
    setDescripcion('')
  }

  function abrirEdicion(tarea) {
    setEditando(tarea.id)
    setTituloEdit(tarea.titulo)
    setDescripcionEdit(tarea.descripcion || '')
  }

  async function guardarEdicion(id) {
    if (tituloEdit.trim() === '') return

    await editar(id, tituloEdit.trim(), descripcionEdit.trim())
    setEditando(null)
  }

  function pintarTarea(tarea) {
    if (editando === tarea.id) {
      return (
        <Card key={tarea.id} className="tarjeta-tarea editando">
          <Card.Body>
            <Form.Control
              className="mb-2"
              value={tituloEdit}
              onChange={(e) => setTituloEdit(e.target.value)}
            />
            <Form.Control
              className="mb-3"
              as="textarea"
              rows={2}
              value={descripcionEdit}
              onChange={(e) => setDescripcionEdit(e.target.value)}
            />
            <div className="acciones">
              <Button size="sm" variant="dark" onClick={() => guardarEdicion(tarea.id)}>
                Guardar
              </Button>
              <Button size="sm" variant="outline-secondary" onClick={() => setEditando(null)}>
                Cancelar
              </Button>
            </div>
          </Card.Body>
        </Card>
      )
    }

    return (
      <Card key={tarea.id} className={tarea.hecha ? 'tarjeta-tarea hecha' : 'tarjeta-tarea'}>
        <Card.Body>
          <div className="encabezado-tarea">
            <Form.Check
              type="checkbox"
              checked={tarea.hecha}
              onChange={() => alternar(tarea.id, tarea.hecha)}
              label={tarea.titulo}
            />
            <Badge bg={tarea.hecha ? 'success' : 'secondary'}>
              {tarea.hecha ? 'Hecha' : 'Pendiente'}
            </Badge>
          </div>

          {tarea.descripcion && <p className="descripcion-tarea">{tarea.descripcion}</p>}

          <div className="acciones">
            <Button size="sm" variant="outline-dark" onClick={() => abrirEdicion(tarea)}>
              Editar
            </Button>
            <Button size="sm" variant="outline-danger" onClick={() => eliminar(tarea.id)}>
              Eliminar
            </Button>
          </div>
        </Card.Body>
      </Card>
    )
  }

  return (
    <Container className="contenedor-tareas">
      <header className="cabecera-tareas">
        <h1>Mis tareas</h1>
        <p>
          {pendientes.length} pendiente(s) y {completadas.length} completada(s)
        </p>
      </header>

      {error && <Alert variant="danger">{error}</Alert>}

      {aviso && (
        <Alert variant="success" onClose={limpiarAviso} dismissible>
          {aviso}
        </Alert>
      )}

      <Row>
        <Col lg={4} className="mb-4">
          <Card className="tarjeta-formulario">
            <Card.Body>
              <h2 className="titulo-seccion">Nueva tarea</h2>

              <Form onSubmit={enviar}>
                <Form.Group className="mb-3">
                  <Form.Label>Titulo</Form.Label>
                  <Form.Control
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Ej: Estudiar para el parcial"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Descripcion</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Opcional"
                  />
                </Form.Group>

                {validacion && <p className="texto-error">{validacion}</p>}

                <Button type="submit" variant="dark" className="w-100">
                  Agregar tarea
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          {cargando && (
            <div className="cargando">
              <Spinner animation="border" size="sm" /> Cargando tareas...
            </div>
          )}

          {!cargando && tareas.length === 0 && (
            <Card className="tarjeta-vacia">
              <Card.Body>Todavia no tienes tareas. Crea la primera.</Card.Body>
            </Card>
          )}

          {pendientes.length > 0 && (
            <>
              <h2 className="titulo-seccion">Pendientes</h2>
              {pendientes.map(pintarTarea)}
            </>
          )}

          {completadas.length > 0 && (
            <>
              <h2 className="titulo-seccion mt-4">Completadas</h2>
              {completadas.map(pintarTarea)}
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Tareas
