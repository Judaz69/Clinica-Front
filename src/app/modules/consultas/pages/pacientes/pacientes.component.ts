import { Component, OnInit} from '@angular/core';
import { Pacientes } from '../../interfaces/clienter.interface';
import { ClienteServiciosService } from '../../services/cliente-servicios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormularioPacienteComponent } from '../../components/formulario-paciente/formulario-paciente.component';
import { BorrarPacienteComponent } from '../../components/borrar-paciente/borrar-paciente.component';


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styles: [
    `
      li { 
        cursor: pointer;
      }

      a{
        cursor: pointer;
      }
    `
  ]
})
export class PacientesComponent implements OnInit {

  cedula:string='';
  hayError: Boolean = false;
  pacientes: Pacientes [] = [];
  accion:string= 'agregar';
  id: number | undefined;
  cedulaEnviar: string | undefined;
  form: FormGroup;

  headArray = [
    {'Head': 'nombres', 'FieldName': 'Nombres'},
    {'Head': 'apellidos', 'FieldName': 'Apellidos'},
    {'Head': 'cedula', 'FieldName': 'Cedula'},
    {'Head': 'Action', 'FieldName': ''}
  ];

  constructor(private clienteServicio: ClienteServiciosService,
              private dialog: MatDialog,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      nombres:['', [Validators.required, Validators.minLength(3)]],
      apellidos:['', [Validators.required, Validators.minLength(3)]],
      cedula:['', [Validators.required, Validators.minLength(10), Validators.maxLength(10) ]]
    })
  }

  ngOnInit(): void {
    this.listar();
  }

  abrirDialog()
  {
    const dialogRef = this.dialog.open(FormularioPacienteComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.listar();
    })
  }

  abrirDialogEditar(data: Pacientes)
  { 
    const dialogRef = this.dialog.open(FormularioPacienteComponent, {
      data,
      
    });
    dialogRef.afterClosed().subscribe(result => {
      this.listar();
    })
  }

  abrirDialogEliminar(data: Pacientes)
  {
    const dialogRef = this.dialog.open(BorrarPacienteComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listar();
    })
  }

  listar()
  {
    this.clienteServicio.listaPacientes().subscribe(data => {
      this.pacientes = data;
    })
  }

  buscar(){
    this.hayError = false;  
    this.pacientes = [];
    if(!this.cedula)
    {
      this.listar();
      return;
    }
    this.clienteServicio.buscarPacientes(this.cedula).
      subscribe( (pacientes) => {

        console.log(pacientes);
        this.pacientes.push(pacientes);

      }, (err) => {

        this.hayError = true;
      }
      )

  }

}
