import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie, Student } from '../models/student';
import { Observable } from 'rxjs';


const BASE_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get<Movie[]>('${BASE_URL}/movies')
  }

  deleteMovie(id: string): Observable<any> {
    return this.http.delete<Movie[]>('${BASE_URL}/movies/${id}')
  }
}
