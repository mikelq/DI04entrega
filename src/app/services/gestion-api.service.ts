import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { datosNoticias } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GestionApiService {
//Datos API
  apiKey: string = environment.apiKey;
  apiUrl: string = environment.apiUrl;

  private datosSubject: BehaviorSubject<{ categoria: string; totalResults: number }|undefined> = new BehaviorSubject<{ categoria: string; totalResults: number }|undefined>(undefined);
  public datos$: Observable<{ categoria: string; totalResults: number }|undefined> = this.datosSubject.asObservable();

  constructor(private articuloshttp: HttpClient) { }

  public cargarCategoria(categoria: string) {
    //Realizamos la llamada api y obtenemos observable de tipo datosNoticias
    let datos: Observable<datosNoticias> = this.articuloshttp.get<datosNoticias>("https://newsapi.org/v2/top-headlines?country=us&category="+categoria +"&apiKey="+this.apiKey);
    datos.subscribe( data => {
      if (data && data.totalResults !== undefined) {
        this.datosSubject.next({ categoria: categoria, totalResults: data.totalResults });
      } else {
        console.error('La propiedad totalResults no está definida en la respuesta:', data);
      }
    });
  }
}