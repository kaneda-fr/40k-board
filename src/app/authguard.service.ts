import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
   } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthguardService {

  constructor(private authService: AuthService, private router: Router) { }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('AuthGuard#canActivate called');
     if (this.authService.loggedIn()) {
       return true;
     } else {
       this.authService.login();
       this.router.navigate(['/']);
       return this.authService.loggedIn();
     }
  }
}
