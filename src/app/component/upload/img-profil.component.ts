import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-img-profil',
  templateUrl: './img-profil.component.html',
  styleUrls: ['./img-profil.component.css']
})
export class ImgProfilComponent implements OnInit {

    selectedFiles?: FileList;
    currentFile?: File;
    progress = 0;
    message = '';
    preview = '';
  
    imageInfos?: Observable<any>;
  
    constructor(private uploadService: FileUploadService) {}
  
    ngOnInit(): void {
      this.imageInfos =of(this.uploadService.getFiles());
      this.preview='http://localhost:4000/uploads/'+this.uploadService.getFiles().image
      console.log(this.preview)
    }
  
    selectFile(event: any): void {
      this.message = '';
      this.preview = '';
      this.progress = 0;
      this.selectedFiles = event.target.files;
  
      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);
  
        if (file) {
          this.preview = '';
          this.currentFile = file;
  
          const reader = new FileReader();
  
          reader.onload = (e: any) => {
            console.log(e.target.result);
            this.preview = e.target.result;
          };
  
          reader.readAsDataURL(this.currentFile);
        }
      }
    }
  
    upload(): void {
      this.progress = 0;
  
      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);
  
        if (file) {
          this.currentFile = file;
  
          this.uploadService.upload(this.currentFile).subscribe({
            next: (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round((100 * event.loaded) / event.total);
              } else if (event instanceof HttpResponse) {
                this.message = event.body.message;
                this.imageInfos =  event.body.user.image;
                localStorage.setItem('currentUser', JSON.stringify(event.body.user));
              }
            },
            error: (err: any) => {
              console.log(err);
              this.progress = 0;
  
              if (err.error && err.error.message) {
                this.message = err.error.message;
              } else {
                this.message = 'Could not upload the image!';
              }
  
              this.currentFile = undefined;
            },
          });
        }
  
        this.selectedFiles = undefined;
      }
    }
  
}
