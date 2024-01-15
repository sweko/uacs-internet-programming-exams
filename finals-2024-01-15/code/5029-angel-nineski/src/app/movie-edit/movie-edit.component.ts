// movie-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDataService } from '../services/movie-data.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css'],
})
export class MovieEditComponent implements OnInit {
  movie: Movie | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieDataService: MovieDataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const movieId = Number(params.get('id'));
      this.movieDataService.getMovieById(movieId).subscribe((movie) => {
        this.movie = movie;
      });
    });
  }

  saveChanges(): void {
    if (this.movie) {
      this.movieDataService.updateMovie(this.movie).subscribe(() => {
        this.router.navigate(['/movies', this.movie?.id]);
      });
    }
  }
}
