import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Band, Place } from '../../models/band';
import { BandResponse } from '../../models/server';
import { toBand, toBandResponse } from '../../models/mapping';

const BASE_URL = "http://localhost:3000"

@Injectable({
  providedIn: 'root'
})
export class BandService {

  private bandSubject$ = new BehaviorSubject<Band[]>([]);

  constructor(private http: HttpClient) { }

  getBands() {
    return this.http.get<BandResponse[]>(`${BASE_URL}/bands`).pipe(
      map(bandResponses => bandResponses.map(bandResponse => toBand(bandResponse))),
      tap(bands => this.bandSubject$.next(bands)),
    );
  }

  getBand(id: number): Observable<Band> {
    return this.http.get<BandResponse>(`${BASE_URL}/bands/${id}`).pipe(
      map(bandResponse => toBand(bandResponse)),
    );
  }

  getGenre() {
    return this.http.get<string[]>(`${BASE_URL}/genres`);
  }

  updateBand(updatedBand: Band) {
    const bandResponse = toBandResponse(updatedBand);
    return this.http.put<BandResponse>(`${BASE_URL}/bands/${updatedBand.id}`, bandResponse).pipe(
      map(bandResponse => toBand(bandResponse)),
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

  createBand(newBand: Band): Observable<Band> {
    const bandResponse = toBandResponse(newBand);
    return this.http.post<BandResponse>(`${BASE_URL}/bands`, bandResponse).pipe(
      map(bandResponse => toBand(bandResponse)),
      tap(band => {
        const bands = this.bandSubject$.getValue();
        bands.push(band);
        this.bandSubject$.next(bands);
      }),
    );
  }

getPlaces(): Observable<Place[]> {
  return this.getBands().pipe(
    map((bands) =>
      bands.map((band) => {
        const [city] = band.location.split(', ');
        return { id: band.id, city: [city], country: band.location.split(', ')[1] };
      })
    )
  );
}
}