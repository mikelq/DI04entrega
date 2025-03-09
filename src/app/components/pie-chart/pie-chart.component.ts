import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import {Renderer2, ElementRef, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent  implements OnInit {
  public chart: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {}
 
  ngOnInit():void {
      this.iniChart();
  }

  private iniChart(){
    
    const data = {
      labels: [
        'Red',
        'Green',
        'Yellow',
        'Grey',
        'Blue'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)'
        ]
      }]
    };

    // Creamos la gráfica
    const canvas = this.renderer.createElement('canvas');
    this.renderer.setAttribute(canvas, 'id', 'pieChart');
  
    // Añadimos el canvas al div con id "chartContainer"
    const container = this.el.nativeElement.querySelector('#cont-piechart');
    this.renderer.appendChild(container, canvas);
 
     // Creamos la gráfica
    this.chart = new Chart(canvas, {
      type: 'pie' as ChartType, // tipo de la gráfica 
      data: data, // datos 
    });
  }
 
}