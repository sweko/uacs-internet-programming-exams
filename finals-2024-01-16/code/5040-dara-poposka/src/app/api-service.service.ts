import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  createBand(bandData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/bands`, bandData);
  }

  
}