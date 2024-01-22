import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Actor, Genre, Movie } from '../models/Movie';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private movieSubject$ = new BehaviorSubject<Movie[]>([]);

  constructor(private http: HttpClient) 
  { 

  }

  getMovies(){
    return this.http.get<Movie[]>(`${BASE_URL}/movies`)/*.pipe(
      map(movieResponses => movieResponses.map(movieResponse => toMovie(movieResponse))),
      tap(movies => this.movieSubject$.next(movies)),
    );*/
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${BASE_URL}/movies/${id}`)
  }

  postMovie(MovieObj: Movie)
  {
    return this.http.post<Movie>(`${BASE_URL}`, MovieObj)
  }

  //updateAuthor(updatedMovie: Movie) {
    //const authorResponse = toAuthorResponse(updatedAuthor);
    /*return this.http.put<Movie>(`${BASE_URL}/movies/${updatedMovie.id}`, updatedMovie).pipe(tap(movie => {
      const authors = this.movieSubject$.getValue();
      const index = movie.findIndex(m => m.id === movie.id);
      movies[index] = movie;
      this.movieSubject$.next(movies);
      })*/

  //}
 //another way 
  updateMovie(MovieObj: Movie, id: number)
  {
    return this.http.put<Movie>(`${BASE_URL}/movies/${id}`, MovieObj)
  }

  deleteMovie(id: number) {
    return this.http.delete(`${BASE_URL}/movies/${id}`).pipe(
      tap(() => {
        const movies = this.movieSubject$.getValue();
        const index = movies.findIndex(a => a.id === id);
        movies.splice(index, 1);
        this.movieSubject$.next(movies);
      }),
    );
  }

  getGenres(){
    return this.http.get<Genre[]>(`${BASE_URL}/genres`)
  }


  getActors() {
    return this.http.get<Actor[]>(`${BASE_URL}/actors`)
  }

  getActor(id: number): Observable<Actor> {
    return this.http.get<Actor>(`${BASE_URL}/actors/${id}`)
  }

  getActorByName(name: string): Observable<Actor> {
    return this.http.get<Actor>(`${BASE_URL}/actors?name=${name}`)
  }
}
