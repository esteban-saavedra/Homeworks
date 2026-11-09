export const PERSONA = 'persona'
export const CIUDAD = 'ciudad'
export const VIVE_EN = 'vive_en'
export const AMISTAD = 'amistad'

export class Nodo {
  constructor(datos) {
    this.id = datos.id
    this.tipo = datos.tipo
    this.nombre = datos.nombre
    this.edad = datos.edad || null
  }

  esPersona() {
    return this.tipo === PERSONA
  }

  esCiudad() {
    return this.tipo === CIUDAD
  }
}

export class Arista {
  constructor(origen, destino, tipo) {
    this.origen = origen
    this.destino = destino
    this.tipo = tipo
  }

  conecta(id) {
    return this.origen === id || this.destino === id
  }

  otroExtremo(id) {
    if (this.origen === id) return this.destino
    if (this.destino === id) return this.origen
    return null
  }
}

export class Grafo {
  constructor() {
    this.nodos = new Map()
    this.adyacencia = new Map()
    this.aristas = []
  }

  agregarNodo(datos) {
    if (this.nodos.has(datos.id)) {
      throw new Error('Ya existe un nodo con el id ' + datos.id)
    }

    this.nodos.set(datos.id, new Nodo(datos))
    this.adyacencia.set(datos.id, [])

    return this.nodos.get(datos.id)
  }

  agregarPersona(id, nombre, edad, ciudadId) {
    const ciudad = this.obtener(ciudadId)

    if (ciudad === null || !ciudad.esCiudad()) {
      throw new Error('La ciudad indicada no existe')
    }

    const persona = this.agregarNodo({
      id: id,
      tipo: PERSONA,
      nombre: nombre,
      edad: edad,
    })

    this.conectar(id, ciudadId, VIVE_EN)

    return persona
  }

  agregarCiudad(id, nombre) {
    return this.agregarNodo({ id: id, tipo: CIUDAD, nombre: nombre })
  }

  conectar(origen, destino, tipo) {
    if (!this.nodos.has(origen) || !this.nodos.has(destino)) {
      throw new Error('Alguno de los nodos no existe')
    }

    if (origen === destino) {
      throw new Error('Un nodo no se puede conectar consigo mismo')
    }

    if (this.existeArista(origen, destino)) {
      return null
    }

    const arista = new Arista(origen, destino, tipo)

    this.aristas.push(arista)
    this.adyacencia.get(origen).push(destino)
    this.adyacencia.get(destino).push(origen)

    return arista
  }

  conectarAmigos(unoId, otroId) {
    return this.conectar(unoId, otroId, AMISTAD)
  }

  existeArista(origen, destino) {
    return this.aristas.some(
      (a) =>
        (a.origen === origen && a.destino === destino) ||
        (a.origen === destino && a.destino === origen)
    )
  }

  obtener(id) {
    return this.nodos.has(id) ? this.nodos.get(id) : null
  }

  vecinos(id) {
    if (!this.adyacencia.has(id)) return []

    return this.adyacencia.get(id).map((vecino) => this.obtener(vecino))
  }

  personasEnCiudad(ciudadId) {
    return this.aristas
      .filter((a) => a.tipo === VIVE_EN && a.destino === ciudadId)
      .map((a) => this.obtener(a.origen))
      .sort((a, b) => a.nombre.localeCompare(b.nombre))
  }

  ciudadDe(personaId) {
    const arista = this.aristas.find(
      (a) => a.tipo === VIVE_EN && a.origen === personaId
    )

    return arista ? this.obtener(arista.destino) : null
  }

  amigosDe(personaId) {
    return this.aristas
      .filter((a) => a.tipo === AMISTAD && a.conecta(personaId))
      .map((a) => this.obtener(a.otroExtremo(personaId)))
      .sort((a, b) => a.nombre.localeCompare(b.nombre))
  }

  personas() {
    return [...this.nodos.values()]
      .filter((n) => n.esPersona())
      .sort((a, b) => a.nombre.localeCompare(b.nombre))
  }

  ciudades() {
    return [...this.nodos.values()]
      .filter((n) => n.esCiudad())
      .sort((a, b) => a.nombre.localeCompare(b.nombre))
  }

  recorrerAnchura(desdeId) {
    if (!this.nodos.has(desdeId)) return []

    const visitados = new Set([desdeId])
    const cola = [desdeId]
    const orden = []

    while (cola.length > 0) {
      const actual = cola.shift()
      orden.push(this.obtener(actual))

      for (const vecino of this.adyacencia.get(actual)) {
        if (!visitados.has(vecino)) {
          visitados.add(vecino)
          cola.push(vecino)
        }
      }
    }

    return orden
  }

  caminoEntre(origenId, destinoId) {
    if (!this.nodos.has(origenId) || !this.nodos.has(destinoId)) return []

    const previos = new Map([[origenId, null]])
    const cola = [origenId]

    while (cola.length > 0) {
      const actual = cola.shift()

      if (actual === destinoId) break

      for (const vecino of this.adyacencia.get(actual)) {
        if (!previos.has(vecino)) {
          previos.set(vecino, actual)
          cola.push(vecino)
        }
      }
    }

    if (!previos.has(destinoId)) return []

    const camino = []
    let paso = destinoId

    while (paso !== null) {
      camino.unshift(this.obtener(paso))
      paso = previos.get(paso)
    }

    return camino
  }

  gradoDe(id) {
    return this.adyacencia.has(id) ? this.adyacencia.get(id).length : 0
  }

  contar() {
    return {
      personas: this.personas().length,
      ciudades: this.ciudades().length,
      amistades: this.aristas.filter((a) => a.tipo === AMISTAD).length,
      residencias: this.aristas.filter((a) => a.tipo === VIVE_EN).length,
    }
  }

  aFormatoD3(colores) {
    const nodes = [...this.nodos.values()].map((nodo) => ({
      id: nodo.id,
      nombre: nodo.nombre,
      tipo: nodo.tipo,
      color: nodo.esCiudad() ? colores.ciudad : colores.persona,
      size: nodo.esCiudad() ? 520 : 300,
      symbolType: nodo.esCiudad() ? 'square' : 'circle',
    }))

    const links = this.aristas.map((arista) => ({
      source: arista.origen,
      target: arista.destino,
      color: arista.tipo === AMISTAD ? colores.amistad : colores.residencia,
      strokeWidth: arista.tipo === AMISTAD ? 1.4 : 2.2,
    }))

    return { nodes: nodes, links: links }
  }
}
