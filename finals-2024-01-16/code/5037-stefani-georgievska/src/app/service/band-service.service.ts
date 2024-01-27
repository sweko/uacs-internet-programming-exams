import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bands } from '../models/bands';

@Injectable({
  providedIn: 'root'
})
export class BandServiceService {
  private apiUrl = 'https://localhost:3000';
  constructor(private http:HttpClient) { }

  getBands(): Observable<Bands[]> {
    return this.http.get<Bands[]>(`${this.apiUrl}/band-list`);
  }
  getBandById(id: number): Observable<Bands> {
    return this.http.get<Bands>(`${this.apiUrl}/band-list/${id}`);
  }




  getGenres(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/genres`);
  }
}
