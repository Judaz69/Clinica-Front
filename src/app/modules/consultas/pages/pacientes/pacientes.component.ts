import { Component, OnInit} from '@angular/core';
import { Pacientes } from '../../interfaces/clienter.interface';
import { ClienteServiciosService } from '../../services/cliente-servicios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  
  pacienteEnviar: Pacientes = 
  {
    id: 0,
    nombres:   '',
    apellidos: '',
    cedula:    '',
  };

  form: FormGroup;

  constructor(private clienteServicio: ClienteServiciosService,
              
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

  enviarCedula(cedula: string)
  {
    this.cedulaEnviar = cedula;
  }

  enviarPaciente(data: Pacientes)
  {
    this.pacienteEnviar = data;
  }
/*
  
  editarPaciente(paciente: any){
    this.accion='Editar';
    this.id= paciente.id;

    this.form.patchValue({
      nombres: paciente.nombres,
      apellidos: paciente.apellidos,
      cedula: paciente.cedula, 
    })
  }
  */ 
}
