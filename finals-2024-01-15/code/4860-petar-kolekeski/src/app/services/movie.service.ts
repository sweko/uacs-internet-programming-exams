import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Movie} from "../models/movie";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }


  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('https://localhost:3000/movies')
  }

  getMovie(id: number): Observable<Movie>{
    return this.http.get<Movie>(`https://localhost:3000/movies/${id}`)
  }

  addMovie(movie: Movie): Observable<void>{
    return this.http.post<void>('https://localhost:3000/movies', movie)
  }

  updateMovie(movie: Movie): Observable<void>{
    return this.http.put<void>(`https://localhost:3000/movies/${movie.id}`, movie)
  }

  deleteMovie(id: number): Observable<void>{
    return this.http.delete<void>(`https://localhost:3000/movies/${id}`)
  }

  getGenres(): Observable<string[]>{
    return this.http.get<string[]>('https://localhost:3000/genres')
  }
}
