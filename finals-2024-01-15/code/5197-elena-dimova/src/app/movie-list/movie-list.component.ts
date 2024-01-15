import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  movies: any[] = []; // Array to store movies

  constructor(private apiService: ApiService, private router: Router) {
    // Fetch movies
    this.fetchMovies();
  }

  fetchMovies(): void {
    // Fetch all movies from the API
    this.apiService.getMovies().subscribe(
      (response) => {
        this.movies = response;
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  countOscars(oscars: any): number {
    // Count the number of oscars
    return oscars ? Object.keys(oscars).length : 0;
  }

  viewMovieDetails(id: number): void {
    this.router.navigate(['/movies', id]);
  }

  editMovie(id: number): void {
    this.router.navigate(['/movies', id, 'edit']);
  }

  deleteMovie(id: number): void {
    // Call your API service to delete the movie
    this.apiService.deleteMovie(id).subscribe(() => {
      // After successful deletion, reload the movie list
      this.fetchMovies();
    });
  }
}
