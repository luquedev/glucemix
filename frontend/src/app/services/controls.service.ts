import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Control } from '../models/control';

@Injectable({
  providedIn: 'root'
})
export class ControlsService {
  baseUrl: string;

  constructor(
    private http: HttpClient
  ) { this.baseUrl = "http://localhost:3000" }


  getControls() {
    return this.http.get(`${this.baseUrl}/control`)
  }

  saveControl(control: Control) {
    return this.http.post(`${this.baseUrl}/control`, control);
  }

  deleteControl(id) {
    return this.http.delete(`${this.baseUrl}/control/${id}`);
  }

  /* updateControl(id:, updatedControl: Control): Observable<Control> {
    return this.http.put(`${this.baseUrl}/control/${id}`, updatedControl);
  } */

}