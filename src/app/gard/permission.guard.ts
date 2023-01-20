import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivateChild {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('I am checking permissions....',childRoute.data);
    
      const isAuthorized = childRoute.data.role.includes(this.authenticationService.hasPermissions()?.role);
      console.log(isAuthorized,this.authenticationService.hasPermissions()?.role)
     if (!isAuthorized) {
       // redirect
       // display a message
       window.alert('you are not authorized');
     }
 
     return isAuthorized || false;
  }
  
}
@Injectable({
  providedIn: 'root',
})
export class HasRoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    
) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuthorized = route.data.role.includes(this.authenticationService.hasPermissions()?.role);
     console.log(isAuthorized,this.authenticationService.hasPermissions()?.role)
    if (!isAuthorized) {
      // redirect
      // display a message
      window.alert('you are not authorized');
    }

    return isAuthorized || false;
  }
}