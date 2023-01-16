import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListComponent } from './list/list.component';
import { ProfilComponent } from './profil/profil.component';
import { UploadModule } from 'src/app/component/upload/upload.module';


@NgModule({
  declarations: [ListComponent, ProfilComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    UploadModule
  ]
})
export class UserModule { }
