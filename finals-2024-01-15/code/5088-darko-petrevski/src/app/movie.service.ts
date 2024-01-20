import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = 'movie-manager/db/movie-data.json'; // Adjust the path based on your project structure

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getMovieById(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl).pipe(
      map((data: { movies: any[] }) => {
        return data.movies.find((movie) => movie.id === id);
      })
    );
  }

  deleteMovie(id: number): Observable<any> {
    // Adjust the URL and HTTP method based on your API
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete(url);
  }

  saveMovie(movie: any): Observable<any> {
    // Adjust the URL and HTTP method based on your API
    const url = `${this.baseUrl}/save`;
    return this.http.post(url, movie);
  }

  // Add other methods as needed
}
