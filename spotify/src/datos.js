import { TrieCanciones } from './TrieCanciones.js'
import { GrafoCanciones } from './GrafoCanciones.js'

export const CANCIONES = [
  { titulo: 'LA INOCENTE', artista: 'Mora, Feid', genero: 'Reggaeton', reproducciones: 265, color: '#c2410c' },
  { titulo: 'Normal', artista: 'Feid', genero: 'Reggaeton', reproducciones: 249, color: '#65a30d' },
  { titulo: 'ROMANTICOS DE LUNES', artista: 'Feid', genero: 'Reggaeton', reproducciones: 228, color: '#1e3a5f' },
  { titulo: 'Volando', artista: 'Mora', genero: 'Trap', reproducciones: 227, color: '#7c3aed' },
  { titulo: 'TENGO FE', artista: 'Feid', genero: 'Reggaeton', reproducciones: 220, color: '#db2777' },
  { titulo: 'Llori Pari', artista: 'Alvaro Diaz, Feid, Tainy', genero: 'Trap', reproducciones: 212, color: '#0891b2' },
  { titulo: 'Tuyo', artista: 'Mora', genero: 'Trap', reproducciones: 210, color: '#9333ea' },
  { titulo: 'Efecto', artista: 'Bad Bunny', genero: 'Reggaeton', reproducciones: 205, color: '#e11d48' },
  { titulo: 'Tendencia Global', artista: 'Blessd, Myke Towers', genero: 'Reggaeton', reproducciones: 197, color: '#0d9488' },
  { titulo: 'LA CANCION', artista: 'J Balvin, Bad Bunny', genero: 'Reggaeton', reproducciones: 187, color: '#2563eb' },
  { titulo: 'Un Ratito', artista: 'Bad Bunny', genero: 'Reggaeton', reproducciones: 187, color: '#f59e0b' },
  { titulo: 'Fuera del mercado', artista: 'Danny Ocean', genero: 'Pop urbano', reproducciones: 182, color: '#475569' },
  { titulo: 'A Mi Tambien', artista: 'Tainy, Alvaro Diaz, Feid', genero: 'Trap', reproducciones: 180, color: '#334155' },
  { titulo: 'Me Porto Bonito', artista: 'Bad Bunny, Chencho Corleone', genero: 'Reggaeton', reproducciones: 180, color: '#dc2626' },
  { titulo: 'Ferxxo 100', artista: 'Feid', genero: 'Reggaeton', reproducciones: 179, color: '#4d7c0f' },
  { titulo: 'MIONCA AL BLOQUE', artista: 'Feid, Sael', genero: 'Reggaeton', reproducciones: 177, color: '#15803d' },
  { titulo: 'Sensacion Del Bloque', artista: 'De La Ghetto, Randy', genero: 'Reggaeton', reproducciones: 170, color: '#b45309' },
]

const RELACIONES = [
  ['LA INOCENTE', 'Normal'],
  ['LA INOCENTE', 'Volando'],
  ['LA INOCENTE', 'Tuyo'],
  ['Volando', 'Tuyo'],
  ['Normal', 'ROMANTICOS DE LUNES'],
  ['Normal', 'Ferxxo 100'],
  ['ROMANTICOS DE LUNES', 'TENGO FE'],
  ['TENGO FE', 'MIONCA AL BLOQUE'],
  ['TENGO FE', 'Llori Pari'],
  ['Ferxxo 100', 'MIONCA AL BLOQUE'],
  ['Ferxxo 100', 'A Mi Tambien'],
  ['Llori Pari', 'A Mi Tambien'],
  ['Efecto', 'Un Ratito'],
  ['Efecto', 'Me Porto Bonito'],
  ['Efecto', 'LA CANCION'],
  ['Un Ratito', 'Me Porto Bonito'],
  ['LA CANCION', 'Tendencia Global'],
  ['Tendencia Global', 'Sensacion Del Bloque'],
  ['Sensacion Del Bloque', 'MIONCA AL BLOQUE'],
  ['Fuera del mercado', 'Me Porto Bonito'],
  ['Fuera del mercado', 'Tuyo'],
]

export const GENEROS = ['Reggaeton', 'Trap', 'Pop urbano', 'Dancehall', 'Afrobeat']

export function construirTrie() {
  const trie = new TrieCanciones()

  CANCIONES.forEach((c) => trie.insertar(c))

  return trie
}

export function construirGrafo() {
  const grafo = new GrafoCanciones()

  CANCIONES.forEach((c) => grafo.agregarCancion(c.titulo))
  RELACIONES.forEach(([una, otra]) => grafo.conectar(una, otra))

  return grafo
}

export function formatearReproducciones(numero) {
  if (numero >= 1000000) {
    return (numero / 1000000).toFixed(1).replace('.0', '') + ' M'
  }

  if (numero >= 1000) {
    return Math.round(numero / 1000) + ' mil'
  }

  return String(numero)
}
