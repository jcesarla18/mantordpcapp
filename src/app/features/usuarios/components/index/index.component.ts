import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SweetalertService } from '../../../../core/services/sweetalert.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NgxPaginationModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export default class IndexComponent {
  private usuarioService = inject(UsuarioService);
  private sweetAlertService = inject(SweetalertService);

  // propiedades
  usuarios: Usuario[] = [];
  filtroUsuarios: Usuario[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  searchControl = new FormControl('');

  //metodos

  async deleteUsuario(id: number) {
    const confirmado = await this.sweetAlertService.confirm(
      '¿Estás seguro?',
      'Esta acción no se puede deshacer.'
    );
    if (confirmado) {
      return this.usuarioService.deleteUser(id).subscribe((res) => {
        this.filtroUsuarios = this.usuarios.filter(
          (item) => item.usuarioId !== id
        );
        this.sweetAlertService.accepted(
          'Eliminado!',
          'usuario ha sido eliminado.'
        );
      });
    } else {
      return this.sweetAlertService.cancelled(
        'Cancelado',
        'no se ha eliminado el usuario'
      );
    }
  }

  filterTableUser() {
    this.searchControl.valueChanges.subscribe((value) => {
      this.filtroUsuarios = this.usuarios.filter((user) => {
        return (
          user.nombre.toLowerCase().includes(String(value).toLowerCase()) ||
          user.email.toLowerCase().includes(String(value).toLowerCase())
        );
      });
    });
  }

  ngOnInit() {
    this.usuarioService.getUsers().subscribe((users) => {
      this.filtroUsuarios = users;
      this.usuarios = users;
    });

    this.filterTableUser();
  }
}
