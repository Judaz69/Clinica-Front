import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consulta } from '../interfaces/consultas.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ConsultasServiciosService {
  
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  listaConsultas(): Observable<Consulta[]>
  {
    const url = `${this.apiUrl}/turnos`;

    return this.http.get<Consulta[]>(url);
  }

  nuevaConsulta(data: Consulta): Observable<Consulta> 
  {
    const url = `${this.apiUrl}/turnos`;
    return this.http.post<Consulta>(url,data);
  }

  eliminarConsulta(id: number): Observable<Consulta> 
  {
    const url = `${this.apiUrl}/turnos/${id}`;

    return this.http.delete<Consulta>(url);
  }

}
