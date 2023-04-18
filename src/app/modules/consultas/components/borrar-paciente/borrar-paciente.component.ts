import { Component, Inject, Input } from '@angular/core';
import { ClienteServiciosService } from '../../services/cliente-servicios.service';
import { Pacientes } from '../../interfaces/clienter.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-borrar-paciente',
  templateUrl: './borrar-paciente.component.html'
})
export class BorrarPacienteComponent {

  @Input() cedulaPacienteRe: string | undefined;
  pacientes: Pacientes [] = [];

  constructor(private clienteServicio: ClienteServiciosService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: Pacientes,
    ){}

  
  eliminar(){
    this.clienteServicio.eliminarPaciente(this.data.cedula).subscribe(data => {
      this._snackBar.open('El paciente fue eliminado del sistema', 'cerrar', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000
      });
    })
  }
}
