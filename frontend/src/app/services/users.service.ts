import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../app/models/user';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:3000";
  }
  login(email: string, password: string) {
    const usuario = {
      email: email,
      password: password
    };

    return this.http.post<any>(`${this.baseUrl}/userLogin`, usuario).toPromise();
  }
}
