class NodoDoble {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
    this.anterior = null;
  }
}

class ComiteCircular {
  constructor() {
    this.actual = null;
    this.tamano = 0;
  }

  agregar(miembro) {
    const nuevo = new NodoDoble(miembro);

    if (this.actual === null) {
      this.actual = nuevo;
      nuevo.siguiente = nuevo;
      nuevo.anterior = nuevo;
    } else {
      const ultimo = this.actual.anterior;

      ultimo.siguiente = nuevo;
      nuevo.anterior = ultimo;
      nuevo.siguiente = this.actual;
      this.actual.anterior = nuevo;
    }

    this.tamano++;
    return this;
  }

  siguiente() {
    if (this.actual === null) return null;
    this.actual = this.actual.siguiente;
    return this.actual.valor;
  }

  anterior() {
    if (this.actual === null) return null;
    this.actual = this.actual.anterior;
    return this.actual.valor;
  }

  verActual() {
    return this.actual ? this.actual.valor : null;
  }

  aArreglo() {
    if (this.actual === null) return [];

    const resultado = [];
    let recorrido = this.actual;

    do {
      resultado.push(recorrido.valor);
      recorrido = recorrido.siguiente;
    } while (recorrido !== this.actual);

    return resultado;
  }
}

export { ComiteCircular };
