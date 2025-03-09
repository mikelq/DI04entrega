import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import {Renderer2, ElementRef, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent  implements OnInit {
  public chart!: Chart;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit():void {
    this.iniChart();

  }

  private iniChart(){
    // datos del chart
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
      // Creamos la gráfica
      const canvas = this.renderer.createElement('canvas');
      this.renderer.setAttribute(canvas, 'id', 'lineChart');
      // Añadimos el canvas al div con id "chartContainer"
      const container = this.el.nativeElement.querySelector('cont-linechart');
      this.renderer.appendChild(container, canvas);
      this.chart = new Chart(canvas, {
        type: 'line' as ChartType, // tipo de la gráfica 
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
                boxWidth: 0,
                font: {
                size: 12,
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
