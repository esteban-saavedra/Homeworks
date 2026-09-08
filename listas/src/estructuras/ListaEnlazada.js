/**
 * LISTA ENLAZADA SIMPLE
 * Autor: Esteban Saavedra
 *
 * Esta la uso para el reproductor de canciones.
 * Solo se puede avanzar hacia adelante, como una playlist en orden.
 */

// Primero el nodo, que es la pieza mas pequeña de la lista
class Nodo {
  constructor(valor) {
    this.valor = valor;   // aqui guardo la informacion (la cancion)
    this.siguiente = null; // y aqui la direccion del proximo nodo
  }
}
// lo que entendi es que la lista no es un bloque continuo como un array
// son nodos sueltos en memoria y cada uno sabe quien viene despues de el
// por eso se llama "enlazada", porque estan encadenados uno tras otro

class ListaEnlazada {
  constructor() {
    this.cabeza = null;  // el primer nodo de todos
    this.tamano = 0;     // cuantos nodos hay
  }
  // arranca vacia, por eso la cabeza es null

  agregar(valor) {
    const nuevo = new Nodo(valor);

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
  // agrega al final de la lista
  // si esta vacia el nuevo nodo se vuelve la cabeza
  // si no, tengo que recorrer nodo por nodo hasta llegar al ultimo
  // sabemos que llegamos al ultimo porque su siguiente es null
  // esta es la desventaja frente a un array: toca caminar toda la lista

  obtener(posicion) {
    if (posicion < 0 || posicion >= this.tamano) return null;

    let actual = this.cabeza;
    for (let i = 0; i < posicion; i++) {
      actual = actual.siguiente;
    }
    return actual.valor;
  }
  // aqui esta la otra desventaja
  // en un array puedo pedir la posicion 5 de una y me la da
  // aqui toca dar 5 pasitos desde la cabeza para llegar

  aArreglo() {
    const resultado = [];
    let actual = this.cabeza;

    while (actual !== null) {
      resultado.push(actual.valor);
      actual = actual.siguiente;
    }
    return resultado;
  }
  // convierte la lista a un array normal
  // lo hice porque React necesita un array para poder pintar la playlist en pantalla
}

export { ListaEnlazada, Nodo };
// exporto la clase para poder usarla en las paginas
