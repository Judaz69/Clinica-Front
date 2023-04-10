import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import { Servicios } from '../../interfaces/servicios.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private serviciosService: ServiciosService, private fb: FormBuilder) {
    this.form = this.fb.group({
      nombreServicio:['',[Validators.required, Validators.minLength(3)]],
    })
  }

  ngOnInit(): void {
    this.listarServicios();
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

  registrar()
  {
    const data: any = {
      nombreServicio: this.form.get('nombreServicio')?.value
    }

    if (this.form.invalid)
    {
      this.form.markAllAsTouched();
      return;
    }
    
    if(this.id == undefined)
    {
      this.serviciosService.nuevoServicio(data).subscribe((data) =>{
        this.form.reset();
        this.listarServicios();
      })
    }
    else
    {
      data.id = this.id;
      this.serviciosService.actualizarServicio(this.id,data).subscribe(data => {
        this.accion='agregar';
        this.id = undefined;
        this.form.reset();
        this.listarServicios();
      })
    } 
  }

  eliminar(id: number){
    this.serviciosService.eliminarServicio(id).subscribe(data => {
      this.listarServicios();
    })
  }

  editarServicio(servicio: any){
    this.accion='Editar';
    this.id= servicio.id;

    this.form.patchValue({
      nombreServicio: servicio.nombreServicio
    })
  }

}
