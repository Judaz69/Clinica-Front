import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosComponent } from '../modules/datos/pages/empleados/empleados.component';
import { PacientesComponent } from '../modules/consultas/pages/pacientes/pacientes.component';
import { ServiciosComponent } from '../modules/datos/pages/servicios/servicios.component';
import { ConsultasComponent } from '../modules/consultas/pages/turnos/consultas.component';
import { InicioComponent } from './pages/Inicio/inicio.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipoEmpleadoComponent } from '../modules/datos/pages/tipo-empleado/tipo-empleado.component';
import { FormularioPacienteComponent } from '../modules/consultas/components/formulario-paciente/formulario-paciente.component';
import { BorrarPacienteComponent } from '../modules/consultas/components/borrar-paciente/borrar-paciente.component';




@NgModule({
  declarations: [
    EmpleadosComponent,
    PacientesComponent,
    ServiciosComponent,
    ConsultasComponent,
    InicioComponent,
    UsuarioComponent,
    TipoEmpleadoComponent,
    FormularioPacienteComponent,
    BorrarPacienteComponent

  ],
  exports: [
    EmpleadosComponent,
    PacientesComponent,
    ServiciosComponent,
    ConsultasComponent,
    InicioComponent,
    UsuarioComponent,
    TipoEmpleadoComponent,
    FormularioPacienteComponent,
    BorrarPacienteComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClinicaModule { }
