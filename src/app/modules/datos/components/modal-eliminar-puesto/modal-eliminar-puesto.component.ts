import { Component, Inject } from '@angular/core';
import { TipoEmpleado } from '../../interfaces/tipoEmpleado.interface'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoEmpleadoService } from '../../services/tipo-empleado.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-eliminar-puesto',
  templateUrl: './modal-eliminar-puesto.component.html'
})
export class ModalEliminarPuestoComponent {

  constructor(@Inject(MAT_DIALOG_DATA) private data: TipoEmpleado,
  private tipoEmpleadoService : TipoEmpleadoService,
  private _snackBar: MatSnackBar)
  {

  }

  eliminar(){
    this.tipoEmpleadoService.eliminarPuesto(this.data.id).subscribe(data => {
      this._snackBar.open('El servicio fue eliminado', 'cerrar', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000
      });
    })
  }
}
