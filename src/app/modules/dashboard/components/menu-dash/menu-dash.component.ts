import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

interface MenuItem 
{
  ruta: string;
  texto: string;
}

@Component({
  selector: 'app-menu-dash',
  templateUrl: './menu-dash.component.html',
  styles: [
    `
      li { 
        cursor: pointer;
        margin-left: 15px;
      }

    `
  ]
})
export class MenuDashComponent {

  menu: MenuItem[] = [
    {ruta:'/turnos/pacientes', texto:'Pacientes'},
    {ruta:'/turnos/consultas', texto:'Consultas'},
    {ruta:'/datos/empleados', texto:'Empleados'},
    {ruta:'/datos/servicios', texto:'Servicios'},
    {ruta:'/datos/puestos', texto:'Puestos laborales'}
  ]

  constructor(private router: Router, private authService: AuthService){}

  logOut()
  {
    this.router.navigate(['./auth']);
    this.authService.logOut();
  }

}
