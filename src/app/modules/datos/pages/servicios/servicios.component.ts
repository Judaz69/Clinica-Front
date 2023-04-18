import { Component, Inject, OnInit } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import { Servicios } from '../../interfaces/servicios.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormularioServiciosComponent } from '../../components/formulario-servicios/formulario-servicios.component';
import { ModalEliminarComponent } from '../../components/modal-eliminar/modal-eliminar.component';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
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
export class ServiciosComponent implements OnInit {

  servicios: Servicios[] = [];
  form: FormGroup;
  accion:string= 'agregar';
  id: number | undefined;
  headArray = [
    {'Head': 'nombreServicio', 'FieldName': 'Nombre Servicio'},
    {'Head': 'Action', 'FieldName': ''}
  ];

  constructor(private serviciosService: ServiciosService, 
              private fb: FormBuilder, 
              private dialog: MatDialog,
  ){
    this.form = this.fb.group({
      nombreServicio:['',[Validators.required, Validators.minLength(3)]],
    })
  }

  ngOnInit(): void {
    this.form
    this.listarServicios();
  }

  abrirDialog()
  {
    const dialogRef = this.dialog.open(FormularioServiciosComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.listarServicios();
    })
  }

  abrirDialogEditar(data: Servicios)
  { 
    const dialogRef = this.dialog.open(FormularioServiciosComponent, {
      data,
      
    });
    dialogRef.afterClosed().subscribe(result => {
      this.listarServicios();
    })
  }

  abrirDialogEliminar(data: Servicios)
  {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarServicios();
    })
  }

  campoEsValido(campo : string){
    return this.form.controls[campo].errors && this.form.controls[campo].touched
  }

  listarServicios()
  {
    this.serviciosService.listaServicios().subscribe(data => {
      this.servicios = data;
    })
  }

}
