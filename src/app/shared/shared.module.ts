import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import {MatTableModule} from '@angular/material/table';
import { DataTableComponent } from './data-table/data-table.component';
import { ColumnValuePipe } from './pipes/column-value.pipe';



@NgModule({
  declarations: [
    DataTableComponent,
    ColumnValuePipe
  ],
  exports: [
    DataTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule
  ]
})
export class SharedModule { 
  
}
