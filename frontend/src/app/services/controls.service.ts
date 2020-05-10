import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Control } from '../models/control';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class ControlsService {
  baseUrl: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService

  ) { this.baseUrl = "http://localhost:3000" }


  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: this.authService.getToken()
  });

  getControls() {
    let token = this.authService.getToken();
    return this.http.get(`${this.baseUrl}/control`)
  }

  getControlsByUserId(id): Promise<any[]> {
    let token = this.authService.getToken();
    return this.http.get<any[]>(`${this.baseUrl}/control/${id}`).toPromise();
  }

  saveControl(control: Control) {
    let token = this.authService.getToken();
    return this.http.post(`${this.baseUrl}/control`, control);
  }

  deleteControl(id) {
    let token = this.authService.getToken();
    return this.http.delete(`${this.baseUrl}/control/${id}`);
  }

  /* updateControl(id:, updatedControl: Control): Observable<Control> {
    return this.http.put(`${this.baseUrl}/control/${id}`, updatedControl);
  } */

}