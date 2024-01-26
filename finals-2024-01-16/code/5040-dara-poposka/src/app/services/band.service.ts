import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Band } from '../models/client';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class BandsService {

  private bandSubject$ = new BehaviorSubject<Band[]>([]);

  constructor(private http: HttpClient) { }

  getBands() {
    // Implementation for getting all bands
  }

  getBand(id: number): Observable<Band> {
    return this.http.get<Band>(`${BASE_URL}/bands/${id}`);
  }

  createBand(newBand: Band) {
    const bandRequest = Band.toServerRequest(newBand);
    return this.http.post<Response>(`${BASE_URL}/bands`, bandRequest).pipe(
      map(bandResponse => Band.fromServerResponse(bandResponse)),
      tap(band => {
        const bands = this.bandSubject$.getValue();
        bands.push(band);
        this.bandSubject$.next(bands);
      }),
    );
  }

  updateBand(updatedBand: Band) {
    const bandResponse = Band.toServerResponse(updatedBand);
    return this.http.put<Response>(`${BASE_URL}/bands/${updatedBand.id}`, bandResponse).pipe(
      map(bandResponse => Band.fromServerResponse(bandResponse)),
      tap(band => {
        const bands = this.bandSubject$.getValue();
        const index = bands.findIndex(a => a.id === band.id);
        bands[index] = band;
        this.bandSubject$.next(bands);
      }),
    );
  }

  deleteBand(id: number) {
    return this.http.delete(`${BASE_URL}/bands/${id}`).pipe(
      tap(() => {
        const bands = this.bandSubject$.getValue();
        const index = bands.findIndex(a => a.id === id);
        bands.splice(index, 1);
        this.bandSubject$.next(bands);

        
      }),
    );
  }
}