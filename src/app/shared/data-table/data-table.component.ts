import { Component,EventEmitter,Input,Output } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html'
})
export class DataTableComponent {

  @Input() HeadArray: any [] = [];
  @Input() GridArray: any [] = [];

  @Output() onEdit = new EventEmitter<any>;
  @Output() onDelete = new EventEmitter<any>;

  constructor(){}

  editar(data: any)
  {
    this.onEdit.emit(data);
  }

  eliminar(data: any)
  {
    this.onDelete.emit(data);
  }

}
