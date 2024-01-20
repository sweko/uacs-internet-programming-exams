import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  movieId!: number;
  movieDetails: any;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.movieId = +params['id'];
      console.log('Movie ID:', this.movieId);
      this.loadMovieDetails();
    });
  }

  loadMovieDetails(): void {
    this.movieService.getMovieById(this.movieId).subscribe(
      (response) => {
        this.movieDetails = response;
      },
      (error) => {
        console.error('Error loading movie details:', error);
      }
    );
  }
}
