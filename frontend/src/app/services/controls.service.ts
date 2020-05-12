import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Control } from '../models/control';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ControlsService {
  baseUrl: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService

  ) {

    let params = JSON.stringify(ControlsService);
    let headers = new HttpHeaders().set('Content-Type', 'app/json');


    this.baseUrl = "http://localhost:3000"
  }

  getControls() {

    return this.http.get(`${this.baseUrl}/control`)
  }

  getControlsByUserId(id): Promise<any[]> {

    return this.http.get<any[]>(`${this.baseUrl}/control/${id}`).toPromise();
  }

  saveControl(control: Control) {

    return this.http.post(`${this.baseUrl}/control`, control);
  }

  deleteControl(id): Observable<any> {

    return this.http.delete(`${this.baseUrl}/control/${id}`);
  }





  /* updateControl(id:, updatedControl: Control): Observable<Control> {
    return this.http.put(`${this.baseUrl}/control/${id}`, updatedControl);
  } */

}