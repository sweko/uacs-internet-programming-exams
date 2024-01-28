import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Band } from '../models/band';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class BandsService {

  constructor(private http: HttpClient) { }

  getBands() {
    return this.http.get<Band[]>(`${BASE_URL}/bands`)
  }

  deleteBand(bandId: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/bands/${bandId}`);
  }

  getBand(bandId: number): Observable<Band> {
    return this.http.get<Band>(`${BASE_URL}/bands/${bandId}`);
  }

  createBand(band: Band): Observable<Band> {
    return this.http.post<Band>(`${BASE_URL}/bands`, band);
  }

  updateBand(bandId: number, band: Band): Observable<void> {
    return this.http.put<void>(`${BASE_URL}/bands/${bandId}`, band);
  }

   getStatistics(): Observable<{ totalBands: number, totalAlbums: number, totalGenres: number }> {
    return this.getBands().pipe(
      map(bands => {
        const totalBands = bands.length;
        const totalAlbums = bands.reduce((acc, band) => acc + band.albums.length, 0);
        const genres = new Set(bands.map(band => band.genre));
        const totalGenres = genres.size;
        return { totalBands, totalAlbums, totalGenres };
      })
    );
  }
}