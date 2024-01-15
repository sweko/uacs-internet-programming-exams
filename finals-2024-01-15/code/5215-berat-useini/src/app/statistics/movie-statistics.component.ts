import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movieServices/movie.service';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './movie-statistics.component.ts',
  styleUrls: ['./movie-statistics.component.css']
})
export class MovieStatisticsComponent implements OnInit {
  totalNumberOfMovies: number = 0;
  totalNumberOfActors: number = 0;
  totalNumberOfGenres: number = 0;
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(
      movies => {
        this.totalNumberOfMovies = movies.length;

      },
      error => console.error('Error fetching movies:', error)
    );

    this.movieService.getActors().subscribe(
      actors => {
        // @ts-ignore
        this.totalNumberOfActors = actors.length;

      },
      error => console.error('Error fetching actors:', error)
    );

    this.movieService.getGenres().subscribe(
      genres => {
        this.totalNumberOfGenres = genres.length;

      },
      error => console.error('Error fetching genres:', error)
    );

  }
}
