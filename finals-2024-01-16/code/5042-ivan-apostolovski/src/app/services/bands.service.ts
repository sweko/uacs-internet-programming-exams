import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bands } from '../models/student';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class BandsService {

  constructor(private http: HttpClient) { }
  getBands() {
    return this.http.get<Bands[]>(`${BASE_URL}/bands`)
  }

  getBand(id: number): Observable<Bands> {
    return this.http.get<Bands>(`${BASE_URL}/bands/${id}`)
  }

  deleteBand(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/bands/${id}`);
  }

  updateBand(band: Bands): Observable<Bands> {
    return this.http.put<Bands>(`${BASE_URL}/bands/${band.id}`, band);
  }
  
  addBand(newBand: Bands): Observable<Bands> {
    return this.http.post<Bands>(`${BASE_URL}/bands`, newBand);
  }
}
