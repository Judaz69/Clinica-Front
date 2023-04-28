import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteServiciosService } from 'src/app/modules/consultas/services/cliente-servicios.service';
import { ConsultasServiciosService } from 'src/app/modules/consultas/services/consultas-servicios.service';
import { EmpleadoServiciosService } from 'src/app/modules/datos/services/empleado-servicios.service';
import { ServiciosService } from 'src/app/modules/datos/services/servicios.service';
import { TipoEmpleadoService } from 'src/app/modules/datos/services/tipo-empleado.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html'
})
export class ModalEliminarComponent {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    private serviciosService: ServiciosService,
    private tipoEmpleadoService: TipoEmpleadoService,
    private consultaServicio: ConsultasServiciosService,
    private Empleadoservice: EmpleadoServiciosService,
    private clienteServicio: ClienteServiciosService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar) { }


  eliminar() {

    if (this.data.nombreTabla.nombre === 'servicios') {
      this.serviciosService.eliminarServicio(this.data.datos.id).subscribe(data => {
        this._snackBar.open('El servicio fue eliminado', 'cerrar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        });
      })
    }

    if (this.data.nombreTabla.nombre === 'tipoEmpleado') {
      this.tipoEmpleadoService.eliminarPuesto(this.data.datos.id).subscribe(data => {
        this._snackBar.open('El puesto fue eliminado', 'cerrar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        });
      })
    }

    if (this.data.nombreTabla.nombre === 'turnos') {
      this.consultaServicio.eliminarConsulta(this.data.datos.id).subscribe(data => {
        this._snackBar.open('El turno fue eliminado', 'cerrar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        });
      })
    }

    if (this.data.nombreTabla.nombre === 'empleados') {
      this.Empleadoservice.eliminarEmpleado(this.data.datos.id).subscribe(data => {
        this._snackBar.open('El empleado fue eliminado del sistema', 'cerrar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        });
      })
    }

    if (this.data.nombreTabla.nombre === 'pacientes') {
      this.clienteServicio.eliminarPaciente(this.data.datos.id).subscribe(data => {
        this._snackBar.open('El paciente fue eliminado del sistema', 'cerrar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        });
      })
    }
  }


}
