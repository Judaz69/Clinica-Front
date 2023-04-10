import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'consultorioApp';

  inicioSecion: Boolean = false;

  userLog(){
    this.inicioSecion = true;
  }

}
