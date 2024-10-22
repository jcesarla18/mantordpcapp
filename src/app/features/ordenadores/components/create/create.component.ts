import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { OrdenadoresService } from '../../services/ordenadores.service'
import { SweetalertService } from '../../../../core/services/sweetalert.service'
import { MarcasService } from '../../services/marcas.service'
import { Ordenadores } from '../../models/ordenadores'
import { UsuarioService } from '../../../usuarios/service/usuario.service'

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export default class CreateComponent {
  // inject
  private ordernadoresService = inject(OrdenadoresService)
  private usuarioService = inject(UsuarioService)
  private sweetAlertService = inject(SweetalertService)
  private router = inject(Router)
  private marcas = inject(MarcasService)
  private formBuilder = inject(FormBuilder)
  // propiedades
  marcasOrdenadores = this.marcas.listaMarcasOrdenadores
  codigoCliente!: number

  formOrdernadores: FormGroup = this.formBuilder.group({
    ordenadorId: [0],
    clienteId: [0],
    marca: ['', [Validators.required]],
    modelo: [''],
    numeroSerie: [''],
    fechaCompra: new Date(),
    fechaRegistro: new Date(),
  })

  // metodos
  ngOnInit() {
    this.usuarioService.getDataUsuario().subscribe(usuario => {
      if (usuario.clientes) {
        this.codigoCliente = usuario.clientes[0].clienteId
      }
    })
  }
  onSaved(): void {
    if (this.formOrdernadores.valid) {
      this.formOrdernadores.value.clienteId = this.codigoCliente

      const ordenador: Ordenadores = this.formOrdernadores.value
      ordenador.clienteId = this.codigoCliente
      ordenador.fechaCompra = new Date(this.formOrdernadores.value.fechaCompra)

      this.ordernadoresService.createOrdenadores(ordenador).subscribe(res => {
        this.sweetAlertService.success('Mensaje', 'Ordenador Registrado')
        this.router.navigateByUrl('/ordenadores')
      })
    }
  }
  constructor() {
    this.usuarioService.getDataUsuario().subscribe(usuario => {
      if (usuario.clientes) {
        this.codigoCliente = usuario.clientes[0].clienteId
      }
    })
  }
}
