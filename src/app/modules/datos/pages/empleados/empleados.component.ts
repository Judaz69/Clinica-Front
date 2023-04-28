import { Component } from '@angular/core';
import { Empleados } from '../../interfaces/empleados.interface';
import { EmpleadoServiciosService } from '../../services/empleado-servicios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormularioEmpleadoComponent } from '../../components/formulario-empleado/formulario-empleado.component';
import { DataTable } from 'src/app/shared/interfaces/dataTable.interface';
import { TableConfig } from 'src/app/shared/interfaces/tableConfigModel';
import { TablaDatos } from 'src/app/shared/interfaces/tablaDatos.interface';
import { ModalEliminarComponent } from 'src/app/shared/modal-eliminar/modal-eliminar.component';


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

  cedula: string = '';
  hayError: Boolean = false;
  empleados: Empleados[] = [];
  form: FormGroup;
  idTipoEmpleado: number = 0;
  idServicio: number = 0;

  tableConfig: TableConfig =
    {
      showActions: true
    }
  tableColumns: DataTable[] = [];

  constructor(private Empleadoservice: EmpleadoServiciosService,
    private fb: FormBuilder,
    private dialog: MatDialog,) {

    this.form = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      cedula: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    })
  }

  ngOnInit(): void {
    this.listaEmpleados();
    this.setTableColumns();
  }

  setTableColumns() {
    this.tableColumns = [
      { label: 'Nombres', def: 'nombres', dataKey: 'nombres' },
      { label: 'Apellidos', def: 'apellidos', dataKey: 'apellidos' },
      { label: 'Cedula', def: 'cedula', dataKey: 'cedula' },
      { label: 'Servicio', def: 'servicio', dataKey: 'servicio.tipoServicio.nombreServicio', dataType: 'object' },
      { label: 'Puesto', def: 'asignacion', dataKey: 'asignacion.tipoEmpleado.nombreTipo', dataType: 'object' }
    ]
  }

  abrirDialog() {
    const dialogRef = this.dialog.open(FormularioEmpleadoComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.listaEmpleados()
    })
  }

  abrirDialogEditar(data: Empleados) {
    const dialogRef = this.dialog.open(FormularioEmpleadoComponent, {
      data,

    });
    dialogRef.afterClosed().subscribe(result => {
      this.listaEmpleados()
    })
  }

  abrirDialogEliminar(data: Empleados) {

    const tabla: TablaDatos = { nombre: 'empleados', head: 'empleado' }
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      data:{
        datos:data,
        nombreTabla: tabla
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listaEmpleados()
    })
  }

  listaEmpleados() {
    this.Empleadoservice.listaEmpleados().subscribe(data => {
      this.empleados = data;
    })
  }

  buscar() {
    this.hayError = false;
    if (!this.cedula) {
      this.listaEmpleados();
      return;
    }
    this.Empleadoservice.buscarEmpleado(this.cedula)
      .subscribe(
        data => {

          this.empleados = [data];
          this.setTableColumns();
          this.tableConfig = {showActions:true};
          
        },
        (err) => {
          this.hayError = true;
        }
      );
  }

}
