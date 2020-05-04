import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Controls } from '../models/controls.model';

@Injectable({
  providedIn: 'root'
})

export class ControlsService {
  baseUrl: string;

  constructor(private http: HttpClient
  ) { this.baseUrl = "http://localhost:3000" }

  getControlsByUserName(pUsername): Promise<Controls[]> {
    return this.http.get<Controls[]>(`${this.baseUrl}/controlsbyusername/${pUsername}`).toPromise();
  }

  updateControlById(id, formValue): Promise<Controls[]> {
    return this.http.put<Controls[]>(`${this.baseUrl}/updateControl/${id}`, formValue).toPromise();

  }

  actualizarControlById(formValue): Promise<Controls[]> {
    return this.http.put<Controls[]>(`${this.baseUrl}/updateControl`, formValue).toPromise();

  }





}



