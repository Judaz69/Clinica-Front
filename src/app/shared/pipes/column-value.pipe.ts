import { Pipe, PipeTransform } from '@angular/core';
import { DataTable } from '../interfaces/dataTable.interface';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'columnValue'
})
export class ColumnValuePipe implements PipeTransform {

  transform(row: any, column: DataTable): unknown {
    let displayValue = row[column.dataKey];

    switch (column.dataType) {
      case 'date':
        if (column.formatt === undefined) {
          displayValue = new DatePipe('es').transform(displayValue, column.formatt);
        }
        break;
      
      case 'object':
        const arrayKeys = column.dataKey.split('.');
        let currentValue: any;

        arrayKeys.forEach(key => {
          if (currentValue ===  undefined || currentValue === null) {
            currentValue = row[key];
            return;
          }
          currentValue = currentValue[key];
        })
        displayValue = currentValue;
      break;

      default:
        break;
    }

    return displayValue;
  }

}
