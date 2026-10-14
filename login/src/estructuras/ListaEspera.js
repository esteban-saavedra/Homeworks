class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
  }
}

class ListaEspera {
  constructor() {
    this.cabeza = null;
    this.tamano = 0;
  }

  agregar(paciente) {
    const nuevo = new Nodo(paciente);

    if (this.cabeza === null) {
      this.cabeza = nuevo;
    } else {
      let actual = this.cabeza;
      while (actual.siguiente !== null) {
        actual = actual.siguiente;
      }
      actual.siguiente = nuevo;
    }

    this.tamano++;
    return this;
  }

  atender() {
    if (this.cabeza === null) return null;

    const atendido = this.cabeza.valor;
    this.cabeza = this.cabeza.siguiente;
    this.tamano--;

    return atendido;
  }

  verPrimero() {
    return this.cabeza ? this.cabeza.valor : null;
  }

  estaVacia() {
    return this.cabeza === null;
  }

  aArreglo() {
    const resultado = [];
    let actual = this.cabeza;

    while (actual !== null) {
      resultado.push(actual.valor);
      actual = actual.siguiente;
    }
    return resultado;
  }
}

export { ListaEspera };
