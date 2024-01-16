import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Band } from '../models/client';
import { BandResponse } from '../models/server';
import { toBand, toBandResponse } from '../models/mapping';

const BASE_URL='http://localhost:3000'

@Injectable({
  providedIn: 'root'
})

export class BandsService {
  constructor(private http: HttpClient) { }

  private bandSubject$ = new BehaviorSubject<Band[]>([]);

  
  getBands () {
    return this.http.get<BandResponse[]>(`${BASE_URL}/bands`)
    .pipe(
      map(bandsResponses=> bandsResponses.map(bandResponse => toBand(bandResponse))),
      // tap (bandsResponses => console.log(bandsResponses)),
      
    );
  }

  getAlbums() {
    return this.http.get<string[]>(`${BASE_URL}/albums`);
  }

  updateBand(updatedBand: Band) {
    const bandResponse = toBandResponse(updatedBand);
    return this.http.put<BandResponse>(`${BASE_URL}/bands/${updatedBand.id}`, bandResponse).pipe(
      map(bandResponse => toBand(bandResponse)),
      tap((band) => {
        const authors = this.bandSubject$.getValue();
        const index = authors.findIndex(a => a.id === band.id);
        band = band;
        this.bandSubject$.next(authors);
      }),
    );
  }

}
