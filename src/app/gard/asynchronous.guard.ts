import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const currentUser = this.authenticationService.currentUserValue;
      if (currentUser) {
          // authorised so return true
          return true;
      }

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
  }
}
@Injectable({ providedIn: 'root' })
export class InverseAuthGuard implements CanActivate {
    constructor(
        private router: Router
    ) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
      // logged in so return true
      return true;
  }

  // not logged in so redirect to login page with the return url
  this.router.navigate(['/home']);
  return false;
}}
