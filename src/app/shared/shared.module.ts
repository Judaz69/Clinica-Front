import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { DataTableComponent } from './data-table/data-table.component';
import { ColumnValuePipe } from './pipes/column-value.pipe';
import { ModalEliminarComponent } from './modal-eliminar/modal-eliminar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    DataTableComponent,
    ColumnValuePipe,
    ModalEliminarComponent
  ],
  exports: [
    DataTableComponent,
    ModalEliminarComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
  ]
})
export class SharedModule { 
  
}
