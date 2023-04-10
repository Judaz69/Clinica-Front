import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pacientes } from '../interfaces/clienter.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiciosService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  listaPacientes (): Observable<Pacientes[]> {

    const url = `${this.apiUrl}/pacientes`;

    return this.http.get<Pacientes[]>(url);
  }

  nuevoPaciente(data: Pacientes): Observable<Pacientes> 
  {
    const url = `${this.apiUrl}/pacientes`;
    return this.http.post<Pacientes>(url,data);
  }

  buscarPacientes(cedula: string): Observable<Pacientes> {

    const url = `${this.apiUrl}/pacientes/${cedula}`;

    return this.http.get<Pacientes>(url);
  }

  eliminarPaciente(cedula: string | undefined): Observable<Pacientes> 
  {
    const url = `${this.apiUrl}/pacientes/${cedula}`;

    return this.http.delete<Pacientes>(url);
  }

  actualizarPaciente(id: number, data: Pacientes): Observable<Pacientes>
  {
    const url = `${this.apiUrl}/pacientes/${id}`;

    return this.http.put<Pacientes>(url,data);
  }

}
