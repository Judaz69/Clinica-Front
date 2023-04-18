import { Component, Inject, OnInit } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Servicios } from '../../interfaces/servicios.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formulario-servicios',
  templateUrl: './formulario-servicios.component.html'
})
export class FormularioServiciosComponent implements OnInit {

  form: FormGroup;

  constructor(private serviciosService: ServiciosService, private fb: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data: Servicios,
    private _snackBar: MatSnackBar)
  {
    this.form = this.fb.group({
      nombreServicio:['',[Validators.required, Validators.minLength(3)]],
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
      nombreServicio: this.form.get('nombreServicio')?.value
    }

    if (this.form.invalid)
    {
      this.form.markAllAsTouched();
      return;
    }

    if(this.data)
    {
      this.serviciosService.actualizarServicio(this.data.id,data).subscribe(data => {
        this.form.reset();
        this._snackBar.open('El servicio fue editado con exito', 'cerrar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        });
      })
    }
    else
    {
      this.serviciosService.nuevoServicio(data).subscribe((data) =>{
        this.form.reset();
        this._snackBar.open('Nuevo servicio registrado con exito', 'cerrar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        });
      })
    }
  }

}
