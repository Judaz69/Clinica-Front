import { Component, Inject, OnInit } from '@angular/core';
import { ConsultasServiciosService } from '../../services/consultas-servicios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pacientes } from '../../interfaces/clienter.interface';
import { AsignacionServicio } from '../../../datos/interfaces/asignacionServicio.interface';
import { AsignacionServicioService } from '../../../datos/services/asignacion-servicio.service';
import { ClienteServiciosService } from '../../services/cliente-servicios.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empleados } from 'src/app/modules/datos/interfaces/empleados.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formulario-turnos',
  templateUrl: './formulario-turnos.component.html'
})
export class FormularioTurnosComponent implements OnInit {

  pacientes: Pacientes [] = [];
  servicios: AsignacionServicio[] = [];
  form: FormGroup;
  idPaciente: number = 0;
  idServicio: number = 0;
  cedula:string='';

  constructor(private consultaServicio: ConsultasServiciosService,
    private asignacionServicio: AsignacionServicioService,
    private pacienteServicio: ClienteServiciosService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Empleados) 
{

this.form = this.fb.group({
pacienteId:[],
asignacionTipoServicioId:[],
horaConsulta:[,[Validators.required]]
})
}
  ngOnInit(): void {
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
      this._snackBar.open('El turno fue creado con exito', 'cerrar', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000
      });
    })

  }

  eliminar(id: number){
    this.consultaServicio.eliminarConsulta(id).subscribe(data => {

    })
  }

  buscarPaciente(){ 
    this.pacientes = [];
    if(!this.cedula)
    {
      return;
    }
    this.pacienteServicio.buscarPacientes(this.cedula).
      subscribe( (pacientes) => {

        this.pacientes.push(pacientes);

      }, (err) => {

      }
      )

  }

}
