import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  baseUrl: string;

  constructor(
    private http: HttpClient,
  ) {
    this.baseUrl = "http://localhost:3000/";

  }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  registerUser(username: string, email: string, password: string) {
    const url_api = (`${this.baseUrl}/newUser`);

  }


  setToken() {

  }

  getToken() {
    return "token";

  }




}
