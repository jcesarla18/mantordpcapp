import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { OrdenadoresService } from '../../services/ordenadores.service'
import { Ordenadores } from '../../models/ordenadores'
import moment from 'moment'

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export default class ViewComponent {
  // inject
  private route = inject(ActivatedRoute)
  private formBuilder = inject(FormBuilder)
  private ordenadoresService = inject(OrdenadoresService)
  //propiedades

  idOrdenador!: number
  listaOrdenadores: Ordenadores[] = []

  // metodos
  // metodos
  ngOnInit() {
    this.idOrdenador = this.route.snapshot.params['id']
    this.ordenadoresService
      .getOrdenadoresById(this.idOrdenador)
      .subscribe(data => {
        this.listaOrdenadores.push(data)
      })
  }
}
