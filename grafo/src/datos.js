import { Grafo } from './Grafo.js'

export const COLORES = {
  persona: '#4a6fa5',
  ciudad: '#d98324',
  amistad: '#9aa9b2',
  residencia: '#cdb28a',
}

const CIUDADES = [
  { id: 'cali', nombre: 'Cali' },
  { id: 'bogota', nombre: 'Bogota' },
  { id: 'medellin', nombre: 'Medellin' },
]

const PERSONAS = [
  { id: 'esteban', nombre: 'Esteban', edad: 21, ciudad: 'cali' },
  { id: 'camila', nombre: 'Camila', edad: 23, ciudad: 'cali' },
  { id: 'diego', nombre: 'Diego', edad: 25, ciudad: 'cali' },
  { id: 'valentina', nombre: 'Valentina', edad: 22, ciudad: 'bogota' },
  { id: 'andres', nombre: 'Andres', edad: 28, ciudad: 'bogota' },
  { id: 'lucia', nombre: 'Lucia', edad: 24, ciudad: 'medellin' },
  { id: 'jorge', nombre: 'Jorge', edad: 30, ciudad: 'medellin' },
  { id: 'paula', nombre: 'Paula', edad: 26, ciudad: 'medellin' },
]

const AMISTADES = [
  ['esteban', 'camila'],
  ['esteban', 'diego'],
  ['camila', 'valentina'],
  ['diego', 'jorge'],
  ['valentina', 'andres'],
  ['lucia', 'jorge'],
  ['lucia', 'paula'],
  ['paula', 'andres'],
]

export function construirGrafo() {
  const grafo = new Grafo()

  CIUDADES.forEach((c) => grafo.agregarCiudad(c.id, c.nombre))

  PERSONAS.forEach((p) =>
    grafo.agregarPersona(p.id, p.nombre, p.edad, p.ciudad)
  )

  AMISTADES.forEach(([uno, otro]) => grafo.conectarAmigos(uno, otro))

  return grafo
}

export function generarId(nombre, existentes) {
  const base = nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  if (!existentes.has(base)) return base

  let contador = 2
  while (existentes.has(base + '-' + contador)) contador++

  return base + '-' + contador
}
