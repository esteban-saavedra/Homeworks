class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
  }
}

class Cola {
  constructor() {
    this.frente = null;
    this.final = null;
    this.tamano = 0;
  }

  encolar(persona) {
    const nuevo = new Nodo(persona);

    if (this.final === null) {
      this.frente = nuevo;
      this.final = nuevo;
    } else {
      this.final.siguiente = nuevo;
      this.final = nuevo;
    }

    this.tamano++;
    return this;
  }

  desencolar() {
    if (this.frente === null) return null;

    const atendido = this.frente.valor;
    this.frente = this.frente.siguiente;

    if (this.frente === null) this.final = null;

    this.tamano--;
    return atendido;
  }

  verFrente() {
    return this.frente ? this.frente.valor : null;
  }

  estaVacia() {
    return this.frente === null;
  }

  aArreglo() {
    const resultado = [];
    let actual = this.frente;

    while (actual !== null) {
      resultado.push(actual.valor);
      actual = actual.siguiente;
    }
    return resultado;
  }

  aArregloPorLlegada() {
    return this.aArreglo().sort((a, b) => a.llegada - b.llegada);
  }
}

export { Cola };
