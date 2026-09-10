/**
 * LISTA DOBLEMENTE ENLAZADA - Historial de atencion
 * Autor: Esteban Saavedra
 *
 * Aqui van cayendo los pacientes ya atendidos.
 * Uso lista doble porque en un historial uno necesita moverse en los dos sentidos:
 * ver la atencion anterior o la siguiente sin volver a empezar desde el principio.
 */

class NodoDoble {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
    this.anterior = null;
  }
}
// la diferencia con el nodo simple es esa segunda direccion
// cada atencion sabe cual fue la anterior y cual la siguiente

class HistorialAtencion {
  constructor() {
    this.cabeza = null;
    this.cola = null;
    this.tamano = 0;
  }
  // guardo tambien la cola porque la ultima atencion es la que mas se consulta
  // asi llego a ella de una sin recorrer todo el historial

  registrar(paciente, medico) {
    const registro = {
      paciente: paciente,
      medico: medico,
      hora: new Date().toLocaleTimeString(),
    };
    // armo el registro con el paciente, quien lo atendio y la hora exacta
    // la hora la saco del reloj del computador en el momento de la atencion

    const nuevo = new NodoDoble(registro);

    if (this.cabeza === null) {
      this.cabeza = nuevo;
      this.cola = nuevo;
    } else {
      nuevo.anterior = this.cola;
      this.cola.siguiente = nuevo;
      this.cola = nuevo;
    }
    // toca amarrar el nodo por los dos lados
    // el nuevo mira hacia atras a la cola vieja y la cola vieja mira hacia adelante al nuevo
    // y de ultimo el nuevo pasa a ser la cola

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
  // devuelvo el nodo completo y no solo el valor
  // porque en el panel le pregunto al nodo si tiene anterior o siguiente
  // y con eso decido si habilito o bloqueo los botones de navegacion

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
  // esto solo se puede hacer con lista doble
  // arranco desde la cola y me devuelvo usando el anterior
  // para un historial es lo mas util, porque uno quiere ver lo mas reciente primero
}

export { HistorialAtencion };
