import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { NgxPaginationModule } from 'ngx-pagination'
import { OrdenadoresService } from '../../services/ordenadores.service'
import { SweetalertService } from '../../../../core/services/sweetalert.service'
import { Ordenadores } from '../../models/ordenadores'

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export default class IndexComponent {
  // inject
  private ordenadoresService = inject(OrdenadoresService)
  private sweetAlertService = inject(SweetalertService)

  // propiedades
  listOrdenadores: Ordenadores[] = []
  filtroOrdenadores: Ordenadores[] = []
  currentPage: number = 1
  itemsPerPage: number = 5

  searchControl = new FormControl('')

  // metodos
  async deleteOrdenador(id: number) {
    const isConfirmed = await this.sweetAlertService.confirm(
      '¿Estás seguro?',
      'Esta acción no se puede deshacer.'
    )
    if (isConfirmed) {
      return this.ordenadoresService.deleteOrdenadores(id).subscribe(res => {
        this.filtroOrdenadores = this.listOrdenadores.filter(item => {
          item.clienteId !== id
        })
        this.sweetAlertService.accepted(
          'Eliminado!',
          'ordenador ha sido eliminado.'
        )
      })
    } else {
      return this.sweetAlertService.cancelled(
        'Cancelado',
        'no se ha eliminado el ordenador'
      )
    }
  }

  filterTableClient() {
    this.searchControl.valueChanges.subscribe(value => {
      this.filtroOrdenadores = this.listOrdenadores.filter(ordenadores => {
        return (
          ordenadores.marca
            .toLowerCase()
            .includes(String(value).toLowerCase()) ||
          ordenadores.modelo.toLowerCase().includes(String(value).toLowerCase())
        )
      })
    })
  }

  ngOnInit() {
    this.ordenadoresService.getOrdenadores().subscribe(ordenadores => {
      this.filtroOrdenadores = ordenadores
      this.listOrdenadores = ordenadores
    })

    this.filterTableClient()
  }
  constructor() {}
}
