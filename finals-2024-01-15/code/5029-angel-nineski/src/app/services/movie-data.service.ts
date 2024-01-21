import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../models/movie';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MovieDataService {
  private apiUrl = 'db/movie-data.json';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies`);
  }

  deleteMovie(id: number): Observable<void> {
    const deleteUrl = `${this.apiUrl}movies/${id}`;
    return this.http.delete<void>(deleteUrl);
  }
  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movies/${id}`);
  }
  updateMovie(movie: Movie): Observable<void> {
    const updateUrl = `${this.apiUrl}/movies/${movie.id}`;
    return this.http.put<void>(updateUrl, movie);
  }
  addMovie(newMovie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}/movies`, newMovie);
  }
}
