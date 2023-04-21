import { Component,EventEmitter,Input,OnInit,Output } from '@angular/core';
import { DataTable } from '../interfaces/dataTable.interface';
import { TableConfig } from '../interfaces/tableConfigModel';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html'
})
export class DataTableComponent {

  dataSource: any = [];
  tableDisplayColumns: string[] =  [];
  tableColumns: DataTable[] = [];
  tableConfig: TableConfig | undefined;


  @Input() set data(data: any)
  {
    this.dataSource = data
  };

  @Input() set columns(columns: DataTable[])
  {
    this.tableColumns = columns;
    this.tableDisplayColumns = this.tableColumns.map(col => col.def)

  }

  @Input() set config(config: TableConfig) {
    this.setConfig(config);
  }

  @Output() onEdit = new EventEmitter<any>;
  @Output() onDelete = new EventEmitter<any>;

  constructor(){}

  setConfig(config: TableConfig)
  {
    this.tableConfig = config
    
    if (this.tableConfig.showActions) 
    {
      this.tableDisplayColumns.push('actions')
    }
  }


  editar(data: any)
  {
    this.onEdit.emit(data);
  }

  eliminar(data: any)
  {
    this.onDelete.emit(data);
  }

}
