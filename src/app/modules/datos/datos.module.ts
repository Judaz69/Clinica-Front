import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DatosRoutingModule } from './datos-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { FormularioServiciosComponent } from './components/formulario-servicios/formulario-servicios.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { TipoEmpleadoComponent } from './pages/tipo-empleado/tipo-empleado.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { ModalEliminarComponent } from './components/modal-eliminar/modal-eliminar.component';
import { FormularioTipoempleadoComponent } from './components/formulario-tipoempleado/formulario-tipoempleado.component';
import { ModalEliminarPuestoComponent } from './components/modal-eliminar-puesto/modal-eliminar-puesto.component';
import { FormularioEmpleadoComponent } from './components/formulario-empleado/formulario-empleado.component';
import { ModalBorrarEmpleadoComponent } from './components/modal-borrar-empleado/modal-borrar-empleado.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    FormularioServiciosComponent,
    EmpleadosComponent,
    ServiciosComponent,
    TipoEmpleadoComponent,
    ModalEliminarComponent,
    FormularioTipoempleadoComponent,
    ModalEliminarPuestoComponent,
    FormularioEmpleadoComponent,
    ModalBorrarEmpleadoComponent
  ],
  exports: [
    FormularioServiciosComponent,
    EmpleadosComponent,
    ServiciosComponent,
    TipoEmpleadoComponent
  ],
  imports: [
    CommonModule,
    DatosRoutingModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    MatSelectModule,
    SharedModule
  ]
})
export class DatosModule { }
