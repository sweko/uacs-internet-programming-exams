import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = 'assets/db/movie-data.json';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getMovieById(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  // Implement other methods as needed
}
