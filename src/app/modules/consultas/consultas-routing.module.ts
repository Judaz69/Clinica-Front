import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultasComponent } from './pages/turnos/consultas.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'consultas', component: ConsultasComponent},
      {path: 'pacientes', component: PacientesComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasRoutingModule { }
