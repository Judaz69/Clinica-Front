import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultasRoutingModule } from './consultas-routing.module';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { ConsultasComponent } from './pages/turnos/consultas.component';
import { FormularioPacienteComponent } from './components/formulario-paciente/formulario-paciente.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { FormularioTurnosComponent } from './components/formulario-turnos/formulario-turnos.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    PacientesComponent,
    ConsultasComponent,
    FormularioPacienteComponent,
    FormularioTurnosComponent,
  ],
  exports: [
    PacientesComponent,
    ConsultasComponent,
    FormularioPacienteComponent
  ],
  imports: [
    CommonModule,
    ConsultasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    SharedModule
  ]
})
export class ConsultasModule { }
