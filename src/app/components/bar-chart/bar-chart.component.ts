import {Renderer2, ElementRef, Input } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { GestionApiService } from 'src/app/services/gestion-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent  implements OnInit {
  @Input() bgColorCategorias: string[] = [];
  @Input() coloresCategorias: string[] = [];

  @Input() chartSelected: string = "";

  public chart!: Chart;

  constructor(private el: ElementRef, private renderer: Renderer2, private gestionServiceApi: GestionApiService) { }

  public dataAPI: { categoria: string; totalResults: number }[] = [];


  ngOnInit() :void {
    this.iniChart();
    this.gestionServiceApi.datos$.subscribe((datos) => {
      if (datos != undefined) {
        // si recibe dato, añadimos el objetoa dataAPI
        this.dataAPI.push({
          categoria: datos.categoria,
          totalResults: datos.totalResults
        });
        // actualiza el grafico
        this.updateChart();
      }
    });
  }
  private updateChart(): void {
    const datasetsByCompany: { [key: string]: { label: string; data: number[]; backgroundColor: string[]; borderColor: string[]; borderWidth: number } } = {};
      // recorremos los datos de API
      this.dataAPI.forEach((row, index) => {
        const { categoria, totalResults } = row;
      
        if (!datasetsByCompany[categoria]) {
          datasetsByCompany[categoria] = {
            label: `Valores de ${categoria}`,
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
          };
        }
        datasetsByCompany[categoria].data[index] = totalResults;
        datasetsByCompany[categoria].backgroundColor[index] = this.bgColorCategorias[index];
        datasetsByCompany[categoria].borderColor[index] = this.coloresCategorias[index];
      });

      // Actualizamos el gráfico
      this.chart.data.labels = this.dataAPI.map((row: { categoria: string; totalResults: number }) => row.categoria);
      this.chart.data.datasets = Object.values(datasetsByCompany);
  
      this.chart.update();
    }
    private iniChart() {
      let data = null;
  
      if (this.chartSelected === "bar-chart") {
        // datos del chart
        data = {
  
          labels: [],
          datasets: [{
            label: 'My First Dataset',
            data: [],
            fill: false,
            tension: 0.1
          }]
        };
      } else {
        data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            tension: 0.1
          }]
        };
      }
      // Creamos la gráfica
    const canvas = this.renderer.createElement('canvas');
    this.renderer.setAttribute(canvas, 'id', 'barChart');
    // Añadimos el canvas al div con id "chartContainer"
    const container = this.el.nativeElement.querySelector('cont-barchart');
    this.renderer.appendChild(container, canvas);
    this.chart = new Chart(canvas, {
      type: 'bar' as ChartType, // tipo de la gráfica 
      data: data, // datos 
      options: { // opciones de la gráfica
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            labels: {
              generateLabels: (chart) => {
                return chart.data.labels!.map((label, index) => ({
                  text: label as string,
                  fillStyle: this.bgColorCategorias[index],
                  strokeStyle: this.coloresCategorias[index],
                }));
              }
            },
          }
        },
      }
    });
    this.chart.canvas.width = 100;
    this.chart.canvas.height = 100;
  }
}