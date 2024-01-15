import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://localhost:3000';

  constructor(private http: HttpClient) { }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movies/${id}`);
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies`);
  }
  
  getMoviesByYear(year: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies/${year}`);
  }
  
  getMoviesDirector(director: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies/${director}`);
  }
  
  getMoviesGenre(genre: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies/${genre}`);
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}/movies`, movie);
  }

  updateMovie(id: number, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/movies/${id}`, movie);
  }

  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/movies/${id}`);
  }
}