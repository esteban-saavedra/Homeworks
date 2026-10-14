/**
 * DATOS DE PRUEBA Y UTILIDADES
 * Aqui dejo lo que se puede cambiar sin tocar la logica del sistema.
 */

// personas con las que arranca la fila (mock data como pide el reto)
export const PERSONAS_INICIALES = [
  { nombre: 'Maria Gomez', monto: 150000 },
  { nombre: 'Andres Ramirez', monto: 80000 },
  { nombre: 'Lucia Torres', monto: 400000 },
  { nombre: 'Jorge Castillo', monto: 50000 },
];

// genera una hora de llegada aleatoria dentro del horario de atencion de hoy
export function fechaLlegadaAleatoria() {
  const fecha = new Date();

  const hora = 8 + Math.floor(Math.random() * 9);   // entre las 8 y las 16
  const minuto = Math.floor(Math.random() * 60);
  const segundo = Math.floor(Math.random() * 60);

  fecha.setHours(hora, minuto, segundo, 0);
  return fecha;
}
// el reto pide que la fecha la asigne el sistema, no la persona
// Math.random() da un decimal entre 0 y 1, al multiplicarlo por 9 y redondear
// hacia abajo con Math.floor me quedan numeros entre 0 y 8, y sumandole 8
// la hora termina cayendo entre las 8am y las 4pm

// para mostrar la hora bonita en pantalla
export function formatearHora(fecha) {
  return fecha.toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

// para mostrar el monto con separadores de miles y simbolo de peso
export function formatearMonto(monto) {
  return monto.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  });
}
