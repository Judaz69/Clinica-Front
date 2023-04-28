import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanLoad } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';


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
        loadChildren: () => import ('./modules/consultas/consultas.module').then(m => m.ConsultasModule),
        canActivate: [ValidarTokenGuard],
        canLoad: [ValidarTokenGuard]
    },
    {
        path: 'datos',
        loadChildren: () => import ('./modules/datos/datos.module').then(m => m.DatosModule),
        canActivate: [ValidarTokenGuard],
        canLoad: [ValidarTokenGuard]
    },
    {
        path: 'dashboard',
        loadChildren: () => import ('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [ValidarTokenGuard],
        canLoad: [ValidarTokenGuard]
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