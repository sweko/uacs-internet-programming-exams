import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Band } from '../models/band.model';

@Injectable({
  providedIn: 'root',
})
export class BandService {
  private apiUrl = 'https://localhost:3000/bands';

  constructor(private http: HttpClient) {}

  getBands(): Observable<Band[]> {
    return this.http.get<Band[]>(this.apiUrl);
  }

  getBandById(id: string): Observable<Band> {
    return this.http.get<Band>(`${this.apiUrl}/${id}`);
  }

  createBand(band: Band): Observable<Band> {
    return this.http.post<Band>(this.apiUrl, band);
  }

  updateBand(id: string, band: Band): Observable<Band> {
    return this.http.put<Band>(`${this.apiUrl}/${id}`, band);
  }

  deleteBand(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
