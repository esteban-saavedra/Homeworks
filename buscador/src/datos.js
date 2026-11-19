import { Trie } from './Trie.js'

export const PRODUCTOS = [
  { name: 'air max', popularidad: 90 },
  { name: 'air force', popularidad: 95 },
  { name: 'air jordan', popularidad: 85 },
  { name: 'air zoom', popularidad: 72 },
  { name: 'adidas boost', popularidad: 80 },
  { name: 'adidas samba', popularidad: 88 },
  { name: 'adidas gazelle', popularidad: 64 },
  { name: 'nike dunk', popularidad: 92 },
  { name: 'nike blazer', popularidad: 70 },
  { name: 'new balance 550', popularidad: 83 },
  { name: 'new balance 327', popularidad: 61 },
  { name: 'puma suede', popularidad: 58 },
  { name: 'puma palermo', popularidad: 66 },
  { name: 'converse chuck 70', popularidad: 76 },
  { name: 'vans old skool', popularidad: 79 },
]

export function construirTrie() {
  const trie = new Trie()

  PRODUCTOS.forEach((p) => trie.insertar(p.name, p.popularidad))

  return trie
}
