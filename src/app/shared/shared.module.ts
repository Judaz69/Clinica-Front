import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from '../app-routing.module';
import { DataTableComponent } from './data-table/data-table.component';



@NgModule({
  declarations: [
    MenuComponent,
    DataTableComponent
  ],
  exports: [
    MenuComponent,
    DataTableComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { 
  
}
