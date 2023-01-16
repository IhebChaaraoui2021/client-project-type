import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ListProductComponent } from './list-product/list-product.component';
import { UploadModule } from '../component/upload/upload.module';


@NgModule({
  declarations: [ProductsComponent, ListProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    UploadModule
  ]
})
export class ProductsModule { }
