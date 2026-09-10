/**
 * LISTA CIRCULAR DOBLEMENTE ENLAZADA - Comite administrativo
 * Autor: Esteban Saavedra
 *
 * Esta es la mezcla de las dos anteriores: es circular y ademas es doble.
 * La uso para el comite porque en una mesa de reunion uno puede pasar
 * la palabra al de la derecha o devolverse al de la izquierda, y la mesa es un circulo.
 */

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
  // el primer miembro se apunta a si mismo por los dos lados
  //
  // lo mejor de esta estructura es que aqui NO tengo que recorrer nada para agregar
  // como el actual conoce a su anterior, y en un circulo el anterior del primero es el ultimo,
  // llego al ultimo en un solo paso
  // en la circular simple me tocaba dar toda la vuelta para encontrarlo
  //
  // eso si hay que amarrar cuatro enlaces y no dos, aqui me enrede al principio:
  // el ultimo mira al nuevo, el nuevo mira al ultimo,
  // el nuevo mira al primero y el primero mira al nuevo

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
  // estos dos metodos son la razon de usar esta estructura
  // en la circular simple solo existiria el siguiente
  // para devolverme un puesto tocaria dar toda la vuelta al circulo

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
  // mismo do-while de la circular simple
  // paro cuando vuelvo al punto donde arranque, si no daria vueltas para siempre
}

export { ComiteCircular };
