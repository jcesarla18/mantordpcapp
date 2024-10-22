import { Cliente } from '../../clientes/models/cliente'

export interface Usuario {
  usuarioId: number
  nombre: string
  email: string
  contrasena: string | ''
  rol: string | ''
  fechaCreacion?: Date
  clientes?: Cliente[] | undefined
}
