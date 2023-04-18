import { Component, OnInit } from '@angular/core';
import { TipoEmpleadoService } from '../../services/tipo-empleado.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoEmpleado } from '../../interfaces/tipoEmpleado.interface';
import { MatDialog } from '@angular/material/dialog';
import { FormularioTipoempleadoComponent } from '../../components/formulario-tipoempleado/formulario-tipoempleado.component';
import { ModalEliminarPuestoComponent } from '../../components/modal-eliminar-puesto/modal-eliminar-puesto.component';

@Component({
  selector: 'app-tipo-empleado',
  templateUrl: './tipo-empleado.component.html',
  styles: [
    `
      li { 
        cursor: pointer;
      }

      a{
        cursor: pointer;
      }

      svg{
        cursor: pointer;
      }
    `
  ]
})
export class TipoEmpleadoComponent implements OnInit {

  puestos: TipoEmpleado[]=[];
  form: FormGroup;
  headArray = [
    {'Head': 'nombreTipo', 'FieldName': 'Puesto laboral'},
    {'Head': 'Action', 'FieldName': ''}
  ];

  constructor(private tipoEmpleadoService : TipoEmpleadoService, private fb: FormBuilder,
    private dialog: MatDialog) {
    this.form = this.fb.group({
      nombreTipo:['',[Validators.required, Validators.minLength(3)]],
    })
  }

  ngOnInit(): void {
    this.listarPuestos();
  }

  abrirDialog()
  {
    const dialogRef = this.dialog.open(FormularioTipoempleadoComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.listarPuestos();
    })
  }

  abrirDialogEditar(data: TipoEmpleado)
  { 
    const dialogRef = this.dialog.open(FormularioTipoempleadoComponent, {
      data,
      
    });
    dialogRef.afterClosed().subscribe(result => {
      this.listarPuestos();
    })
  }

  abrirDialogEliminar(data: TipoEmpleado)
  {
    const dialogRef = this.dialog.open(ModalEliminarPuestoComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarPuestos();
    })
  }

  listarPuestos()
  {
    this.tipoEmpleadoService.listaPuestos().subscribe(data => {
      this.puestos = data;
    })
  }

}
