import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Band, CountryCities } from '../models/band';
import { Observable, map } from 'rxjs';


const BASE_URL = 'http://localhost:3000';

@Injectable({
    providedIn: 'root'
})
export class BandsService {
    apiUrl: any;
    countries: CountryCities[] = [];

    constructor(private http: HttpClient) { }

    getBands(): Observable<Band[]> {
        return this.http.get<Band[]>(`${BASE_URL}/bands`);
    }

    updateBand(band: Band): Observable<Band> {
        return this.http.put<Band>(`${BASE_URL}/bands/${band.id}`, band);
    }

    deleteBand(bandId: number): Observable<void> {
        return this.http.delete<void>(`${BASE_URL}/bands/${bandId}`);
    }

    addBand(newBand: Band): Observable<Band> {
        const { id, ...bandWithoutId } = newBand;
        return this.http.post<Band>(`${BASE_URL}/bands`, bandWithoutId);
    }

    getBandById(bandId: number): Observable<Band> {
        return this.http.get<Band>(`${BASE_URL}/bands/${bandId}`);
    }

    getGenres(): Observable<string[]> {
        return this.http.get<string[]>(`${BASE_URL}/genres`);
    }

    getCountries(): Observable<CountryCities[]> {
        return this.http.get<CountryCities[]>(`${BASE_URL}/places`);
    }

    getSimilarBands(genre: string): Observable<Band[]> {
        return this.http.get<Band[]>(`${BASE_URL}/similar-bands?genre=${genre}`);
    }

    getCitiesForCountry(country: string): Observable<string[]> {
        return this.http.get<string[]>(`${BASE_URL}/places?country=${country}`);
      }

}