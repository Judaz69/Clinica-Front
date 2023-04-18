import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empleados } from '../../interfaces/empleados.interface';
import { EmpleadoServiciosService } from '../../services/empleado-servicios.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-borrar-empleado',
  templateUrl: './modal-borrar-empleado.component.html'
})
export class ModalBorrarEmpleadoComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Empleados,
  private Empleadoservice: EmpleadoServiciosService,
  private _snackBar: MatSnackBar,){}
  
  eliminar(){
    this.Empleadoservice.eliminarEmpleado(this.data.cedula).subscribe(data => {
      this._snackBar.open('El empleado fue eliminado del sistema', 'cerrar', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000
      });
    })
  }
}
