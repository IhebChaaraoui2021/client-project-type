import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    apiUrl= 'localhost:3000'

    getAll() {
        return this.http.get<any[]>(`${apiUrl}/users`);
    }

    register(user:any) {
        return this.http.post(`${apiUrl}/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${apiUrl}/users/${id}`);
    }
}