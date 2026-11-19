export class NodoTrie {
  constructor(letra) {
    this.letra = letra
    this.hijos = new Map()
    this.esFinal = false
    this.producto = null
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

export class Trie {
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

  insertar(nombre, popularidad) {
    const clave = this.normalizar(nombre)

    if (clave === '') return null

    let actual = this.raiz

    for (const letra of clave) {
      if (!actual.tieneHijo(letra)) {
        actual.agregarHijo(letra)
      }
      actual = actual.obtenerHijo(letra)
    }

    if (actual.esFinal) {
      actual.producto.popularidad = popularidad
      return actual.producto
    }

    actual.esFinal = true
    actual.producto = { name: nombre, popularidad: popularidad }
    this.tamano++

    return actual.producto
  }

  buscarNodo(prefijo) {
    const clave = this.normalizar(prefijo)
    let actual = this.raiz

    for (const letra of clave) {
      if (!actual.tieneHijo(letra)) return null
      actual = actual.obtenerHijo(letra)
    }

    return actual
  }

  contiene(nombre) {
    const nodo = this.buscarNodo(nombre)
    return nodo !== null && nodo.esFinal
  }

  recolectar(nodo, lista = []) {
    if (nodo === null) return lista

    if (nodo.esFinal) {
      lista.push(nodo.producto)
    }

    for (const hijo of nodo.hijos.values()) {
      this.recolectar(hijo, lista)
    }

    return lista
  }

  buscarPorPrefijo(prefijo) {
    const nodo = this.buscarNodo(prefijo)

    if (nodo === null) return []

    return this.recolectar(nodo)
  }

  todos() {
    return this.recolectar(this.raiz)
  }

  profundidad(nodo = this.raiz) {
    if (nodo.cantidadHijos() === 0) return 0

    const alturas = [...nodo.hijos.values()].map((h) => this.profundidad(h))
    return 1 + Math.max(...alturas)
  }

  contarNodos(nodo = this.raiz) {
    let total = 1

    for (const hijo of nodo.hijos.values()) {
      total += this.contarNodos(hijo)
    }

    return total
  }
}
