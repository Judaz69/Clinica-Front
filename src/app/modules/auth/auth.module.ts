import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import {MatGridListModule} from '@angular/material/grid-list';
import { MainComponent } from './pages/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    RegistroComponent,
    LoginComponent,
    MainComponent
  ],
  exports: [
    RegistroComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
