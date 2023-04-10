import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoEmpleado } from '../interfaces/tipoEmpleado.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoEmpleadoService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  listaPuestos(): Observable<TipoEmpleado[]>
  {
    const url = `${this.apiUrl}/tipoEmpleado`;

    return this.http.get<TipoEmpleado[]>(url);
  }

  nuevoPuesto(data: TipoEmpleado): Observable<TipoEmpleado> 
  {
    const url = `${this.apiUrl}/tipoEmpleado`;
    return this.http.post<TipoEmpleado> (url,data);
  }

  eliminarPuesto(id: number): Observable<TipoEmpleado> 
  {
    const url = `${this.apiUrl}/tipoEmpleado/${id}`;

    return this.http.delete<TipoEmpleado>(url);
  }

  actualizarPuesto(id: number, data: TipoEmpleado): Observable<TipoEmpleado>
  {
    const url = `${this.apiUrl}/tipoEmpleado/${id}`;

    return this.http.put<TipoEmpleado>(url,data);
  }
}
