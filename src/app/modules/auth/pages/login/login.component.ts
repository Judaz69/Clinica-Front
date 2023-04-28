import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    email: ['admin@gmail.com', [Validators.required]],
    password: ['!Admin123', [Validators.required]]
  })

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder) { }

  login() {
    const { email, password } = this.miFormulario.value
    this.authService.login(email, password).subscribe(valido => {

      if (valido) {
        this.router.navigateByUrl('/dashboard');
      }
      else {
        console.log('no acceso')
      }
    }, (err) => {
      
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Credenciales de usuario incorrectas!'
      });
    }
    )
  }
}
