import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe((data) => {
      this.movies = data.movies;
    });
  }

  deleteMovie(id: number): void {
    // Implement delete logic here
    // You may want to confirm the deletion using a dialog
    // Once deleted, refresh the movie list
  }

  viewMovieDetails(id: number): void {
    // Implement navigation to movie details page
  }

  editMovie(id: number): void {
    // Implement navigation to movie edit page
  }

  navigateToCreatePage(): void {
    // Implement navigation to movie create page
  }
}
