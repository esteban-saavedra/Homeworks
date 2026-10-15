export const CARPETA = 'carpeta'
export const ARCHIVO = 'archivo'

export class NodoNario {
  constructor(datos) {
    this.id = datos.id
    this.nombre = datos.nombre
    this.tipo = datos.tipo
    this.padreId = datos.padreId
    this.email = datos.email
    this.uid = datos.uid
    this.creado = datos.creado
    this.hijos = []
  }

  esCarpeta() {
    return this.tipo === CARPETA
  }

  esArchivo() {
    return this.tipo === ARCHIVO
  }

  aceptaHijos() {
    return this.esCarpeta()
  }

  agregarHijo(nodo) {
    if (!this.aceptaHijos()) {
      throw new Error('Un archivo no puede contener elementos')
    }

    nodo.padreId = this.id
    this.hijos.push(nodo)
    return nodo
  }

  quitarHijo(id) {
    const posicion = this.hijos.findIndex((h) => h.id === id)

    if (posicion === -1) return null

    const quitado = this.hijos.splice(posicion, 1)[0]
    return quitado
  }

  cantidadHijos() {
    return this.hijos.length
  }

  estaVacia() {
    return this.hijos.length === 0
  }
}

export class ArbolNario {
  constructor(nombreRaiz = 'Mi unidad') {
    this.raiz = new NodoNario({
      id: 'raiz',
      nombre: nombreRaiz,
      tipo: CARPETA,
      padreId: null,
      email: '',
      uid: '',
      creado: 0,
    })
  }

  buscar(id, desde = this.raiz) {
    if (desde.id === id) return desde

    for (const hijo of desde.hijos) {
      const encontrado = this.buscar(id, hijo)
      if (encontrado !== null) return encontrado
    }

    return null
  }

  insertar(padreId, datos) {
    const padre = this.buscar(padreId)

    if (padre === null) {
      throw new Error('No existe la carpeta destino')
    }

    if (!padre.aceptaHijos()) {
      throw new Error('No se puede crear dentro de un archivo')
    }

    const repetido = padre.hijos.some(
      (h) => h.nombre.toLowerCase() === datos.nombre.toLowerCase()
    )

    if (repetido) {
      throw new Error('Ya existe un elemento con ese nombre en esta carpeta')
    }

    const nodo = new NodoNario(datos)
    padre.agregarHijo(nodo)
    return nodo
  }

  eliminar(id) {
    if (id === this.raiz.id) {
      throw new Error('No se puede eliminar la raiz')
    }

    const nodo = this.buscar(id)

    if (nodo === null) return null

    const padre = this.buscar(nodo.padreId)

    if (padre === null) return null

    return padre.quitarHijo(id)
  }

  renombrar(id, nombreNuevo) {
    const nodo = this.buscar(id)

    if (nodo === null) return false

    nodo.nombre = nombreNuevo
    return true
  }

  ruta(id) {
    const camino = []
    let actual = this.buscar(id)

    while (actual !== null) {
      camino.unshift(actual)
      actual = actual.padreId === null ? null : this.buscar(actual.padreId)
    }

    return camino
  }

  descendientes(id) {
    const nodo = this.buscar(id)

    if (nodo === null) return []

    const lista = []

    function recorrer(actual) {
      for (const hijo of actual.hijos) {
        lista.push(hijo)
        recorrer(hijo)
      }
    }

    recorrer(nodo)
    return lista
  }

  recorrerProfundidad(desde = this.raiz, nivel = 0, lista = []) {
    lista.push({ nodo: desde, nivel: nivel })

    for (const hijo of desde.hijos) {
      this.recorrerProfundidad(hijo, nivel + 1, lista)
    }

    return lista
  }

  recorrerAnchura() {
    const lista = []
    const cola = [this.raiz]

    while (cola.length > 0) {
      const actual = cola.shift()
      lista.push(actual)

      for (const hijo of actual.hijos) {
        cola.push(hijo)
      }
    }

    return lista
  }

  contar() {
    const todos = this.recorrerProfundidad()

    return {
      carpetas: todos.filter((t) => t.nodo.esCarpeta()).length - 1,
      archivos: todos.filter((t) => t.nodo.esArchivo()).length,
    }
  }

  altura(desde = this.raiz) {
    if (desde.estaVacia()) return 0

    const alturas = desde.hijos.map((h) => this.altura(h))
    return 1 + Math.max(...alturas)
  }

  ordenarHijos(nodo = this.raiz) {
    nodo.hijos.sort((a, b) => {
      if (a.tipo !== b.tipo) return a.esCarpeta() ? -1 : 1
      return a.nombre.localeCompare(b.nombre)
    })

    for (const hijo of nodo.hijos) {
      this.ordenarHijos(hijo)
    }
  }

  static desdeLista(documentos, nombreRaiz = 'Mi unidad') {
    const arbol = new ArbolNario(nombreRaiz)
    const mapa = new Map()

    mapa.set(arbol.raiz.id, arbol.raiz)

    for (const doc of documentos) {
      mapa.set(doc.id, new NodoNario(doc))
    }

    for (const doc of documentos) {
      const nodo = mapa.get(doc.id)
      const padre = mapa.get(doc.padreId)

      if (padre && padre.aceptaHijos()) {
        padre.hijos.push(nodo)
      } else if (!padre) {
        arbol.raiz.hijos.push(nodo)
      }
    }

    arbol.ordenarHijos()
    return arbol
  }
}
