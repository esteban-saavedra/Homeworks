/**
 * LISTA DOBLEMENTE ENLAZADA
 * Autor: Esteban Saavedra
 *
 * Esta la uso para simular el historial del navegador.
 * A diferencia de la simple, aqui si puedo devolverme.
 */

class NodoDoble {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
    this.anterior = null; // esta es la unica diferencia con el nodo simple
  }
}
// aqui cada nodo guarda dos direcciones en vez de una
// sabe quien va despues y tambien quien iba antes
// eso es justo lo que hace posible el boton de "atras" del navegador

class ListaDobleEnlazada {
  constructor() {
    this.cabeza = null;  // el primer nodo
    this.cola = null;    // el ultimo nodo
    this.tamano = 0;
  }
  // aqui guardo tambien la cola porque como puedo moverme para atras
  // me sirve saber donde termina la lista sin tener que recorrerla toda

  agregar(valor) {
    const nuevo = new NodoDoble(valor);

    if (this.cabeza === null) {
      this.cabeza = nuevo;
      this.cola = nuevo;
    } else {
      nuevo.anterior = this.cola;
      this.cola.siguiente = nuevo;
      this.cola = nuevo;
    }

    this.tamano++;
    return this;
  }
  // esto es mas rapido que en la lista simple
  // como ya se cual es la cola, no tengo que recorrer nada, agrego de una
  // eso si toca amarrar el nodo por los dos lados:
  // el nuevo apunta hacia atras a la cola vieja, y la cola vieja apunta hacia adelante al nuevo
  // y de ultimo la cola pasa a ser el nodo nuevo

  obtenerNodo(posicion) {
    if (posicion < 0 || posicion >= this.tamano) return null;

    let actual = this.cabeza;
    for (let i = 0; i < posicion; i++) {
      actual = actual.siguiente;
    }
    return actual;
  }
  // devuelve el nodo completo, no solo el valor
  // lo necesito asi porque en la pagina voy a preguntarle al nodo
  // si tiene anterior o siguiente para habilitar o bloquear los botones

  aArreglo() {
    const resultado = [];
    let actual = this.cabeza;

    while (actual !== null) {
      resultado.push(actual.valor);
      actual = actual.siguiente;
    }
    return resultado;
  }
  // igual que en la lista simple, para poder mostrarla en React

  aArregloInverso() {
    const resultado = [];
    let actual = this.cola;

    while (actual !== null) {
      resultado.push(actual.valor);
      actual = actual.anterior;
    }
    return resultado;
  }
  // este metodo solo lo puedo hacer aqui y no en la lista simple
  // arranco desde la cola y me voy devolviendo con el anterior
  // en la lista simple seria imposible porque los nodos no saben quien iba antes
}

export { ListaDobleEnlazada, NodoDoble };
