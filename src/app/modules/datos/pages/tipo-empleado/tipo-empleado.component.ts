import { Component, OnInit } from '@angular/core';
import { TipoEmpleadoService } from '../../services/tipo-empleado.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoEmpleado } from '../../interfaces/tipoEmpleado.interface';
import { MatDialog } from '@angular/material/dialog';
import { FormularioTipoempleadoComponent } from '../../components/formulario-tipoempleado/formulario-tipoempleado.component';
import { ModalEliminarComponent } from 'src/app/shared/modal-eliminar/modal-eliminar.component';
import { DataTable } from 'src/app/shared/interfaces/dataTable.interface';
import { TableConfig } from 'src/app/shared/interfaces/tableConfigModel';
import { TablaDatos } from 'src/app/shared/interfaces/tablaDatos.interface';

@Component({
  selector: 'app-tipo-empleado',
  templateUrl: './tipo-empleado.component.html',
  styles: [
    `
      li { 
        cursor: pointer;
      }

      a{
        cursor: pointer;
      }

      svg{
        cursor: pointer;
      }
    `
  ]
})
export class TipoEmpleadoComponent implements OnInit {

  puestos: TipoEmpleado[]=[];
  form: FormGroup;
  tableColumns: DataTable[] = [];
  tableConfig: TableConfig =
  {
    showActions: true
  }

  headArray = [
    {'Head': 'nombreTipo', 'FieldName': 'Puesto laboral'},
    {'Head': 'Action', 'FieldName': ''}
  ];

  constructor(private tipoEmpleadoService : TipoEmpleadoService, private fb: FormBuilder,
    private dialog: MatDialog) {
    this.form = this.fb.group({
      nombreTipo:['',[Validators.required, Validators.minLength(3)]],
    })
  }

  ngOnInit(): void {
    this.listarPuestos();
    this.setTableColumns();
  }

  setTableColumns()
  {
    this.tableColumns = [
      {label: 'Puestos laborales', def: 'nombreTipo', dataKey: 'nombreTipo'},
    ]
  }

  abrirDialog()
  {
    const dialogRef = this.dialog.open(FormularioTipoempleadoComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.listarPuestos();
    })
  }

  abrirDialogEditar(data: TipoEmpleado)
  { 
    const dialogRef = this.dialog.open(FormularioTipoempleadoComponent, {
      data,
      
    });
    dialogRef.afterClosed().subscribe(result => {
      this.listarPuestos();
    })
  }

  abrirDialogEliminar(data: TipoEmpleado)
  {
    const tabla: TablaDatos = { nombre: 'tipoEmpleado', head: 'puesto' }

    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      data:{
        datos:data,
        nombreTabla: tabla
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarPuestos();
    })
  }

  listarPuestos()
  {
    this.tipoEmpleadoService.listaPuestos().subscribe(data => {
      this.puestos = data;
    })
  }

}
