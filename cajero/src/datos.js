
// personas con las que arranca la fila 
export const PERSONAS_INICIALES = [
  { nombre: 'Maria Gomez', monto: 150000 },
  { nombre: 'Andres Ramirez', monto: 80000 },
  { nombre: 'Lucia Torres', monto: 400000 },
  { nombre: 'Jorge Castillo', monto: 50000 },
];

// genera una hora de llegada aleatoria dentro del horario de atencion 
export function fechaLlegadaAleatoria() {
  const fecha = new Date();

  const hora = 8 + Math.floor(Math.random() * 9);   
  const minuto = Math.floor(Math.random() * 60);
  const segundo = Math.floor(Math.random() * 60);

  fecha.setHours(hora, minuto, segundo, 0);
  return fecha;
}

export function formatearHora(fecha) {
  return fecha.toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

// monto con separadores de miles y simbolo de peso
export function formatearMonto(monto) {
  return monto.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  });
}
