import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AsignacionServicio } from '../interfaces/asignacionServicio.interface';

@Injectable({
  providedIn: 'root'
})
export class AsignacionServicioService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  listaAsignaciones(): Observable<AsignacionServicio[]>
  {
    const url = `${this.apiUrl}/asignarServicio`;

    return this.http.get<AsignacionServicio[]>(url);
  }
}
