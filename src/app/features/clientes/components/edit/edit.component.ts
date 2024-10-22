import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { ClienteService } from '../../services/cliente.service'
import { SweetalertService } from '../../../../core/services/sweetalert.service'
import { Cliente } from '../../models/cliente'

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export default class EditComponent {
  private clienteService = inject(ClienteService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private sweetAlertService = inject(SweetalertService)

  idClienteParams!: number

  // propiedades
  clienteForm!: FormGroup

  // metodos
  constructor() {
    this.clienteForm = new FormGroup({
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
      fechaRegistro: new FormControl(''),
    })
  }

  getDateCliente() {
    this.idClienteParams = this.route.snapshot.params['id']
    this.clienteService
      .getClientById(this.idClienteParams)
      .subscribe((data: Cliente) => {
        this.clienteForm.patchValue({
          clienteId: data.clienteId,
          usuarioId: data.usuarioId,
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.email,
          telefono: data.telefono,
          direccion: data.direccion,
          fechaRegistro: data.fechaRegistro,
        })
      })
  }

  onSubmit() {
    if (this.clienteForm.valid) {
      this.clienteService
        .updateClient(this.idClienteParams, this.clienteForm.value)
        .subscribe(value => {
          this.sweetAlertService.success('Mensaje', 'Cliente actualizado')
          this.router.navigateByUrl('cliente')
        })
    }
  }

  ngOnInit() {
    this.getDateCliente()
  }
}
