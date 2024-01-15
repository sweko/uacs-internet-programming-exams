import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';

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
    this.movieService.getMovies().subscribe(
      (response) => {
        this.movies = response.movies;
      },
      (error) => {
        console.error('Error loading movies:', error);
      }
    );
  }

  getOscarsCount(oscars: any): number {
    return oscars ? Object.keys(oscars).length : 0;
  }

  editMovie(id: number): void {
    // Implement your edit logic here
  }

  deleteMovie(id: number): void {
    // Implement your delete logic here
  }
}
