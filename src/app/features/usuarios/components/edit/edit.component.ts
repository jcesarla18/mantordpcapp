import { Component, inject } from '@angular/core'
import { UsuarioService } from '../../service/usuario.service'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { Usuario } from '../../models/usuario'
import { CommonModule } from '@angular/common'
import { SweetalertService } from '../../../../core/services/sweetalert.service'

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export default class EditComponent {
  private usuarioService = inject(UsuarioService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private sweetAlertService = inject(SweetalertService)
  // propiedades
  id!: number
  usuario!: Usuario
  formularioUsuario!: FormGroup

  //metodos
  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.usuarioService.getUserById(this.id).subscribe((data: Usuario) => {
      this.formularioUsuario.patchValue({
        usuarioId: data.usuarioId,
        nombre: data.nombre,
        email: data.email,
        contrasena: '',
        rol: data.rol,
      })
    })
  }

  onSubmit() {
    if (this.formularioUsuario.valid) {
      this.usuarioService
        .updateUser(this.id, this.formularioUsuario.value)
        .subscribe(() => {
          this.sweetAlertService.success('Mensaje', 'Usuario actualizado')
          this.router.navigateByUrl('usuario')
        })
    }
  }

  constructor() {
    this.formularioUsuario = new FormGroup({
      usuarioId: new FormControl(),
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contrasena: new FormControl('', [Validators.minLength(8)]),
      rol: new FormControl('', [Validators.required]),
    })
  }
}
