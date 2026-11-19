export class MonticuloMaximo {
  constructor() {
    this.datos = []
  }

  get tamano() {
    return this.datos.length
  }

  estaVacio() {
    return this.datos.length === 0
  }

  padre(posicion) {
    return Math.floor((posicion - 1) / 2)
  }

  hijoIzquierdo(posicion) {
    return 2 * posicion + 1
  }

  hijoDerecho(posicion) {
    return 2 * posicion + 2
  }

  intercambiar(uno, otro) {
    const guardado = this.datos[uno]
    this.datos[uno] = this.datos[otro]
    this.datos[otro] = guardado
  }

  esMayor(uno, otro) {
    const a = this.datos[uno]
    const b = this.datos[otro]

    if (a.popularidad !== b.popularidad) {
      return a.popularidad > b.popularidad
    }

    return a.name.localeCompare(b.name) < 0
  }

  insertar(producto) {
    this.datos.push(producto)
    this.subir(this.datos.length - 1)
    return this
  }

  subir(posicion) {
    let actual = posicion

    while (actual > 0 && this.esMayor(actual, this.padre(actual))) {
      this.intercambiar(actual, this.padre(actual))
      actual = this.padre(actual)
    }
  }

  bajar(posicion) {
    let actual = posicion

    while (true) {
      const izquierdo = this.hijoIzquierdo(actual)
      const derecho = this.hijoDerecho(actual)
      let mayor = actual

      if (izquierdo < this.datos.length && this.esMayor(izquierdo, mayor)) {
        mayor = izquierdo
      }

      if (derecho < this.datos.length && this.esMayor(derecho, mayor)) {
        mayor = derecho
      }

      if (mayor === actual) break

      this.intercambiar(actual, mayor)
      actual = mayor
    }
  }

  extraerMaximo() {
    if (this.estaVacio()) return null

    const maximo = this.datos[0]
    const ultimo = this.datos.pop()

    if (!this.estaVacio()) {
      this.datos[0] = ultimo
      this.bajar(0)
    }

    return maximo
  }

  verMaximo() {
    return this.estaVacio() ? null : this.datos[0]
  }

  static desdeLista(productos) {
    const monticulo = new MonticuloMaximo()

    monticulo.datos = [...productos]

    for (let i = Math.floor(monticulo.datos.length / 2) - 1; i >= 0; i--) {
      monticulo.bajar(i)
    }

    return monticulo
  }

  static topK(productos, k) {
    const monticulo = MonticuloMaximo.desdeLista(productos)
    const mejores = []

    while (mejores.length < k && !monticulo.estaVacio()) {
      mejores.push(monticulo.extraerMaximo())
    }

    return mejores
  }
}
