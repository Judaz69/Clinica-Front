import { Component } from '@angular/core';
import { Consulta } from '../../interfaces/consultas.interface';
import { ConsultasServiciosService } from '../../services/consultas-servicios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteServiciosService } from '../../services/cliente-servicios.service';
import { Pacientes } from '../../interfaces/clienter.interface';
import { MatDialog } from '@angular/material/dialog';
import { FormularioTurnosComponent } from '../../components/formulario-turnos/formulario-turnos.component';
import { ModalEliminarTurnoComponent } from '../../components/modal-eliminar-turno/modal-eliminar-turno.component';

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

  buscarPaciente(){
    this.hayError = false;  
    this.pacientes = [];
    if(!this.cedula)
    {
      return;
    }
    this.pacienteServicio.buscarPacientes(this.cedula).
      subscribe( (pacientes) => {

        this.pacientes.push(pacientes);

      }, (err) => {

        this.hayError = true;
      }
      )

  }

}
