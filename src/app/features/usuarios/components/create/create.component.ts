import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { SweetalertService } from '../../../../core/services/sweetalert.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export default class CreateComponent {
  private formBuilder = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  private sweetAlertService = inject(SweetalertService);
  // propiedades
  formularioUsuario: FormGroup;

  onSubmit() {
    return this.usuarioService
      .createUser(this.formularioUsuario.value)
      .subscribe((res) => {
        this.sweetAlertService.success('Mensaje', 'Usuario registrado');
        this.router.navigateByUrl('/usuario');
      });
  }

  constructor() {
    this.formularioUsuario = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      rol: ['', [Validators.required]],
      fechaCreacion: new Date(),
    });
  }
}
