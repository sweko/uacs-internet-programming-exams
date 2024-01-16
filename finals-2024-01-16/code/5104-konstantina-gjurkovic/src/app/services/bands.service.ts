import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BandResponse } from '../models/server';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { toBand, toBandResponse } from '../models/mapping';
import { Band } from '../models/client';
import { Place } from '../models/place';
import { BandCreate } from '../models/band-create';
import { Genre } from '../models/genre';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class BandsService {

  private bandsSubject$ = new BehaviorSubject<Band[]>([]);

  constructor(private http: HttpClient) { }

  getBands(filters: { name?: string, country?: string, genre?: string }): Observable<Band[]> {
    let url = 'http://localhost:3000/bands';
    const queryParams: string[] = [];
    
    if (filters.name) queryParams.push(`name=${encodeURIComponent(filters.name)}`);
    if (filters.country) queryParams.push(`country=${encodeURIComponent(filters.country)}`);
    if (filters.genre) queryParams.push(`genre=${encodeURIComponent(filters.genre)}`);
    
    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }
  
    return this.http.get<Band[]>(url);
  }
  

  getBand(id: number): Observable<Band> {
    return this.http.get<BandResponse>(`${BASE_URL}/bands/${id}`).pipe(
      map(bandResponse => toBand(bandResponse)),
    );
  }

  updateBand(updatedBand: Band) {
    const bandResponse = toBandResponse(updatedBand);
    return this.http.put<BandResponse>(`${BASE_URL}/bands/${updatedBand.id}`, bandResponse).pipe(
      map(bandResponse => toBand(bandResponse)),
      tap(band => {
        const bands = this.bandsSubject$.getValue();
        const index = bands.findIndex(b => b.id === band.id);
        bands[index] = band;
        this.bandsSubject$.next(bands);
      }),
    );
  }

  deleteBand(id: number) {
    return this.http.delete(`${BASE_URL}/bands/${id}`).pipe(
      tap(() => {
        const bands = this.bandsSubject$.getValue();
        const index = bands.findIndex(b => b.id === id);
        bands.splice(index, 1);
        this.bandsSubject$.next(bands);
      }),
    );
  }

  getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(`${BASE_URL}/places`);
  }

  getGenres(): Observable<any[]> {
    return this.http.get<Genre[]>(`${BASE_URL}/genres`);
  }

  createBand(newBand: BandCreate): Observable<any> {
    return this.http.post(`${BASE_URL}/bands`, newBand);
  }

  getTotalBands(): Observable<number> {
    return this.http.get<number>(`${BASE_URL}/statistics/total-bands`);
  }

  getTotalBandMembers(): Observable<number> {
    return this.http.get<number>(`${BASE_URL}/statistics/total-band-members`);
  }

  getTotalGenres(): Observable<number> {
    return this.http.get<number>(`${BASE_URL}/statistics/total-genres`);
  }

  getTotalAlbums(): Observable<number> {
    return this.http.get<number>(`${BASE_URL}/statistics/total-albums`);
  }

}