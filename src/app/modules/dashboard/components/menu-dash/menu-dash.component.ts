import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-dash',
  templateUrl: './menu-dash.component.html',
  styles: [
    `
      a { 
        cursor: pointer;
      }
    `
  ]
})
export class MenuDashComponent {

  constructor(private router: Router){}

  logOut()
  {
    this.router.navigate(['./auth']);
  }
}
