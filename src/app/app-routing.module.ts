import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {   path: '',
        redirectTo: 'auth', 
        pathMatch: 'full', 
        
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
        path: 'dashboard',
        loadChildren: () => import ('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
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