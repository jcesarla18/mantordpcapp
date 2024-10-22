import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export default class InicioComponent {
  // propiedades
  chartLine: any;
  chartPie: any;
  chartBar: any;
  chartRadar: any;

  months: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciemnbre',
  ];

  // metodos

  charLineReparaciones() {
    const ctx = document.getElementById('chartLine') as HTMLCanvasElement;
    this.chartLine = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.months,
        datasets: [
          {
            label: 'Reparaciones',
            data: [65, 59, 80, 81, 56, 55, 40, 70, 30],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
    });
  }

  charPieEstadoReparaciones() {
    const ctx = document.getElementById('chartPie') as HTMLCanvasElement;
    this.chartPie = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Recepcionados', 'En marcha', 'Pendientes', 'Atendidos'],
        datasets: [
          {
            data: [40, 10, 30, 250],
            backgroundColor: [
              'rgb(227, 214, 0 )',
              'rgb(227, 145, 0 )',
              'rgb(227, 90, 0 )',
              'rgb(0, 227, 41 )',
            ],
            hoverOffset: 4,
          },
        ],
      },
    });
  }

  chartBarReparaciones() {
    const ctx = document.getElementById('chartBar') as HTMLCanvasElement;
    this.chartBar = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [
          {
            label: 'Herramientas',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  chartRadarReparaciones() {
    const ctx = document.getElementById('chartRadar') as HTMLCanvasElement;
    this.chartBar = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: [
          'Placa Madre',
          'Procesadores',
          'Hdd - Sdd',
          'Fuente de poder',
          'Tarjeta grafica',
          'Pasta Termica',
          'Memoria Ram',
        ],
        datasets: [
          {
            label: 'Base 1',
            data: [65, 59, 90, 81, 56, 55, 40],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)',
          },
          {
            label: 'Base 2',
            data: [28, 48, 40, 19, 96, 27, 100],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)',
          },
        ],
      },
      options: {
        elements: {
          line: {
            borderWidth: 3,
          },
        },
      },
    });
  }

  ngOnInit() {
    this.charLineReparaciones();
    this.charPieEstadoReparaciones();
    this.chartBarReparaciones();
    this.chartRadarReparaciones();
  }
}
