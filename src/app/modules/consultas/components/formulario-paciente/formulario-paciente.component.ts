import { Component, Input, OnInit } from '@angular/core';
import { ClienteServiciosService } from '../../services/cliente-servicios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paciente } from '../../interfaces/consultas.interface';
import { ActivatedRoute } from '@angular/router';
import { Pacientes } from '../../interfaces/clienter.interface';

@Component({
  selector: 'app-formulario-paciente',
  templateUrl: './formulario-paciente.component.html',
  template: `

  `
})
export class FormularioPacienteComponent implements OnInit {

  form: FormGroup;
  @Input() id: number | undefined;
  @Input() paciente: Paciente | undefined;

  pacientes: Pacientes [] = [];

  
  constructor(private clienteServicio: ClienteServiciosService, private activatedRoute: ActivatedRoute , private fb: FormBuilder)
  {
    this.form = this.fb.group({
      nombres:['', [Validators.required, Validators.minLength(3)]],
      apellidos:['', [Validators.required, Validators.minLength(3)]],
      cedula:['', [Validators.required, Validators.minLength(10), Validators.maxLength(10) ]]
    })
  }

  ngOnInit(): void {
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
      nombres: this.form.get('nombres')?.value,
      apellidos: this.form.get('apellidos')?.value,
      cedula: this.form.get('cedula')?.value
    }

    if (this.form.invalid)
    {
      this.form.markAllAsTouched();
      return;
    }

    if(this.id == undefined)
    {
      this.clienteServicio.nuevoPaciente(data).subscribe(data =>{
        this.form.reset();
      })
    }
    else
    {
      data.id = this.id;
      this.clienteServicio.actualizarPaciente(this.id,data).subscribe(data => {
        this.id = undefined;
        this.form.reset();
      })
    }   
  }

  editarPaciente(paciente: any){
    this.id= paciente.id;

    this.form.patchValue({
      nombres: paciente.nombres,
      apellidos: paciente.apellidos,
      cedula: paciente.cedula, 
    })
  }
}
