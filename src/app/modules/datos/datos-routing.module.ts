import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { TipoEmpleadoComponent } from './pages/tipo-empleado/tipo-empleado.component';
import { InicioComponent } from '../dashboard/pages/inicio/inicio.component';


const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
    children: [
      {path: 'empleados', component: EmpleadosComponent},
      {path: 'servicios', component: ServiciosComponent},
      {path: 'puestos', component: TipoEmpleadoComponent},
      { path: '**', redirectTo: 'empleados'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosRoutingModule { }
