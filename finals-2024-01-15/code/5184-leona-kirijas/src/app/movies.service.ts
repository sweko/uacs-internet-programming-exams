import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, Genre, Actor } from './models/client'; 
import { toMovie, toMovieResponse } from './models/mapping'; 

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${BASE_URL}/movies`);
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${BASE_URL}/movies/${id}`);
  }

  createMovie(newMovie: Movie): Observable<Movie> {
    const movieResponse = toMovieResponse(newMovie); 
    return this.http.post<Movie>(`${BASE_URL}/movies`, movieResponse); 
  }

  updateMovie(updatedMovie: Movie): Observable<Movie> {
    const movieResponse = toMovieResponse(updatedMovie); 
    return this.http.put<Movie>(`${BASE_URL}/movies/${updatedMovie.id}`, movieResponse);
  }

  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/movies/${id}`);
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${BASE_URL}/genres`);
  }

  getActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(`${BASE_URL}/actors`);
  }

  getActor(id: number): Observable<Actor> {
    return this.http.get<Actor>(`${BASE_URL}/actors/${id}`);
  }

  getActorByName(name: string): Observable<Actor> {
    return this.http.get<Actor>(`${BASE_URL}/actors?name=${name}`);
  }
}

