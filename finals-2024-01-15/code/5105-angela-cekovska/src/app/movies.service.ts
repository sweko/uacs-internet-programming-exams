import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Movie } from './modules/client';

const BASE_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private movieSubject$ = new BehaviorSubject<Movie[]>([]);

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${BASE_URL}/movies`).pipe(
      map(movies => movies as Movie[]),
      tap(movies => this.movieSubject$.next(movies)),
    );
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${BASE_URL}/movies/${id}`).pipe(
      map(movie => movie as Movie),
    );
  }
}



