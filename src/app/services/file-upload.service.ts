import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

private baseUrl = 'http://localhost:4000';
currentUser=""
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
  
  }
getuser(){

}
  upload(file: File): Observable<HttpEvent<any>> {
    this.currentUser = this.authenticationService.currentUserValue
    const formData: FormData = new FormData();
    let id=""
    formData.append('file', file);

     id=JSON.parse( this.currentUser)._id
    console.log(id)
  
  formData.append('userId', id);
 

   const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    })
    this.currentUser=""
    console.log(this.http.request(req))
   return this.http.request(req);
  }

  getFiles() {
    return this.authenticationService.getData();
  }
}


