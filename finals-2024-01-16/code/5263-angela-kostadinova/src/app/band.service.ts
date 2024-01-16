import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Band } from './models/band';

const BASE_URL = "http://localhost:3000"

@Injectable({
  providedIn: 'root',
})
export class BandService {
  private bandSubject$ = new BehaviorSubject<Band[]>([]);
  getAllBands() {
    
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://localhost:3000';

  constructor(private http: HttpClient) {}

  getBands(): Observable<Band[]> {
    return this.http.get<Band[]>(this.apiUrl);
  }

  getBandById(id: number): Observable<Band> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Band>(url);
  }

  createBand(band: Band): Observable<Band> {
    return this.http.post<Band>(this.apiUrl, band);
  }

  updateBand(band: Band): Observable<Band> {
    const url = `${this.apiUrl}/${band.id}`;
    return this.http.put<Band>(url, band);
  }

  deleteBand(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
