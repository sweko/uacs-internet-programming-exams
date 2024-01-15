import { Component, OnInit } from '@angular/core';
import {MovieService} from "../services/movieServices/movie.service";
import { Movie } from "../models/movie.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService, private router: Router) {}

  viewMovie(id: number): void {
    this.router.navigate(['/movies', id]);
  }

  editMovie(id: number): void {
    this.router.navigate(['/movies', id, 'edit']);
  }

  deleteMovie(id: number): void {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.movieService.deleteMovie(id).subscribe(() => {
        this.movies = this.movies.filter(movie => movie.id !== id);
      });
    }
  }

  createMovie(): void {
    this.router.navigate(['/movies-create']);
  }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(
      (movies) => {
        this.movies = movies;
      },


      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  protected readonly Object = Object;
}
