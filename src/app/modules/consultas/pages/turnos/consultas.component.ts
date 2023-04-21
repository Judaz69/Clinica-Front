import { Component } from '@angular/core';
import { Consulta } from '../../interfaces/consultas.interface';
import { ConsultasServiciosService } from '../../services/consultas-servicios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteServiciosService } from '../../services/cliente-servicios.service';
import { Pacientes } from '../../interfaces/clienter.interface';
import { MatDialog } from '@angular/material/dialog';
import { FormularioTurnosComponent } from '../../components/formulario-turnos/formulario-turnos.component';
import { ModalEliminarTurnoComponent } from '../../components/modal-eliminar-turno/modal-eliminar-turno.component';
import { TableConfig } from 'src/app/shared/interfaces/tableConfigModel';
import { DataTable } from 'src/app/shared/interfaces/dataTable.interface';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styles: [
    `
      li { 
        cursor: pointer;
      }
    `
  ]
})
export class ConsultasComponent {

  hayError: Boolean = false;
  consultas: Consulta [] = [];
  pacientes: Pacientes [] = [];
  cedula:string='';
  tableColumns: DataTable[] = [];
  tableConfig: TableConfig =
  {
    showActions: true
  }
  
  form: FormGroup;
  idPaciente: number = 0;
  idServicio: number = 0;

  headArray = [
    {'Head': 'paciente', 'FieldName': 'Nombres'},
    {'Head': 'paciente', 'FieldName': 'Apellidos'},
    {'Head': 'servicioEmpleado', 'FieldName': 'Cedula'},
    {'Head': 'horaConsulta', 'FieldName': 'Hora'},
    {'Head': 'Action', 'FieldName': ''}
  ];

  constructor(private consultaServicio: ConsultasServiciosService,
              private pacienteServicio: ClienteServiciosService,
              private fb: FormBuilder,
              private dialog: MatDialog,) 
  {

    this.form = this.fb.group({
      pacienteId:[],
      asignacionTipoServicioId:[],
      horaConsulta:[,[Validators.required]]
  })
  }
  
  ngOnInit(): void {
    this.listar();
    this.setTableColumns();
  }

  setTableColumns()
  {
    this.tableColumns = [
      {label: 'Nombres', def: 'nombres', dataKey: 'paciente.nombres', dataType: 'object'},
      {label: 'Apellidos', def: 'apellidos', dataKey: 'paciente.apellidos', dataType: 'object'},
      {label: 'Cedula', def: 'cedula', dataKey: 'paciente.cedula', dataType: 'object'},
      {label: 'hora de la consulta', def: 'horaConsulta', dataKey: 'horaConsulta', dataType: 'date'},
    ]
  }

  abrirDialog()
  {
    const dialogRef = this.dialog.open(FormularioTurnosComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.listar();
    })
  }

  abrirDialogEditar(data: Consulta)
  { 
    const dialogRef = this.dialog.open(FormularioTurnosComponent, {
      data,
      
    });
    dialogRef.afterClosed().subscribe(result => {
      this.listar();
    })
  }

  
  abrirDialogEliminar(data: Consulta)
  {
    const dialogRef = this.dialog.open(ModalEliminarTurnoComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listar();
    })
  }

  listar()
  {
    this.consultaServicio.listaConsultas().subscribe(data => {
      this.consultas = data;
    })
  }

  buscar() {
    this.hayError = false;
    this.pacientes = [];
    if (!this.cedula) {
      this.listar();
      return;
    }
    this.pacienteServicio.buscarPacientes(this.cedula)
      .subscribe(
        (pacientes) => {
          this.setTableColumns();
          this.pacientes = pacientes ? [pacientes] : [];
          this.tableConfig = {showActions:true}
        },
        (err) => {
          this.hayError = true;
        }
      );
  }

}
