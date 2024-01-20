import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieResponse, ActorResponse } from './models/server';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { toMovie, toMovieResponse, toActor, toActorResponse } from './models/mapping';
import { Movie, Actor } from './models/client';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private movieSubject$ = new BehaviorSubject<Movie[]>([]);

  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get<MovieResponse[]>(`${BASE_URL}/movies`).pipe(
      map(movieResponses => movieResponses.map(movieResponse => toMovie(movieResponse))),
      tap(movies => this.movieSubject$.next(movies)),
    );
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<MovieResponse>(`${BASE_URL}/movies/${id}`).pipe(
      map(movieResponse => toMovie(movieResponse)),
    );
  }

  getGenres() {
    return this.http.get<string[]>(`${BASE_URL}/genres`);
  }

  getActors() {
    return this.http.get<ActorResponse[]>(`${BASE_URL}/actors`).pipe(
      map(actorResponses => actorResponses.map(actorResponse => toActor(actorResponse))),
    );
  }

  updateMovie(updatedMovie: Movie) {
    const movieResponse = toMovieResponse(updatedMovie);
    return this.http.put<MovieResponse>(`${BASE_URL}/movies/${updatedMovie.id}`, movieResponse).pipe(
      map(movieResponse => toMovie(movieResponse)),
      tap(movie => {
        const movies = this.movieSubject$.getValue();
        const index = movies.findIndex(m => m.id === movie.id);
        movies[index] = movie;
        this.movieSubject$.next(movies);
      }),
    );
  }

  deleteMovie(id: number) {
    return this.http.delete(`${BASE_URL}/movies/${id}`).pipe(
      tap(() => {
        const movies = this.movieSubject$.getValue();
        const index = movies.findIndex(m => m.id === id);
        movies.splice(index, 1);
        this.movieSubject$.next(movies);
      }),
    );
  }
}
