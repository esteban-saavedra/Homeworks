class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
  }
}

class RotacionMedicos {
  constructor() {
    this.actual = null;
    this.tamano = 0;
  }

  agregar(medico) {
    const nuevo = new Nodo(medico);

    if (this.actual === null) {
      this.actual = nuevo;
      nuevo.siguiente = nuevo;
    } else {
      let recorrido = this.actual;
      while (recorrido.siguiente !== this.actual) {
        recorrido = recorrido.siguiente;
      }
      recorrido.siguiente = nuevo;
      nuevo.siguiente = this.actual;
    }

    this.tamano++;
    return this;
  }

  siguienteTurno() {
    if (this.actual === null) return null;

    this.actual = this.actual.siguiente;
    return this.actual.valor;
  }

  verActual() {
    return this.actual ? this.actual.valor : null;
  }

  verSiguiente() {
    return this.actual ? this.actual.siguiente.valor : null;
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

export { RotacionMedicos };
