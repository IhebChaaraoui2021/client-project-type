import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ProfilComponent } from './profil/profil.component';

const routes: Routes = [
  { path: '', component: ProfilComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'list', component: ListComponent , outlet: 'd'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
