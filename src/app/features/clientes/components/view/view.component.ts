import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export default class ViewComponent {
  // inject
  private clienteService = inject(ClienteService);
  private route = inject(ActivatedRoute);

  // propiedades
  idRouteParam!: number;
  cliente!: Cliente;

  // metodos
  ngOnInit() {
    this.idRouteParam = this.route.snapshot.params['id'];
    this.clienteService
      .getClientById(this.idRouteParam)
      .subscribe((cliente) => {
        this.cliente = cliente;
      });
  }
}
