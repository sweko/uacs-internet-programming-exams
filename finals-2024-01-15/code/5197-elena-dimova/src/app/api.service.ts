import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Get all movies
  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/movies`);
  }

    // Get a single movie by ID
    getMovieById(id: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/movies/${id}`);
    }
  
    // Create a new movie
    createMovie(movieData: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/movies`, movieData);
    }
  
    // Update an existing movie
    updateMovie(id: number, movieData: any): Observable<any> {
      return this.http.put(`${this.baseUrl}/movies/${id}`, movieData);
    }
  
    // Delete a movie by ID
    deleteMovie(id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/movies/${id}`);
    }
}