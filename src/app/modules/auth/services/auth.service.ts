import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/authResponse.interface';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = environment.apiUrl;
  private _auth: AuthResponse | undefined;

  get auth()
  {
    return {...this._auth};
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string) 
  {
    const url = `${this.apiUrl}/cuentas/login`
    const body = {email, password};

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => this._auth = resp),
        tap(resp => {
          if(resp.token)
          {
            localStorage.setItem('token', resp.token);
          }
        }),
        map(resp => resp.token),
      )
  }

  logOut()
  {
    localStorage.removeItem('token')
  }
}
