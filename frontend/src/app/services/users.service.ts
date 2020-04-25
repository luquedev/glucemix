import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/users.model';



@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl: string;
  constructor(
    private http: HttpClient
  ) { this.baseUrl = "http://localhost:3000" }

  getAllUsers(): Promise<User[]> {

    return this.http.get<User[]>(`${this.baseUrl}/user`).toPromise();
  }

}

