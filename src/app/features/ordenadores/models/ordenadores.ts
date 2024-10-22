import { Cliente } from '../../clientes/models/cliente'

export interface Ordenadores {
  ordenadorId: number
  clienteId: number
  marca: string
  modelo: string
  numeroSerie: string
  fechaCompra: Date
  fechaRegistro?: Date
  cliente?: Cliente[] | undefined
}
