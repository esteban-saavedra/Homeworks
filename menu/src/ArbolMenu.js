export class NodoMenu {
  constructor(datos) {
    this.id = datos.id
    this.titulo = datos.titulo
    this.enlace = datos.enlace || null
    this.componente = datos.componente || null
    this.icono = datos.icono || null
    this.hijos = []
  }

  esGrupo() {
    return this.hijos.length > 0
  }

  esNavegable() {
    return this.enlace !== null && this.componente !== null
  }

  agregarHijo(nodo) {
    this.hijos.push(nodo)
    return nodo
  }

  cantidadHijos() {
    return this.hijos.length
  }
}

export class ArbolMenu {
  constructor(titulo = 'Menu') {
    this.raiz = new NodoMenu({ id: 'raiz', titulo: titulo })
  }

  insertar(padreId, datos) {
    const padre = this.buscarPorId(padreId)

    if (padre === null) {
      throw new Error('No existe el menu padre: ' + padreId)
    }

    return padre.agregarHijo(new NodoMenu(datos))
  }

  buscarPorId(id, desde = this.raiz) {
    if (desde.id === id) return desde

    for (const hijo of desde.hijos) {
      const encontrado = this.buscarPorId(id, hijo)
      if (encontrado !== null) return encontrado
    }

    return null
  }

  buscarPorEnlace(enlace, desde = this.raiz) {
    if (desde.enlace === enlace) return desde

    for (const hijo of desde.hijos) {
      const encontrado = this.buscarPorEnlace(enlace, hijo)
      if (encontrado !== null) return encontrado
    }

    return null
  }

  ruta(enlace) {
    const camino = []

    function recorrer(nodo, acumulado) {
      const actual = [...acumulado, nodo]

      if (nodo.enlace === enlace) {
        camino.push(...actual)
        return true
      }

      for (const hijo of nodo.hijos) {
        if (recorrer(hijo, actual)) return true
      }

      return false
    }

    recorrer(this.raiz, [])
    return camino.slice(1)
  }

  contieneEnlace(nodo, enlace) {
    if (nodo.enlace === enlace) return true

    for (const hijo of nodo.hijos) {
      if (this.contieneEnlace(hijo, enlace)) return true
    }

    return false
  }

  rutasPlanas(desde = this.raiz, lista = []) {
    for (const hijo of desde.hijos) {
      if (hijo.esNavegable()) {
        lista.push({
          enlace: hijo.enlace,
          componente: hijo.componente,
          titulo: hijo.titulo,
        })
      }
      this.rutasPlanas(hijo, lista)
    }

    return lista
  }

  recorrerProfundidad(desde = this.raiz, nivel = 0, lista = []) {
    for (const hijo of desde.hijos) {
      lista.push({ nodo: hijo, nivel: nivel })
      this.recorrerProfundidad(hijo, nivel + 1, lista)
    }

    return lista
  }

  contar() {
    const todos = this.recorrerProfundidad()

    return {
      total: todos.length,
      grupos: todos.filter((t) => t.nodo.esGrupo()).length,
      enlaces: todos.filter((t) => t.nodo.esNavegable()).length,
    }
  }

  profundidad(desde = this.raiz) {
    if (desde.hijos.length === 0) return 0

    return 1 + Math.max(...desde.hijos.map((h) => this.profundidad(h)))
  }

  primerEnlace() {
    const rutas = this.rutasPlanas()
    return rutas.length > 0 ? rutas[0].enlace : '/'
  }

  static desdeLista(definicion, titulo = 'Menu') {
    const arbol = new ArbolMenu(titulo)

    function construir(padreId, items) {
      for (const item of items) {
        arbol.insertar(padreId, {
          id: item.id,
          titulo: item.titulo,
          enlace: item.enlace,
          componente: item.componente,
          icono: item.icono,
        })

        if (item.hijos) {
          construir(item.id, item.hijos)
        }
      }
    }

    construir('raiz', definicion)
    return arbol
  }
}
