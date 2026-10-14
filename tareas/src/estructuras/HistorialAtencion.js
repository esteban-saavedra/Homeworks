class NodoDoble {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
    this.anterior = null;
  }
}

class HistorialAtencion {
  constructor() {
    this.cabeza = null;
    this.cola = null;
    this.tamano = 0;
  }

  registrar(paciente, medico) {
    const registro = {
      paciente: paciente,
      medico: medico,
      hora: new Date().toLocaleTimeString(),
    };

    const nuevo = new NodoDoble(registro);

    if (this.cabeza === null) {
      this.cabeza = nuevo;
      this.cola = nuevo;
    } else {
      nuevo.anterior = this.cola;
      this.cola.siguiente = nuevo;
      this.cola = nuevo;
    }

    this.tamano++;
    return registro;
  }

  obtenerNodo(posicion) {
    if (posicion < 0 || posicion >= this.tamano) return null;

    let actual = this.cabeza;
    for (let i = 0; i < posicion; i++) {
      actual = actual.siguiente;
    }
    return actual;
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

  aArregloInverso() {
    const resultado = [];
    let actual = this.cola;

    while (actual !== null) {
      resultado.push(actual.valor);
      actual = actual.anterior;
    }
    return resultado;
  }
}

export { HistorialAtencion };
