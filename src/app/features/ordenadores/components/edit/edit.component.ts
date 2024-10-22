import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { OrdenadoresService } from '../../services/ordenadores.service'
import { SweetalertService } from '../../../../core/services/sweetalert.service'
import { MarcasService } from '../../services/marcas.service'
import { Ordenadores } from '../../models/ordenadores'
import moment from 'moment'

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export default class EditComponent {
  // inject
  private ordenadoresService = inject(OrdenadoresService)
  private sweetAlertService = inject(SweetalertService)
  private route = inject(ActivatedRoute)
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
  idOrdenador!: number

  // metodos
  ngOnInit() {
    this.idOrdenador = this.route.snapshot.params['id']
    this.ordenadoresService
      .getOrdenadoresById(this.idOrdenador)
      .subscribe((data: Ordenadores) => {
        this.formOrdernadores.patchValue({
          ordenadorId: data.ordenadorId,
          clienteId: data.clienteId,
          marca: data.marca,
          modelo: data.modelo,
          numeroSerie: data.numeroSerie,
          fechaCompra: moment(data.fechaCompra).format('YYYY-MM-DD'),
          fechaRegistro: data.fechaCompra,
        })
      })
  }

  onSubmit() {
    if (this.formOrdernadores.valid) {
      this.ordenadoresService
        .updateOrdenadores(this.idOrdenador, this.formOrdernadores.value)
        .subscribe({
          next: value => {
            this.sweetAlertService.success('Mensaje', 'Ordenador actualizado')
            this.router.navigateByUrl('ordenadores')
          },
          error: err => {
            console.log(err)
          },
        })
    }
  }
}
