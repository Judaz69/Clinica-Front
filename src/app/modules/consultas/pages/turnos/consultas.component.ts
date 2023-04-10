import { Component } from '@angular/core';
import { Consulta } from '../../interfaces/consultas.interface';
import { ConsultasServiciosService } from '../../services/consultas-servicios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteServiciosService } from '../../services/cliente-servicios.service';
import { Pacientes } from '../../interfaces/clienter.interface';
import { AsignacionServicio } from '../../../datos/interfaces/asignacionServicio.interface';
import { AsignacionServicioService } from '../../../datos/services/asignacion-servicio.service';

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

  cedula:string='';
  hayError: Boolean = false;
  consultas: Consulta [] = [];
  pacientes: Pacientes [] = [];
  servicios: AsignacionServicio[] = [];
  form: FormGroup;
  idPaciente: number = 0;
  idServicio: number = 0;
  id: number | undefined;

  constructor(private consultaServicio: ConsultasServiciosService,
              private pacienteServicio: ClienteServiciosService,
              private asignacionServicio: AsignacionServicioService,
              private fb: FormBuilder) 
  {

    this.form = this.fb.group({
      pacienteId:[],
      asignacionTipoServicioId:[],
      horaConsulta:[,[Validators.required]]
  })
  }
  
  ngOnInit(): void {
    this.listar();
    this.listarServicios();
  }

  campoEsValido(campo : string){
    return this.form.controls[campo].errors && this.form.controls[campo].touched
  }

  valores(valorPaciente: number)
  {
    this.idPaciente = valorPaciente;
  }

  valoresServicio(valorServicio: number)
  {
    this.idServicio = valorServicio;
  }

  listar()
  {
    this.consultaServicio.listaConsultas().subscribe(data => {
      this.consultas = data;
    })
  }

  listarServicios()
  {
    this.asignacionServicio.listaAsignaciones().subscribe(data => {
      this.servicios = data;
    })
  }

  registrar()
  {
    const asignarPaciente: number = this.idPaciente;
    const asignarServicio: number = this.idServicio;

    const data: any = {
      pacienteId: asignarPaciente,
      asignacionTipoServicioId: asignarServicio,
      horaConsulta: this.form.get('horaConsulta')?.value,
    }

    if (this.form.invalid)
    {
      this.form.markAllAsTouched();
      return;
    }

    this.consultaServicio.nuevaConsulta(data).subscribe(data =>{
      this.form.reset();
      this.idPaciente = 0;
      this.idServicio = 0;
      this.listar();
    })
  }

  eliminar(id: number){
    this.consultaServicio.eliminarConsulta(id).subscribe(data => {
      this.listar();
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
