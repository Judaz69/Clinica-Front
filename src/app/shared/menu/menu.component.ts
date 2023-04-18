import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
      a { 
        cursor: pointer;
      }
    `
  ]
})
export class MenuComponent {

  constructor(private router: Router){}

  logOut()
  {
    this.router.navigate(['./auth']);
  }
}
