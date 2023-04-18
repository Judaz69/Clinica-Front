import { Component, Inject, OnInit } from '@angular/core';
import { Empleados } from '../../interfaces/empleados.interface';
import { EmpleadoServiciosService } from '../../services/empleado-servicios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoEmpleado } from '../../interfaces/tipoEmpleado.interface';
import { TipoEmpleadoService } from '../../services/tipo-empleado.service';
import { ServiciosService } from '../../services/servicios.service';
import { Servicios } from '../../interfaces/servicios.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formulario-empleado',
  templateUrl: './formulario-empleado.component.html'
})
export class FormularioEmpleadoComponent implements OnInit {

  empleados: Empleados[] = [];
  tipoEmpleados: TipoEmpleado[] = [];
  tipoServicios: Servicios[] = [];
  form: FormGroup;
  idTipoEmpleado: number = 0;
  idServicio: number = 0;

  constructor(private tipoEmpleado: TipoEmpleadoService,
    private Empleadoservice: EmpleadoServiciosService,
    private servicioService: ServiciosService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Empleados) {

    this.form = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      cedula: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    })

  }
  ngOnInit(): void {
    this.listarPuestos();
    this.listarServicios();
  }

  campoEsValido(campo : string){
    return this.form.controls[campo].errors && this.form.controls[campo].touched
  }

  registrar()
  {
    const data: any = {
      id: this.data == null ? 0 : this.data.id,
      nombres: this.form.get('nombres')?.value,
      apellidos: this.form.get('apellidos')?.value,
      cedula: this.form.get('cedula')?.value
    }

    if (this.form.invalid)
    {
      this.form.markAllAsTouched();
      return;
    }

    if(this.data)
    {
      /*this.Empleadoservice.(this.data.id,data).subscribe(data => {
        this.form.reset();
        this._snackBar.open('Datos editados con exito', 'cerrar', {
          duration: 3000
        });
      })*/
    }
    else
    {
      this.Empleadoservice.nuevoEmpleado(this.idTipoEmpleado,this.idServicio,data).subscribe(data =>{
        this.form.reset();
        this._snackBar.open('El paciente fue ingresado con exito', 'cerrar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        });
      })
    }   
  }

  listarServicios() {
    this.servicioService.listaServicios().subscribe(data => {
      this.tipoServicios = data;
    })
  }

  listarPuestos() {
    this.tipoEmpleado.listaPuestos().subscribe(data => {
      this.tipoEmpleados = data;
    })
  }

  eliminar(cedulaEmpleado: string) {
    this.Empleadoservice.eliminarEmpleado(cedulaEmpleado).subscribe(data => {

    })
  }

}
