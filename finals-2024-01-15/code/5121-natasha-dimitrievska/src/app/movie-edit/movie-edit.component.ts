import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css'],
})
export class MovieEditComponent implements OnInit {
  movie: any;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMovieDetails();
  }

  loadMovieDetails() {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      const numericMovieId = Number(movieId);
      this.movieService.getMovieById(numericMovieId).subscribe(
        (data) => {
          this.movie = data;
        },
        (error) => {
          console.error('Error loading movie details:', error);
        }
      );
    }
  }

  saveMovie() {
    this.movieService.updateMovie(this.movie.id, this.movie).subscribe(
      (data) => {
        console.log('Movie updated successfully:', data);
        this.router.navigate(['/movies', this.movie.id]);
      },
      (error) => {
        console.error('Error updating movie:', error);
      }
    );
  }
}
