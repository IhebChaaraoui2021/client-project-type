import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route, PreloadingStrategy } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthGuard } from './gard/asynchronous.guard';
import { HasRoleGuard, PermissionGuard } from './gard/permission.guard';

import { LoginComponent } from './layout/login/login.component';
import { UserModule } from './modules/user/user.module';
import {ProductsModule} from './products/products.module';
import { DashbordComponent } from './shared/dashbord/dashbord.component';
import { HomeComponent } from './shared/home/home.component';
//import {ClientsModule} from './clients/clients.module';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
 // { path: 'clients', loadChildren: () =>{return ClientsModule;},  canActivate: [AuthGuard], },
  //{ path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  //{ path: 'products', loadChildren:() => {return ProductsModule;},  canActivate: [AuthGuard],  },

   /** Dashboard */
   { path: 'dashboard', component: DashbordComponent ,
   canActivate: [AuthGuard] , 
  canActivateChild:[PermissionGuard],
    
    children: [
    { path: 'products', loadChildren: () =>{return ProductsModule;} , 
    
     data: {
       role: ['user','admin'],
     }},
    { path: 'user', loadChildren: () =>{return UserModule}, data: {
      role: ['admin'],
    }},
   
  ]},
 /** 404 NOT FOUND */
 { path: '**', component: DashbordComponent ,  canActivate: [AuthGuard] } 
];

/** canActivate : [RouteGuardService], */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
 
})
export class AppRoutingModule { }
export class CustomPreloader implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    return route.data && route.data.preload ? load() : of(null);
  }
}