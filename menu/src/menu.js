import { ArbolMenu } from './ArbolMenu.js'
import {
  Perfil,
  Mensajes,
  Cuenta,
  PerfilAjustes,
  Seguridad,
  Dispositivos,
  Sesiones,
  Contrasena,
  Notificaciones,
  Preguntas,
  Ticket,
  EstadoRed,
  CerrarSesion,
} from './paginas.jsx'

const DEFINICION = [
  {
    id: 'perfil',
    titulo: 'Perfil',
    enlace: '/perfil',
    componente: Perfil,
    icono: '\u{1F464}',
  },
  {
    id: 'mensajes',
    titulo: 'Mensajes',
    enlace: '/mensajes',
    componente: Mensajes,
    icono: '\u{1F4AC}',
  },
  {
    id: 'configuracion',
    titulo: 'Configuracion',
    icono: '\u{2699}',
    hijos: [
      {
        id: 'cuenta',
        titulo: 'Cuenta',
        enlace: '/configuracion/cuenta',
        componente: Cuenta,
      },
      {
        id: 'perfil-ajustes',
        titulo: 'Perfil',
        enlace: '/configuracion/perfil',
        componente: PerfilAjustes,
      },
      {
        id: 'seguridad',
        titulo: 'Seguridad y privacidad',
        enlace: '/configuracion/seguridad',
        componente: Seguridad,
        hijos: [
          {
            id: 'dispositivos',
            titulo: 'Dispositivos',
            enlace: '/configuracion/seguridad/dispositivos',
            componente: Dispositivos,
          },
          {
            id: 'sesiones',
            titulo: 'Sesiones activas',
            enlace: '/configuracion/seguridad/sesiones',
            componente: Sesiones,
          },
        ],
      },
      {
        id: 'contrasena',
        titulo: 'Contrasena',
        enlace: '/configuracion/contrasena',
        componente: Contrasena,
      },
      {
        id: 'notificaciones',
        titulo: 'Notificaciones',
        enlace: '/configuracion/notificaciones',
        componente: Notificaciones,
      },
    ],
  },
  {
    id: 'ayuda',
    titulo: 'Ayuda',
    icono: '\u{2753}',
    hijos: [
      {
        id: 'preguntas',
        titulo: 'Preguntas frecuentes',
        enlace: '/ayuda/preguntas',
        componente: Preguntas,
      },
      {
        id: 'ticket',
        titulo: 'Enviar un ticket',
        enlace: '/ayuda/ticket',
        componente: Ticket,
      },
      {
        id: 'estado',
        titulo: 'Estado de la red',
        enlace: '/ayuda/estado',
        componente: EstadoRed,
      },
    ],
  },
  {
    id: 'logout',
    titulo: 'Cerrar sesion',
    enlace: '/logout',
    componente: CerrarSesion,
    icono: '\u{1F6AA}',
  },
]

export const arbolMenu = ArbolMenu.desdeLista(DEFINICION, 'Panel')
