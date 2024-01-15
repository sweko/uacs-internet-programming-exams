import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieDataService } from '../services/movie-data.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieDataService: MovieDataService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  private loadMovies(): void {
    this.movieDataService.getMovies().subscribe((movies) => {
      this.movies = movies;
    });
  }

  deleteMovie(id: number): void {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.movieDataService.deleteMovie(id).subscribe(() => {
        this.loadMovies();
      });
    }
  }
  countKeys(obj: object): number {
    return Object.keys(obj).length;
  }

}
