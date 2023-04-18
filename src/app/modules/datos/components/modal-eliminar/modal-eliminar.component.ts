import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiciosService } from '../../services/servicios.service';
import { Servicios } from '../../interfaces/servicios.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html'
})
export class ModalEliminarComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private data: Servicios,
  private serviciosService: ServiciosService,
  private _snackBar: MatSnackBar)
  {

  }

  eliminar(){
    this.serviciosService.eliminarServicio(this.data.id).subscribe(data => {
      this._snackBar.open('El servicio fue eliminado', 'cerrar', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000
      });
    })
  }
}
