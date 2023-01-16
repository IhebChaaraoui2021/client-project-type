import { Component, OnInit, Optional } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    regForm: FormGroup;
    loading = false;
    submitted = false;
    registred = false;
    returnUrl: string='';
    login=true
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
       
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
        this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
      this.regForm = this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required]
    });
    }

    ngOnInit() {
       

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
    get r() { return this.regForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
       // this.alertService.clear();
       console.log(this.f.username.value, this.f.password.value)

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                (data) => {
                    this.router.navigate(['dashboard','user']);
                },
                error => {
                    //this.alertService.error(error);
                    this.loading = false;
                });
    }

    onRegist() {
        this.registred = true;

        // reset alerts on submit
       // this.alertService.clear();
       console.log(this.r.username.value,this.r.email.value, this.r.password.value)

        // stop here if form is invalid
        if (this.regForm.invalid) {
            return;
        }
        this.loading = true;
        this.authenticationService.reg(this.r.username.value,this.r.email.value ,this.r.password.value)
            .pipe(first())
            .subscribe(
                (data) => {
                    this.router.navigate(['/dashboard']);
                },
                error => {
                    //this.alertService.error(error);
                    this.loading = false;
                });
    }
}