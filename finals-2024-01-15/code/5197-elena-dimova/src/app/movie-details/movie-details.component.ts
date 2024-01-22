import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Movie } from './movie.interface';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  movie: Movie|undefined;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {
    const movieId = this.route.snapshot.params.id;
    this.loadMovieDetails(movieId)
  }

  loadMovieDetails(id: number): void {
    this.apiService.getMovieById(id).subscribe((movie) => {
      this.movie = movie;
    });
  }

  editMovie(): void {
    const movieId = this.route.snapshot.params.id;
    this.router.navigate(['/movies', movieId, 'edit']);
  }

  deleteMovie(): void {
    const movieId = this.route.snapshot.params.id;

    // Call your API service to delete the movie
    this.apiService.deleteMovie(movieId).subscribe(() => {
      // After successful deletion, navigate to the movie list page
      this.router.navigate(['/movies']);
    });
  }
}
