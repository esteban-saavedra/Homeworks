/**
 * LISTA CIRCULAR SIMPLE - Rotacion de medicos de guardia
 * Autor: Esteban Saavedra
 *
 * Los turnos de guardia nunca se acaban, cuando termina el ultimo medico
 * vuelve a empezar el primero. Por eso una lista circular queda perfecta.
 */

class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
  }
}

class RotacionMedicos {
  constructor() {
    this.actual = null; // el medico que esta de guardia ahora mismo
    this.tamano = 0;
  }
  // aqui no guardo cabeza ni cola porque en un circulo no hay inicio ni final
  // lo unico que me importa es en que punto del circulo estoy parado

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
  // el primer medico se apunta a si mismo, o sea un circulo de una sola persona
  // eso al principio se me hizo raro pero tiene sentido: si es el unico, despues de el sigue el mismo
  //
  // y aqui esta la gran diferencia con la lista normal:
  // en la simple yo paraba de recorrer cuando el siguiente era null
  // aqui NUNCA hay null, entonces si pongo esa condicion el programa se cuelga en un bucle infinito
  // toca parar cuando el siguiente vuelve a ser el punto de partida

  siguienteTurno() {
    if (this.actual === null) return null;

    this.actual = this.actual.siguiente;
    return this.actual.valor;
  }
  // esta es la funcion que se llama sola cada 10 segundos
  // solo muevo el puntero un paso, no cambio nada de la estructura
  // como es circular nunca se acaba, al llegar al ultimo vuelve solo al primero

  verActual() {
    return this.actual ? this.actual.valor : null;
  }

  verSiguiente() {
    return this.actual ? this.actual.siguiente.valor : null;
  }
  // para mostrar en pantalla a quien le toca el proximo turno

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
  // aqui use do-while y no while normal
  // porque con while la condicion se evalua de una y como arranco en actual
  // la comparacion daria falsa de inmediato y no guardaria nada
  // con do-while primero hago la vuelta y despues pregunto, asi si entra el primero
}

export { RotacionMedicos };
