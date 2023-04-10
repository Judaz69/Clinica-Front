import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleados } from '../interfaces/empleados.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoServiciosService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  listaEmpleados(): Observable<Empleados[]>
  {
    const url = `${this.apiUrl}/empleados`;

    return this.http.get<Empleados[]>(url);
  }

  buscarEmpleado (cedula: string) : Observable<Empleados> {

    const url = `${this.apiUrl}/empleados/${cedula}`;

    return this.http.get<Empleados>(url);
  }

  nuevoEmpleado(idTipoEmpleado: number, idServicio: number, data: Empleados): Observable<Empleados> 
  {
    const url = `${this.apiUrl}/empleados?id_tipo_empleado=${idTipoEmpleado}&id_servicio=${idServicio}`;
    return this.http.post<Empleados>(url,data);
  }

  eliminarEmpleado(cedula: string): Observable<Empleados> 
  {
    const url = `${this.apiUrl}/empleados/${cedula}`;

    return this.http.delete<Empleados>(url);
  }

}
