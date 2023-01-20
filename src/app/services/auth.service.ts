import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    apiUrl= 'http://localhost:4000'

    constructor(private http: HttpClient) {
       let a= localStorage.getItem('currentUser') || ''
        this.currentUserSubject = new BehaviorSubject<any>(a);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    login(email:string, password:string) {
        return this.http.post<any>(`${this.apiUrl}/api/login`, { email, password })
            .pipe(map(user => {
                console.log(user)
                let b=this.getUser(user.token)
                console.log('fthth', b)
                       // store user details and jwt token in local storage to keep user logged in between page refreshes
                       localStorage.setItem('currentUser', JSON.stringify(b));
                       localStorage.setItem('token', user.token);
                      
                       this.currentUserSubject.next(b);
                       return b;
            }),
            tap(n => {
                
                console.log(n)
             
            })
           );
    }
    reg(email:string,username:string, password:string) {
        return this.http.post<any>(`${this.apiUrl}/api/signup`, { email, password,username })
            .pipe(map(user => {
         console.log(user)
         let b=this.getUser(user.token)
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(b));
                localStorage.setItem('token', user.token);
               
                this.currentUserSubject.next(b);
                return b;
            }),
            tap(n => {
                
                console.log(n)
             
            })
           );
    }
    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
    isLoggedIn() {
        return of(true).pipe(delay(500));
      }
      hasPermissions() {
        let g=localStorage.getItem('currentUser') ||''
       let currentUser= JSON.parse(g).User
      
       console.log(currentUser)
        return currentUser;
      }
      getData() {
        let g=localStorage.getItem('currentUser') ||''
       let currentUser= JSON.parse(localStorage.getItem('currentUser') ||'')
       console.log(currentUser,'rtr')
        return currentUser.User;
      }
      /*  isUserLoggedIn(): boolean {
                return this.isloggedIn;
            }
         
            isAdminUser():boolean {
                if (this.userName=='Admin') {
                    return true; 
                }
                return false;
            }*/
        private getUser(token: string): object | null {
            if (!token) {
              return null
            }
            return JSON.parse(atob(token.split('.')[1])) as object;
          }
}