export class NodoBinario {
  constructor(valor) {
    this.valor = valor
    this.izquierda = null
    this.derecha = null
  }

  esHoja() {
    return this.izquierda === null && this.derecha === null
  }
}

export class ArbolBinario {
  constructor() {
    this.raiz = null
    this.tamano = 0
  }

  insertar(valor) {
    const nuevo = new NodoBinario(valor)

    if (this.raiz === null) {
      this.raiz = nuevo
      this.tamano++
      return true
    }

    let actual = this.raiz

    while (true) {
      if (valor === actual.valor) {
        return false
      }

      if (valor < actual.valor) {
        if (actual.izquierda === null) {
          actual.izquierda = nuevo
          this.tamano++
          return true
        }
        actual = actual.izquierda
      } else {
        if (actual.derecha === null) {
          actual.derecha = nuevo
          this.tamano++
          return true
        }
        actual = actual.derecha
      }
    }
  }

  insertarVarios(valores) {
    const insertados = []
    const repetidos = []

    for (const valor of valores) {
      if (this.insertar(valor)) {
        insertados.push(valor)
      } else {
        repetidos.push(valor)
      }
    }

    return { insertados: insertados, repetidos: repetidos }
  }

  buscar(valor) {
    let actual = this.raiz
    const camino = []
    let pasos = 0

    while (actual !== null) {
      pasos++
      camino.push(actual.valor)

      if (valor === actual.valor) {
        return { encontrado: true, pasos: pasos, camino: camino }
      }

      actual = valor < actual.valor ? actual.izquierda : actual.derecha
    }

    return { encontrado: false, pasos: pasos, camino: camino }
  }

  contiene(valor) {
    return this.buscar(valor).encontrado
  }

  inorden(nodo = this.raiz, lista = []) {
    if (nodo === null) return lista

    this.inorden(nodo.izquierda, lista)
    lista.push(nodo.valor)
    this.inorden(nodo.derecha, lista)

    return lista
  }

  preorden(nodo = this.raiz, lista = []) {
    if (nodo === null) return lista

    lista.push(nodo.valor)
    this.preorden(nodo.izquierda, lista)
    this.preorden(nodo.derecha, lista)

    return lista
  }

  postorden(nodo = this.raiz, lista = []) {
    if (nodo === null) return lista

    this.postorden(nodo.izquierda, lista)
    this.postorden(nodo.derecha, lista)
    lista.push(nodo.valor)

    return lista
  }

  porNiveles() {
    if (this.raiz === null) return []

    const lista = []
    const cola = [this.raiz]

    while (cola.length > 0) {
      const actual = cola.shift()
      lista.push(actual.valor)

      if (actual.izquierda !== null) cola.push(actual.izquierda)
      if (actual.derecha !== null) cola.push(actual.derecha)
    }

    return lista
  }

  altura(nodo = this.raiz) {
    if (nodo === null) return 0

    return 1 + Math.max(this.altura(nodo.izquierda), this.altura(nodo.derecha))
  }

  minimo() {
    if (this.raiz === null) return null

    let actual = this.raiz
    while (actual.izquierda !== null) actual = actual.izquierda

    return actual.valor
  }

  maximo() {
    if (this.raiz === null) return null

    let actual = this.raiz
    while (actual.derecha !== null) actual = actual.derecha

    return actual.valor
  }

  contarHojas(nodo = this.raiz) {
    if (nodo === null) return 0
    if (nodo.esHoja()) return 1

    return this.contarHojas(nodo.izquierda) + this.contarHojas(nodo.derecha)
  }

  vaciar() {
    this.raiz = null
    this.tamano = 0
  }

  imprimirRecorridos() {
    console.log('Inorden:   ', this.inorden().join(', '))
    console.log('Preorden:  ', this.preorden().join(', '))
    console.log('Postorden: ', this.postorden().join(', '))
  }

  aFormatoD3(nodo = this.raiz, lado = null) {
    if (nodo === null) return null

    const elemento = {
      name: String(nodo.valor),
      attributes: {},
      children: [],
    }

    if (lado !== null) {
      elemento.attributes.lado = lado
    }

    if (nodo.esHoja()) {
      delete elemento.children
      return elemento
    }

    if (nodo.izquierda !== null) {
      elemento.children.push(this.aFormatoD3(nodo.izquierda, 'izq'))
    } else {
      elemento.children.push({ name: '', attributes: { vacio: true } })
    }

    if (nodo.derecha !== null) {
      elemento.children.push(this.aFormatoD3(nodo.derecha, 'der'))
    } else {
      elemento.children.push({ name: '', attributes: { vacio: true } })
    }

    return elemento
  }

  static desdeTexto(texto) {
    return texto
      .split(/[\s,;]+/)
      .map((t) => t.trim())
      .filter((t) => t !== '')
      .map((t) => Number(t))
      .filter((n) => !isNaN(n))
  }
}
