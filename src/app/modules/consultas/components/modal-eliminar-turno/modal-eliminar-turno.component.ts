import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConsultasServiciosService } from '../../services/consultas-servicios.service';
import { Consulta } from '../../interfaces/consultas.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-eliminar-turno',
  templateUrl: './modal-eliminar-turno.component.html'
})
export class ModalEliminarTurnoComponent {

  constructor(@Inject(MAT_DIALOG_DATA) private data: Consulta,
  private consultaServicio: ConsultasServiciosService,
  private _snackBar: MatSnackBar){}


  eliminar(){
    this.consultaServicio.eliminarConsulta(this.data.id).subscribe(data => {
      this._snackBar.open('El servicio fue eliminado', 'cerrar', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000
      });
    })
  }
}
