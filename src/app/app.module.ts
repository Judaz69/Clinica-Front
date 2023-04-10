import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { ClinicaModule } from './clinica/clinica.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConsultasModule } from './modules/consultas/consultas.module';
import { DatosModule } from './modules/datos/datos.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ClinicaModule,
    SharedModule,
    AuthModule,
    ConsultasModule,
    DatosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
