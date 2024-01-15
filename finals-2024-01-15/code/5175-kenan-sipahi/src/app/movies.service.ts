import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie, Cast, Actor} from './models/client';

@Injectable({
  providedIn: 'root',
})

export class MoviesService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/movies`);
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/movies/${id}`);
  }

  createMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.baseUrl}/movies`, movie);
  }

  updateMovie(id: number, updatedMovie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.baseUrl}/movies/${id}`, updatedMovie);
  }

  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/movies/${id}`);
  }

  getGenres(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/genres`);
  }

  getAllActors(): Observable<Cast[]> {
    return this.http.get<Cast[]>(`${this.baseUrl}/actors`);
  }

  getActorById(id: number): Observable<Cast> {
    return this.http.get<Cast>(`${this.baseUrl}/actors/${id}`);
  }

  getActorByName(name: string): Observable<Actor> {
    return this.http.get<Actor>(`${this.baseUrl}/actors?name=${name}`);

  }

  
}