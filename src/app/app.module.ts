import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './layout/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DashbordComponent } from './shared/dashbord/dashbord.component';
import { HomeComponent } from './shared/home/home.component';
import { UploadModule } from './component/upload/upload.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashbordComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
