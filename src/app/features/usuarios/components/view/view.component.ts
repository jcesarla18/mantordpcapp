import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export default class ViewComponent {
  private usuarioService = inject(UsuarioService);
  private route = inject(ActivatedRoute);
  // propiedades
  id!: number;
  usuario!: Usuario;

  //metodos
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.usuarioService.getUserById(this.id).subscribe((data: Usuario) => {
      this.usuario = data ?? null;
    });
  }

  constructor() {
    this.usuario;
  }
}
