import { Component, Inject, OnInit } from '@angular/core';
import { TipoEmpleadoService } from '../../services/tipo-empleado.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoEmpleado } from '../../interfaces/tipoEmpleado.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formulario-tipoempleado',
  templateUrl: './formulario-tipoempleado.component.html'
})
export class FormularioTipoempleadoComponent implements OnInit {

  form: FormGroup;

  constructor(private tipoEmpleadoService : TipoEmpleadoService, 
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: TipoEmpleado) {
    this.form = this.fb.group({
      nombreTipo:['',[Validators.required, Validators.minLength(3)]],
    })
  }
  ngOnInit(): void {
    this.form.patchValue(this.data);
  }

  campoEsValido(campo : string){
    return this.form.controls[campo].errors && this.form.controls[campo].touched
  }

  registrar()
  {
    const data: any = {
      id: this.data == null ? 0 : this.data.id,
      nombreTipo: this.form.get('nombreTipo')?.value
    }

    if (this.form.invalid)
    {
      this.form.markAllAsTouched();
      return;
    }

    if(this.data)
    {
      this.tipoEmpleadoService.actualizarPuesto(this.data.id,data).subscribe(data => {
        this.form.reset();
        this._snackBar.open('El puesto fue editado con exito', 'cerrar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        });
      })
    }
    else
    {
      this.tipoEmpleadoService.nuevoPuesto(data).subscribe((data) =>{
        this.form.reset();
        this._snackBar.open('Nuevo puesto registrado con exito', 'cerrar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        });
      })
    }
  }

}
