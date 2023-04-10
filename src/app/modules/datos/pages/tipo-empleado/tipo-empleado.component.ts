import { Component, OnInit } from '@angular/core';
import { TipoEmpleadoService } from '../../services/tipo-empleado.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoEmpleado } from '../../interfaces/tipoEmpleado.interface';

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
  accion:string= 'agregar';
  id: number | undefined;

  constructor(private tipoEmpleadoService : TipoEmpleadoService, private fb: FormBuilder) {
    this.form = this.fb.group({
      nombreTipo:['',[Validators.required, Validators.minLength(3)]],
    })
  }

  ngOnInit(): void {
    this.listarPuestos();
  }

  campoEsValido(campo : string){
    return this.form.controls[campo].errors && this.form.controls[campo].touched
  }

  listarPuestos()
  {
    this.tipoEmpleadoService.listaPuestos().subscribe(data => {
      this.puestos = data;
    })
  }

  registrar()
  {
    const data: any = {
      nombreTipo: this.form.get('nombreTipo')?.value
    }

    if (this.form.invalid)
    {
      this.form.markAllAsTouched();
      return;
    }
    
    if(this.id == undefined)
    {
      this.tipoEmpleadoService.nuevoPuesto(data).subscribe((data) =>{
        this.form.reset();
        this.listarPuestos();
      })
    }
    else
    {
      data.id = this.id;
      this.tipoEmpleadoService.actualizarPuesto(this.id,data).subscribe(data => {
        this.accion='agregar';
        this.id = undefined;
        this.form.reset();
        this.listarPuestos();
      })
    } 
  }

  eliminar(id: number){
    this.tipoEmpleadoService.eliminarPuesto(id).subscribe(data => {
      this.listarPuestos();
    })
  }

  editarPuesto(puesto: any){
    this.accion='Editar';
    this.id= puesto.id;

    this.form.patchValue({
      nombreTipo: puesto.nombreTipo
    })
  }

}
