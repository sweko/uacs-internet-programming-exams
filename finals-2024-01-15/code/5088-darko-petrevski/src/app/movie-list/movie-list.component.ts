import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe((data) => {
      this.movies = data.movies;
    });
  }

  deleteMovie(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this movie?');

    if (confirmDelete) {
      // Assuming you have a deleteMovie method in your MovieService
      this.movieService.deleteMovie(id).subscribe(() => {
        this.loadMovies(); // Refresh the movie list after deletion
      });
    }
  }

  viewMovieDetails(id: number): void {
    this.router.navigate(['/movies', id]);
  }

  editMovie(id: number): void {
    this.router.navigate(['/movies', id, 'edit']);
  }

  navigateToCreatePage(): void {
    this.router.navigate(['/movies/create']);
  }
}
