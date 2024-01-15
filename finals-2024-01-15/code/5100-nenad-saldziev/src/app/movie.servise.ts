import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { movieResponse } from './addons/server';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { toMovie, toMovieResponse } from './addons/mapping';
import { movie } from './addons/movie';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class moviesService {


  private movieSubject$ = new BehaviorSubject<movie[]>([]);

  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get<movieResponse[]>(`${BASE_URL}/movies`).pipe(
      map(movieResponses => movieResponses.map(movieResponse => toMovie(movieResponse))),
      tap(movies => this.movieSubject$.next(movies)),
    );
  }

  getMovie(id: number): Observable<movie> {
    return this.http.get<movieResponse>(`${BASE_URL}/movies/${id}`).pipe(
      map(movieResponse => toMovie(movieResponse)),
    );
  }

  getNationalities() {
    return this.http.get<string[]>(`${BASE_URL}/nationalities`);
  }

  // updateMovie(updatedMovie: movie) {
  //   const movieResponse = toMovieResponse(updatedMovie);
  //   return this.http.put<movieResponse>(`${BASE_URL}/movies/${updatedMovie.id}`, movieResponse).pipe(
  //     map(movieResponse => toMovie(movieResponse)),
  //     tap(movie => {
  //       const movies = this.movieSubject$.getValue();
  //       const index = movie.findIndex(m => m.id === movie.id);
  //       movies[index] = movie;
  //       this.movieSubject$.next(movies);
  //     }),
  //   );
  // }

//   deleteMovie(id: number) {
//     return this.http.delete(`${BASE_URL}/movies/${id}`).pipe(
//       tap(() => {
//         const movies = this.movieSubject$.getValue();
//         const index = movies.findIndex((m: { id: number; }) => m.id === id);
//         movies.splice(index, 1);
//         this.movieSubject$.next(movies);
//       }),
//     );
//   }
}