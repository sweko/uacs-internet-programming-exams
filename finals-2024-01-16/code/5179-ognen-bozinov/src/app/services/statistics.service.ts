import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockStatisticsService {
  getBandsPerGenre(): Observable<any> {
    // Simulate data
    const bandsPerGenre = {
      'Doom Metal': 4,
      'Rock': 8,
      // Add more genres as needed
    };
    return of(bandsPerGenre);
  }

  getAlbumsPerGenre(): Observable<any> {
    // Simulate data
    const albumsPerGenre = {
      'Doom Metal': 12,
      'Rock': 24,
      // Add more genres as needed
    };
    return of(albumsPerGenre);
  }

  getAlbumsPerDecade(): Observable<any> {
    // Simulate data
    const albumsPerDecade = {
      '2010s': 10,
      '2020s': 15,
      // Add more decades as needed
    };
    return of(albumsPerDecade);
  }
}
