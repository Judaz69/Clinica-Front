import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './clinica/pages/Inicio/inicio.component';


const routes: Routes = [
    {
        path: 'inicio',
        component: InicioComponent,
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import ('./modules/auth/auth.module').then( m => m.AuthModule)
    },
    {
        path: 'turnos',
        loadChildren: () => import ('./modules/consultas/consultas.module').then(m => m.ConsultasModule)
    },
    {
        path: 'datos',
        loadChildren: () => import ('./modules/datos/datos.module').then(m => m.DatosModule)
    },  
    {
        path: '**',
        redirectTo: 'inicio'
    }
]


@NgModule({
    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}