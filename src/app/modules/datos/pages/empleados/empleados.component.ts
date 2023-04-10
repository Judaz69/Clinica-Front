import { Component } from '@angular/core';
import { Empleados } from '../../interfaces/empleados.interface';
import { EmpleadoServiciosService } from '../../services/empleado-servicios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoEmpleado } from '../../interfaces/tipoEmpleado.interface';
import { TipoEmpleadoService } from '../../services/tipo-empleado.service';
import { ServiciosService } from '../../services/servicios.service';
import { Servicios } from '../../interfaces/servicios.interface';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styles: [
    `
      li { 
        cursor: pointer;
      }

      svg{
        cursor: pointer;
      }
    `
  ]
})
export class EmpleadosComponent {

  cedula:string='';
  hayError: Boolean = false;
  empleados: Empleados [] = [];
  tipoEmpleados: TipoEmpleado [] = [];
  tipoServicios: Servicios [] = [];
  form: FormGroup;
  idTipoEmpleado: number = 0;
  idServicio: number = 0;

  constructor(private tipoEmpleado: TipoEmpleadoService,
              private Empleadoservice : EmpleadoServiciosService,
              private servicioService : ServiciosService,
              private fb: FormBuilder ){

    this.form = this.fb.group({
      nombres:['',[Validators.required, Validators.minLength(3)]],
      apellidos:['',[Validators.required, Validators.minLength(3)]],
      cedula:['',[Validators.required, Validators.minLength(10), Validators.maxLength(10) ]]
    })
  }

  ngOnInit(): void {
    this.listarPuestos();
    this.listarServicios();
    this.listaEmpleados();
  }

  campoEsValido(campo : string){
    return this.form.controls[campo].errors && this.form.controls[campo].touched
  }


  listaEmpleados()
  {
    this.Empleadoservice.listaEmpleados().subscribe(data => {
      this.empleados = data;
    })
  }

  listarServicios()
  {
    this.servicioService.listaServicios().subscribe(data => {
      this.tipoServicios = data;
    })
  }

  listarPuestos()
  {
    this.tipoEmpleado.listaPuestos().subscribe(data => {
      this.tipoEmpleados = data;
    })
  }

  registrar()
  {
    const data: any = {
      nombres: this.form.get('nombres')?.value,
      apellidos: this.form.get('apellidos')?.value,
      cedula: this.form.get('cedula')?.value,
    }

    if (this.form.invalid)
    {
      this.form.markAllAsTouched();
      return;
    }

    this.Empleadoservice.nuevoEmpleado(this.idTipoEmpleado,this.idServicio,data).subscribe(data =>{
      this.form.reset();
      this.listaEmpleados();
    })
  }

  buscar(){
    this.hayError = false;  
    this.empleados = [];
    if(!this.cedula)
    {
      this.listaEmpleados();
      return;
    }
    this.Empleadoservice.buscarEmpleado(this.cedula).
      subscribe( (empleados) => {

        this.empleados.push(empleados);

      }, (err) => {

        this.hayError = true;
      }
      )

  }

  eliminar(cedulaEmpleado:string){
    this.Empleadoservice.eliminarEmpleado(cedulaEmpleado).subscribe(data => {
      this.listaEmpleados();
    })
  }


}
