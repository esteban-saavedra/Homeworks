/**
 * DATOS DE PRUEBA
 */

export const PACIENTES_INICIALES = [
  { nombre: 'Martha Escobar', motivo: 'Control de presion'},
  { nombre: 'Alejandro Saavedra', motivo: 'Dolor abdominal'},
  { nombre: 'Nelson Martinez', motivo: 'Fiebre'},
  { nombre: 'Jorge Castillo', motivo: 'Esguince de tobillo'},
];

export const MEDICOS = [
  { nombre: 'Dra. Lucia Correa', especialidad: 'Medicina general' },
  { nombre: 'Dr. Luisa Fernando Ruiz', especialidad: 'Urgencias' },
  { nombre: 'Dra. MAria Camila Ospina', especialidad: 'Pediatria' },
];

export const COMITE = [
  { nombre: 'Dr. Hernan Vargas', cargo: 'Director medico' },
  { nombre: 'Sandra Molina', cargo: 'Jefe de enfermeria' },
  { nombre: 'Ricardo perez', cargo: 'Administracion' },
  { nombre: 'Dra. Elena Cruz', cargo: 'Calidad' },
];

// nombres nuevos que se usan cuando le doy al boton de agregar paciente
export const NUEVOS_PACIENTES = [
  { nombre: 'Luisa Salazar', motivo: 'Migraña'},
  { nombre: 'Natalia Rios', motivo: 'Alergia' },
  { nombre: 'Isabella Herrera', motivo: 'Chequeo general' },
  { nombre: 'Paula Mejia', motivo: 'Dolor de garganta' },
  { nombre: 'Daniel Santos', motivo: 'Dolor de cabeza' },
];

// cada cuantos segundos rota el medico de guardia
export const SEGUNDOS_ROTACION = 10;
