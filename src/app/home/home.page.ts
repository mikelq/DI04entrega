import { Component, OnInit } from '@angular/core';
import { GestionApiService } from '../services/gestion-api.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  categorias: string[] = [
    "business",
    "entertainment",
    "general",
    "technology",
    "health",
    "science",
    "sports"
  ];

  backgroundColorCat: string[] = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)'
  ];

  borderColorCat: string[] =[
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
  ];

  chartSeleccionado: string = "bar-chart";

  // Atributos para la consulta de la API
  apiKey: string = environment.apiKey;
  apiUrl: string = environment.apiUrl;

  constructor(public gestionServiceApi : GestionApiService) {}
  ngOnInit() {
    //llamamos a la API por cada categoria en array de categorias
    this.categorias.forEach(categoria => {
      this.gestionServiceApi.cargarCategoria(categoria);
    });
  }

  //Gestion de segmento
  segmentChanged(event: any) {
    //obtenemos el tipo de chart seleccionado
    this.chartSeleccionado = event.detail.value;
    //si el seleccionado es el bar-chart, llama a la API
    if (this.chartSeleccionado == "bar-chart"){
      this.categorias.forEach(categoria => {
        this.gestionServiceApi.cargarCategoria(categoria);
      });
    }
  }

}
