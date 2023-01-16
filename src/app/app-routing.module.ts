import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './gard/asynchronous.guard';
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
   { path: 'dashboard', component: DashbordComponent ,  canActivate: [AuthGuard]
    ,children: [
    { path: 'products', loadChildren: () =>{return ProductsModule;}},
    { path: 'user', loadChildren: () =>{return UserModule;}},
   
  ]},
 /** 404 NOT FOUND */
 { path: '**', component: DashbordComponent ,  canActivate: [AuthGuard] } 
];

/** canActivate : [RouteGuardService], */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
