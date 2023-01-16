import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';


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

                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }),
            tap(n => {
                
                console.log(n)
             
            })
           );
    }
    reg(email:string,username:string, password:string) {
        return this.http.post<any>(`${this.apiUrl}/api/signup`, { email, password,username })
            .pipe(map(user => {

                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
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
}