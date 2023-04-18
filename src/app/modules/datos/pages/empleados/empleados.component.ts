import { Component } from '@angular/core';
import { Empleados } from '../../interfaces/empleados.interface';
import { EmpleadoServiciosService } from '../../services/empleado-servicios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormularioEmpleadoComponent } from '../../components/formulario-empleado/formulario-empleado.component';
import { ModalBorrarEmpleadoComponent } from '../../components/modal-borrar-empleado/modal-borrar-empleado.component';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styles: [
    `
      li { 
        cursor: pointer;
      }

      svg{
        cursor: pointer;
      }
    `
  ]
})
export class EmpleadosComponent {

  cedula:string='';
  hayError: Boolean = false;
  empleados: Empleados [] = [];
  form: FormGroup;
  idTipoEmpleado: number = 0;
  idServicio: number = 0;

  headArray = [
    {'Head': 'nombres', 'FieldName': 'Nombres'},
    {'Head': 'apellidos', 'FieldName': 'Apellidos'},
    {'Head': 'cedula', 'FieldName': 'Cedula'},
    //{'Head': 'asignacion?.tipoEmpleado?.nombreTipo','FieldName': 'Puesto'},
    {'Head': 'asignacion','FieldName': 'Puesto'},
    //{'Head': 'servicio?.tipoServicio?.nombreServicio', 'FieldName': 'Servicio'},
    {'Head': 'servicio', 'FieldName': 'Servicio'},
    {'Head': 'Action', 'FieldName': ''}
  ];

  constructor(private Empleadoservice : EmpleadoServiciosService,
              private fb: FormBuilder,
              private dialog: MatDialog,){

    this.form = this.fb.group({
      nombres:['',[Validators.required, Validators.minLength(3)]],
      apellidos:['',[Validators.required, Validators.minLength(3)]],
      cedula:['',[Validators.required, Validators.minLength(10), Validators.maxLength(10) ]]
    })
  }

  ngOnInit(): void {
    this.listaEmpleados();
  }

  abrirDialog()
  {
    const dialogRef = this.dialog.open(FormularioEmpleadoComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.listaEmpleados()
    })
  }

  abrirDialogEditar(data: Empleados)
  { 
    const dialogRef = this.dialog.open(FormularioEmpleadoComponent, {
      data,
      
    });
    dialogRef.afterClosed().subscribe(result => {
      this.listaEmpleados()
    })
  }

  
  abrirDialogEliminar(data: Empleados)
  {
    const dialogRef = this.dialog.open(ModalBorrarEmpleadoComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listaEmpleados()
    })
  }


  listaEmpleados()
  {
    this.Empleadoservice.listaEmpleados().subscribe(data => {
      this.empleados = data;
    })
  }

  buscar(){
    this.hayError = false;  
    this.empleados = [];
    if(!this.cedula)
    {
      this.listaEmpleados();
      return;
    }
    this.Empleadoservice.buscarEmpleado(this.cedula).
      subscribe( (empleados) => {

        this.empleados.push(empleados);

      }, (err) => {

        this.hayError = true;
      }
      )

  }

}
