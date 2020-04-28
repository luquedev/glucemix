import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Control } from '../models/controls.model';

@Injectable({
  providedIn: 'root'
})

export class ControlsService {
  baseUrl: string;

  constructor(private http: HttpClient
  ) { this.baseUrl = "http://localhost:3000" }

  getControlsByUserName(): Promise<Control[]> {
    return this.http.get<Control[]>(`${this.baseUrl}/controlsbyusername`).toPromise();
  }
}
