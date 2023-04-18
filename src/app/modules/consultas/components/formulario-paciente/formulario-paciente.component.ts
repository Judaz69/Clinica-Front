import { Component, Inject, Input, OnInit } from '@angular/core';
import { ClienteServiciosService } from '../../services/cliente-servicios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Pacientes } from '../../interfaces/clienter.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formulario-paciente',
  templateUrl: './formulario-paciente.component.html',
  template: `

  `
})
export class FormularioPacienteComponent implements OnInit {

  form: FormGroup;
  id: number | undefined;

  pacientes: Pacientes [] = [];

  
  constructor(private clienteServicio: ClienteServiciosService, 
              private activatedRoute: ActivatedRoute, 
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: Pacientes)
  {
    this.form = this.fb.group({
      nombres:['', [Validators.required, Validators.minLength(3)]],
      apellidos:['', [Validators.required, Validators.minLength(3)]],
      cedula:['', [Validators.required, Validators.minLength(10), Validators.maxLength(10) ]]
    })
  }

  ngOnInit(): void {
    this.form.patchValue(this.data);
  }

  campoEsValido(campo : string){
    return this.form.controls[campo].errors && this.form.controls[campo].touched
  }

  listar()
  {
    this.clienteServicio.listaPacientes().subscribe(data => {
      this.pacientes = data;
    })
  }

  registrar()
  {
    const data: any = {
      id: this.data == null ? 0 : this.data.id,
      nombres: this.form.get('nombres')?.value,
      apellidos: this.form.get('apellidos')?.value,
      cedula: this.form.get('cedula')?.value
    }

    if (this.form.invalid)
    {
      this.form.markAllAsTouched();
      return;
    }

    if(this.data)
    {
      this.clienteServicio.actualizarPaciente(this.data.id,data).subscribe(data => {
        this.form.reset();
        this._snackBar.open('Datos editados con exito', 'cerrar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        });
      })
    }
    else
    {
      this.clienteServicio.nuevoPaciente(data).subscribe(data =>{
        this.form.reset();
        this._snackBar.open('El paciente fue ingresado con exito', 'cerrar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        });
      })
    }   
  }
}
