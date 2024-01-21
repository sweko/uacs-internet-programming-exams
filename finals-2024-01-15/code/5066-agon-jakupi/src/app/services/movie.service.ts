// movie.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies`);
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movies/${id}`);
  }

  editMovie(id: number, updatedMovie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/movies/${id}`, updatedMovie);
  }

  deleteMovie(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/movies/${id}`);
  }

  createMovie(newMovie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}/movies`, newMovie);
  }


 
}
