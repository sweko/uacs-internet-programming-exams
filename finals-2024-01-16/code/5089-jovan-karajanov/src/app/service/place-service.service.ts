

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Places } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class PlaceServiceService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getPlaces(): Observable<Places[]> {
    return this.http.get<Places[]>(`${this.apiUrl}/place-list`);
  }
}
