import { Component, Input } from '@angular/core';
import { ClienteServiciosService } from '../../services/cliente-servicios.service';
import { Pacientes } from '../../interfaces/clienter.interface';

@Component({
  selector: 'app-borrar-paciente',
  templateUrl: './borrar-paciente.component.html'
})
export class BorrarPacienteComponent {

  @Input() cedulaPacienteRe: string | undefined;
  pacientes: Pacientes [] = [];

  constructor(private clienteServicio: ClienteServiciosService){}


  listar()
  {
    this.clienteServicio.listaPacientes().subscribe(data => {
      this.pacientes = data;
    })
  }
  
  eliminar(){
      this.clienteServicio.eliminarPaciente(this.cedulaPacienteRe).subscribe(data => {
        this.listar();
      })
  }
}
