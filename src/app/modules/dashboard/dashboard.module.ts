import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MenuDashComponent } from './components/menu-dash/menu-dash.component';


@NgModule({
  declarations: [
    InicioComponent,
    MenuDashComponent
  ],
  exports: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
