import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servicios } from '../interfaces/servicios.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  listaServicios(): Observable<Servicios[]>
  {
    const url = `${this.apiUrl}/servicios`;

    return this.http.get<Servicios[]>(url);
  }

  nuevoServicio(data: Servicios): Observable<Servicios> 
  {
    const url = `${this.apiUrl}/servicios`;
    return this.http.post<Servicios>(url,data);
  }

  eliminarServicio(id: number): Observable<Servicios> 
  {
    const url = `${this.apiUrl}/servicios/${id}`;

    return this.http.delete<Servicios>(url);
  }

  actualizarServicio(id: number, data: Servicios): Observable<Servicios>
  {
    const url = `${this.apiUrl}/servicios/${id}`;

    return this.http.put<Servicios>(url,data);
  }
}
