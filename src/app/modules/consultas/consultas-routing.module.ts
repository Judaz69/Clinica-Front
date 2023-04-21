import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultasComponent } from './pages/turnos/consultas.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { InicioComponent } from '../dashboard/pages/inicio/inicio.component';


const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
    children: [
      {path: 'consultas', component: ConsultasComponent},
      {path: 'pacientes', component: PacientesComponent},
      { path: '**', redirectTo: 'consultas'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasRoutingModule { }
