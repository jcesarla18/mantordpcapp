import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { ClienteService } from '../../clientes/services/cliente.service'
import { TokenService } from '../../../core/services/token.service'
import { UsuarioService } from '../../usuarios/service/usuario.service'
import { Usuario } from '../../usuarios/models/usuario'
import { SweetalertService } from '../../../core/services/sweetalert.service'
import { AuthService } from '../../../core/services/auth.service'
import { HttpErrorResponse } from '@angular/common/http'
import { CustomValidator } from '../../../core/utils/customvalidator'

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css',
})
export default class ConfiguracionComponent {
  // inject
  private clienteService = inject(ClienteService)
  private tokenService = inject(TokenService)
  private usuarioService = inject(UsuarioService)
  private sweetAlertService = inject(SweetalertService)
  private authService = inject(AuthService)
  private router = inject(Router)
  // propiedades
  formConfiguracion!: FormGroup
  formUsuario!: FormGroup
  nombre!: string
  apellidos!: string
  email!: string
  rol!: string
  passwordIsValid = false
  formChangePassword = new FormGroup(
    {
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      repeatPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    },
    {
      validators: CustomValidator.mustBeEqual('newPassword', 'repeatPassword'),
    }
  )

  // metodos
  constructor() {}
  ngOnInit(): void {
    this.formConfiguracion = new FormGroup({
      clienteId: new FormControl(''),
      usuarioId: new FormControl(''),
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      apellido: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl(''),
      direccion: new FormControl(''),
    })

    this.getPerfilPublico()
  }

  getPerfilPublico() {
    const { nameid } = this.tokenService.getObjectToken()
    this.usuarioService.getUserById(nameid).subscribe(usuario => {
      if (usuario.clientes != undefined) {
        const datosUsuario = usuario.clientes[0]
        this.nombre = datosUsuario.nombre.toUpperCase()
        this.apellidos = datosUsuario.apellido.toUpperCase()
        this.email = datosUsuario.email.toUpperCase()
        this.rol = usuario.rol != null ? usuario.rol.toUpperCase() : ''
      }
    })
  }

  getDataUsuario(): void {
    const { nameid } = this.tokenService.getObjectToken()

    this.usuarioService.getUserById(nameid).subscribe(usuario => {
      if (usuario.clientes != undefined) {
        const datosUsuario = usuario.clientes[0]
        this.formConfiguracion.patchValue({
          clienteId: datosUsuario.clienteId,
          usuarioId: datosUsuario.usuarioId,
          nombre: datosUsuario.nombre,
          apellido: datosUsuario.apellido,
          email: datosUsuario.email,
          telefono: datosUsuario.telefono,
          direccion: datosUsuario.direccion,
        })
      }
    })
  }

  updateDataUsuario(): void {
    if (this.formConfiguracion.valid) {
      // update usuario
      const formdata = this.formConfiguracion.value
      const usuarioData: Usuario = {
        usuarioId: formdata.usuarioId,
        email: formdata.email,
        nombre: formdata.nombre,
        contrasena: '',
        rol: '',
      }
      this.usuarioService
        .updateUser(formdata.usuarioId, usuarioData)
        .subscribe({
          next: data => {
            // update cliente
            this.clienteService
              .updateClient(
                this.formConfiguracion.value.clienteId,
                this.formConfiguracion.value
              )
              .subscribe({
                next: data => {
                  this.sweetAlertService.success(
                    'Mensaje',
                    'Usuario Actualizado'
                  )
                  this.router.navigateByUrl('configuracion')
                },
                error: error => {
                  console.log(error)
                },
              })
          },
          error: response => {
            console.log(response)
          },
        })
    }
  }

  changePassword(): void {
    const { nameid } = this.tokenService.getObjectToken()
    const dataUsuario: Usuario = {
      usuarioId: nameid,
      email: '',
      nombre: '',
      contrasena: this.formChangePassword.value.newPassword ?? '',
      rol: '',
    }
    this.usuarioService.updateUser(nameid, dataUsuario).subscribe({
      next: data => {
        console.log(data)
        this.sweetAlertService.success(
          'Mensaje',
          'Contraseña actualizada, se recomienda session'
        )
        this.router.navigateByUrl('configuracion')
      },
      error: error => {
        console.log(error)
      },
    })
  }

  checkPassword(): void {
    const { nameid } = this.tokenService.getObjectToken()
    const dataUsuario: Usuario = {
      usuarioId: nameid,
      email: '',
      nombre: '',
      contrasena: this.formChangePassword.value.password ?? '',
      rol: '',
    }
    this.authService.checkPassword(dataUsuario).subscribe({
      next: data => {
        this.passwordIsValid = data
      },
      error: (error: HttpErrorResponse) => {
        this.passwordIsValid = error.ok
      },
    })
  }
  closeSession(): void {
    this.authService.logout()
  }
}
