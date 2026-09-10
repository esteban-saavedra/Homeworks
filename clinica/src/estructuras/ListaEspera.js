/**
 * LISTA ENLAZADA SIMPLE - Pacientes en espera
 * Autor: Esteban Saavedra
 *
 * La sala de espera funciona como una fila: el que llega primero se atiende primero.
 * Por eso uso una lista simple, aqui nadie necesita devolverse.
 */

class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
  }
}
// cada nodo es un paciente y solo sabe quien esta detras de el en la fila

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
  // el paciente que llega se pone de ultimo en la fila
  // toca recorrer hasta encontrar el nodo cuyo siguiente sea null, ese es el ultimo

  atender() {
    if (this.cabeza === null) return null;

    const atendido = this.cabeza.valor;
    this.cabeza = this.cabeza.siguiente;
    this.tamano--;

    return atendido;
  }
  // este es el metodo clave del proyecto
  // saca al primero de la fila y me lo devuelve para poder mandarlo al historial
  // lo unico que hago es mover la cabeza al segundo nodo
  // el primero queda suelto sin que nadie lo apunte y JavaScript lo borra solo de la memoria
  // por eso sacar de una lista enlazada es tan rapido, no hay que correr a nadie de puesto
  // en un array tocaria mover todos los elementos una posicion hacia atras

  verPrimero() {
    return this.cabeza ? this.cabeza.valor : null;
  }
  // para mostrar en pantalla a quien le toca sin sacarlo todavia

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
  // React necesita un array para pintar la fila en pantalla
}

export { ListaEspera };
