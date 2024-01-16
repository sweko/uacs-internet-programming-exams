import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Bands } from '../models/client';
import { BandServerModel } from '../models/server';
import { toBand } from '../models/mapping';

@Injectable({
  providedIn: 'root'
})
export class BandServiceService {
  private apiUrl = 'https://localhost:3000'; // I dont know why my data is not read, it is not even connecting to the api url, it says connection refused. I have tried so many things and nothing worked  for me.
  constructor(private http:HttpClient) { }

  getBands(): Observable<Bands[]> {
    return this.http.get<BandServerModel[]>(`${this.apiUrl}/bands-list`).pipe(
      map(serverModels => serverModels.map(serverModel => toBand(serverModel)))
    );
  }
  getBandById(id: number): Observable<Bands> {
    return this.http.get<Bands>(`${this.apiUrl}/band-list/${id}`);
  }

  createBand(newBand: Bands): Observable<Bands> {
    return this.http.post<Bands>(`${this.apiUrl}`, newBand);
  }
  deleteBand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/bands/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting band:', error);
        throw error; // Re-throw the error to be caught by the component
      })
    );
  }



  getGenres(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/genres`);
  }
}
