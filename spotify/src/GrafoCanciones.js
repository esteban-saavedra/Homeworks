export class GrafoCanciones {
  constructor() {
    this.adyacencia = new Map()
  }

  agregarCancion(titulo) {
    if (!this.adyacencia.has(titulo)) {
      this.adyacencia.set(titulo, new Set())
    }

    return this.adyacencia.get(titulo)
  }

  conectar(unaCancion, otraCancion) {
    if (unaCancion === otraCancion) {
      throw new Error('Una cancion no se relaciona consigo misma')
    }

    this.agregarCancion(unaCancion)
    this.agregarCancion(otraCancion)

    this.adyacencia.get(unaCancion).add(otraCancion)
    this.adyacencia.get(otraCancion).add(unaCancion)

    return true
  }

  desconectar(unaCancion, otraCancion) {
    if (!this.adyacencia.has(unaCancion) || !this.adyacencia.has(otraCancion)) {
      return false
    }

    this.adyacencia.get(unaCancion).delete(otraCancion)
    this.adyacencia.get(otraCancion).delete(unaCancion)

    return true
  }

  estanConectadas(unaCancion, otraCancion) {
    if (!this.adyacencia.has(unaCancion)) return false

    return this.adyacencia.get(unaCancion).has(otraCancion)
  }

  relacionadas(titulo) {
    if (!this.adyacencia.has(titulo)) return []

    return [...this.adyacencia.get(titulo)].sort()
  }

  grado(titulo) {
    return this.adyacencia.has(titulo) ? this.adyacencia.get(titulo).size : 0
  }

  recomendar(titulo, saltos = 2) {
    if (!this.adyacencia.has(titulo)) return []

    const distancias = new Map([[titulo, 0]])
    const cola = [titulo]
    const resultado = []

    while (cola.length > 0) {
      const actual = cola.shift()
      const distancia = distancias.get(actual)

      if (distancia >= saltos) continue

      for (const vecino of this.adyacencia.get(actual)) {
        if (!distancias.has(vecino)) {
          distancias.set(vecino, distancia + 1)
          resultado.push({ titulo: vecino, saltos: distancia + 1 })
          cola.push(vecino)
        }
      }
    }

    return resultado.sort((a, b) => a.saltos - b.saltos)
  }

  caminoEntre(origen, destino) {
    if (!this.adyacencia.has(origen) || !this.adyacencia.has(destino)) return []

    const previos = new Map([[origen, null]])
    const cola = [origen]

    while (cola.length > 0) {
      const actual = cola.shift()

      if (actual === destino) break

      for (const vecino of this.adyacencia.get(actual)) {
        if (!previos.has(vecino)) {
          previos.set(vecino, actual)
          cola.push(vecino)
        }
      }
    }

    if (!previos.has(destino)) return []

    const camino = []
    let paso = destino

    while (paso !== null) {
      camino.unshift(paso)
      paso = previos.get(paso)
    }

    return camino
  }

  canciones() {
    return [...this.adyacencia.keys()].sort()
  }

  contarConexiones() {
    let total = 0

    for (const vecinos of this.adyacencia.values()) {
      total += vecinos.size
    }

    return total / 2
  }

  masConectada() {
    let mejor = null

    for (const titulo of this.adyacencia.keys()) {
      if (mejor === null || this.grado(titulo) > this.grado(mejor)) {
        mejor = titulo
      }
    }

    return mejor
  }
}
