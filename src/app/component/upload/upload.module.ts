import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgProfilComponent } from './img-profil.component';




@NgModule({
  declarations: [ImgProfilComponent],
  imports: [
    CommonModule
  ],
  exports: [ ImgProfilComponent ],
 
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UploadModule { }
