/**
 * COLA (QUEUE) - Fila del cajero automatico
 * Autor: Esteban Saavedra
 *
 * Una cola funciona igual que la fila de un cajero de verdad:
 * el primero que llega es el primero que se atiende. A eso le dicen FIFO.
 * La implemento con nodos enlazados y no con un array
 * porque asi sacar al primero no obliga a mover a todos los demas de puesto.
 */

class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
  }
}

class Cola {
  constructor() {
    this.frente = null; // el que esta siendo atendido o le toca ya
    this.final = null;  // el ultimo que llego a la fila
    this.tamano = 0;
  }
  // guardo las dos puntas a proposito
  // el frente para saber a quien sacar y el final para saber donde meter al nuevo
  // si solo guardara el frente, cada vez que llega alguien tocaria recorrer toda la fila

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
  // meter a alguien a la fila siempre es por el final
  // si la fila esta vacia la persona es el frente y el final al mismo tiempo
  // si no, el que era el ultimo ahora apunta al nuevo y el nuevo pasa a ser el final

  desencolar() {
    if (this.frente === null) return null;

    const atendido = this.frente.valor;
    this.frente = this.frente.siguiente;

    if (this.frente === null) this.final = null;

    this.tamano--;
    return atendido;
  }
  // sacar siempre es por el frente, nunca por la mitad
  // muevo el frente al segundo nodo y el primero queda suelto
  // ese detalle del final en null es importante:
  // si saco al ultimo que quedaba, el final tiene que quedar vacio tambien
  // si no, quedaria apuntando a alguien que ya se fue y la cola se dañaria

  verFrente() {
    return this.frente ? this.frente.valor : null;
  }
  // mira quien sigue sin sacarlo de la fila

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
  // este me da la fila tal como esta, del frente hacia atras

  aArregloPorLlegada() {
    return this.aArreglo().sort((a, b) => a.llegada - b.llegada);
  }
  // este es el que pide el punto 4 del reto
  // como el sistema le pone a cada persona una hora de llegada aleatoria,
  // el orden en que estan en la fila no siempre coincide con el orden en que llegaron
  // aqui saco la fila a un array y la ordeno comparando las fechas
  // restar dos fechas en JavaScript da un numero, por eso el sort funciona con a - b
  // ojo que uso una copia, la cola por dentro nunca se reordena
}

export { Cola };
