import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Album, Band } from '../../service-data/app-data';
import { AlbumData, BandData } from '../../service-data/server-data';
import { toAlbum, toBand, toBandData } from '../../service-data/data-map';

const dataURL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class BandsService {

  private bandSave$ = new BehaviorSubject<Band[]>([]);

  constructor(private http: HttpClient) { }

  getBands(): Observable<Band[]> {
    return this.http.get<BandData[]>(`${dataURL}/bands`).pipe(
      map(bandData => bandData.map(toBand)),
      tap(bands => this.bandSave$.next(bands))
    );
  }

  getBand(id: number): Observable<Band> {
    return this.http.get<BandData>(`${dataURL}/bands/${id}`).pipe(
      map(toBand)
    );
  }

  getAlbums(): Observable<Album[]> {
    return this.http.get<AlbumData[]>(`${dataURL}/albums`).pipe(
      map(albumsData => albumsData.map(toAlbum))
    );
  }

  updateBand(updatedBand: Band): Observable<Band> {
    const bandResponse = toBandData(updatedBand);
    return this.http.put<BandData>(`${dataURL}/bands/${updatedBand.id}`, bandResponse).pipe(
      map(toBand),
      tap(band => {
        const bands = this.bandSave$.getValue();
        const index = bands.findIndex(b => b.id === band.id);
        if (index !== -1) {
          bands[index] = band;
          this.bandSave$.next(bands);
        }
      })
    );
  }

  deleteBand(id: number): Observable<void> {
    return this.http.delete<void>(`${dataURL}/bands/${id}`).pipe(
      tap(() => {
        const bands = this.bandSave$.getValue();
        const index = bands.findIndex(b => b.id === id);
        if (index !== -1) {
          bands.splice(index, 1);
          this.bandSave$.next(bands);
        }
      })
    );
  }
}

