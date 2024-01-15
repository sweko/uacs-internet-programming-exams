import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = '/assets/db/movie-data.json';

  constructor(private http: HttpClient) {}

  getMovieById(id: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}`);
  }

  createMovie(movie: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, movie);
  }

  updateMovie(id: number, movie: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, movie);
  }

  deleteMovie(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  getMovies(): Observable<{ movies: any[] }> {
    return this.http.get<{ movies: any[] }>(`${this.apiUrl}`);
  }
}
