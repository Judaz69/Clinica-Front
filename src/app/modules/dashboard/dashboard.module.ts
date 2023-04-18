import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConsultasModule } from '../consultas/consultas.module';
import { DatosModule } from '../datos/datos.module';


@NgModule({
  declarations: [
    InicioComponent
  ],
  exports: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
