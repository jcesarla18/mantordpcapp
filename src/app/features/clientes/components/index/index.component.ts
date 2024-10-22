import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cliente } from '../../models/cliente';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { SweetalertService } from '../../../../core/services/sweetalert.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export default class IndexComponent {
  // inject
  private clienteService = inject(ClienteService);
  private sweetAlertService = inject(SweetalertService);

  // propiedades
  listClientes: Cliente[] = [];
  filtroClientes: Cliente[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  searchControl = new FormControl('');

  // metodos
  async deleteClient(id: number) {
    const isConfirmed = await this.sweetAlertService.confirm(
      '¿Estás seguro?',
      'Esta acción no se puede deshacer.'
    );
    if (isConfirmed) {
      return this.clienteService.deleteClient(id).subscribe((res) => {
        this.filtroClientes = this.listClientes.filter((item) => {
          item.clienteId !== id;
        });
        this.sweetAlertService.accepted(
          'Eliminado!',
          'cliente ha sido eliminado.'
        );
      });
    } else {
      return this.sweetAlertService.cancelled(
        'Cancelado',
        'no se ha eliminado el cliente'
      );
    }
  }

  filterTableClient() {
    this.searchControl.valueChanges.subscribe((value) => {
      this.filtroClientes = this.listClientes.filter((client) => {
        return (
          client.nombre.toLowerCase().includes(String(value).toLowerCase()) ||
          client.email.toLowerCase().includes(String(value).toLowerCase())
        );
      });
    });
  }

  ngOnInit() {
    this.clienteService.getClient().subscribe((client) => {
      this.filtroClientes = client;
      this.listClientes = client;
    });

    this.filterTableClient();
  }
}
