
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
  { path: '', children :[
    { path : 'login', component : AuthComponent },
    { path : '', redirectTo : 'admin', pathMatch : 'full' }
  ] }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports : [RouterModule]
})
export class AuthRoutingModule { }
