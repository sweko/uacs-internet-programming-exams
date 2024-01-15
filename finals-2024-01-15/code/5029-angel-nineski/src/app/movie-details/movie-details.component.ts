import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDataService } from '../services/movie-data.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie | undefined;

  constructor(
    private route: ActivatedRoute,
    private movieDataService: MovieDataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const movieId = Number(params.get('id'));
      this.movieDataService.getMovieById(movieId).subscribe(
        movie => {
          this.movie = movie;
        },
        error => {
          console.error('Error loading movie details:', error);
        }
      );
    });
  }
}
