import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService){}
  
  canActivate(): Observable<boolean> | boolean {
    if(this.authService.auth.token)
    {
      return true;
    }
    return false;
  }
  
  canLoad(): Observable<boolean> | boolean{
    if(this.authService.auth.token)
    {
      return true;
    }
    return false;
  }
}
