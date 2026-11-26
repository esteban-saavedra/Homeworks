export class NodoTrie {
  constructor(letra) {
    this.letra = letra
    this.hijos = new Map()
    this.esFinal = false
    this.cancion = null
  }

  tieneHijo(letra) {
    return this.hijos.has(letra)
  }

  obtenerHijo(letra) {
    return this.hijos.get(letra)
  }

  agregarHijo(letra) {
    const nuevo = new NodoTrie(letra)
    this.hijos.set(letra, nuevo)
    return nuevo
  }

  cantidadHijos() {
    return this.hijos.size
  }
}

export class TrieCanciones {
  constructor() {
    this.raiz = new NodoTrie('')
    this.tamano = 0
  }

  normalizar(texto) {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .trim()
  }

  insertar(cancion) {
    const clave = this.normalizar(cancion.titulo)

    if (clave === '') return null

    let actual = this.raiz

    for (const letra of clave) {
      if (!actual.tieneHijo(letra)) {
        actual.agregarHijo(letra)
      }
      actual = actual.obtenerHijo(letra)
    }

    if (actual.esFinal) {
      actual.cancion = { ...actual.cancion, ...cancion }
      return actual.cancion
    }

    actual.esFinal = true
    actual.cancion = cancion
    this.tamano++

    return actual.cancion
  }

  buscarNodo(texto) {
    const clave = this.normalizar(texto)
    let actual = this.raiz

    for (const letra of clave) {
      if (!actual.tieneHijo(letra)) return null
      actual = actual.obtenerHijo(letra)
    }

    return actual
  }

  existe(titulo) {
    const nodo = this.buscarNodo(titulo)
    return nodo !== null && nodo.esFinal
  }

  obtener(titulo) {
    const nodo = this.buscarNodo(titulo)
    return nodo !== null && nodo.esFinal ? nodo.cancion : null
  }

  recolectar(nodo, lista = []) {
    if (nodo === null) return lista

    if (nodo.esFinal) lista.push(nodo.cancion)

    for (const hijo of nodo.hijos.values()) {
      this.recolectar(hijo, lista)
    }

    return lista
  }

  sugerencias(prefijo) {
    if (this.normalizar(prefijo) === '') return []

    return this.recolectar(this.buscarNodo(prefijo)).sort(
      (a, b) => b.reproducciones - a.reproducciones
    )
  }

  todas() {
    return this.recolectar(this.raiz)
  }

  contarNodos(nodo = this.raiz) {
    let total = 1

    for (const hijo of nodo.hijos.values()) {
      total += this.contarNodos(hijo)
    }

    return total
  }

  profundidad(nodo = this.raiz) {
    if (nodo.cantidadHijos() === 0) return 0

    return 1 + Math.max(...[...nodo.hijos.values()].map((h) => this.profundidad(h)))
  }
}
