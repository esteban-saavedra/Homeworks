import { createContext, useContext, useState, useRef } from 'react'
import { Cola } from './estructuras/Cola.js'

const PERSONAS_INICIALES = [
  { nombre: 'Maria Gomez', monto: 150000 },
  { nombre: 'Andres Ramirez', monto: 80000 },
  { nombre: 'Lucia Torres', monto: 400000 },
  { nombre: 'Jorge Castillo', monto: 50000 },
]

export function fechaLlegadaAleatoria() {
  const fecha = new Date()
  const hora = 8 + Math.floor(Math.random() * 9)
  const minuto = Math.floor(Math.random() * 60)
  const segundo = Math.floor(Math.random() * 60)

  fecha.setHours(hora, minuto, segundo, 0)
  return fecha
}

export function formatearHora(fecha) {
  return fecha.toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

export function formatearMonto(monto) {
  return monto.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  })
}

const ColaContext = createContext(null)

export function ColaProvider({ children }) {
  const cola = useRef(null)

  if (cola.current === null) {
    cola.current = new Cola()
    PERSONAS_INICIALES.forEach((p) =>
      cola.current.encolar({ ...p, llegada: fechaLlegadaAleatoria() })
    )
  }

  const [version, setVersion] = useState(0)
  const refrescar = () => setVersion((v) => v + 1)

  function encolar(nombre, monto) {
    const persona = {
      nombre: nombre,
      monto: monto,
      llegada: fechaLlegadaAleatoria(),
    }

    cola.current.encolar(persona)
    refrescar()
    return persona
  }

  function desencolar() {
    if (cola.current.estaVacia()) return null

    const persona = cola.current.desencolar()
    refrescar()
    return persona
  }

  const valor = {
    fila: cola.current.aArreglo(),
    porLlegada: cola.current.aArregloPorLlegada(),
    siguiente: cola.current.verFrente(),
    tamano: cola.current.tamano,
    estaVacia: cola.current.estaVacia(),
    encolar: encolar,
    desencolar: desencolar,
  }

  return <ColaContext.Provider value={valor}>{children}</ColaContext.Provider>
}

export function useCola() {
  const contexto = useContext(ColaContext)

  if (contexto === null) {
    throw new Error('useCola debe usarse dentro de ColaProvider')
  }

  return contexto
}
