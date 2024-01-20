import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '..//movie.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.scss']
})
export class MovieEditComponent implements OnInit {
  movieId: number;
  movie: any;

  constructor(private route: ActivatedRoute, private router: Router, private movieService: MovieService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.movieId = +idParam;
        this.loadMovieDetails();
      } else {
        console.error('Movie ID parameter is null.');
      }
    });
  }

  loadMovieDetails(): void {
    this.movieService.getMovieById(this.movieId).subscribe(
      (data) => {
        this.movie = data;
      },
      (error) => {
        console.error('Error loading movie details:', error);
      }
    );
  }

  saveMovie(): void {
    if (this.movie) {
      // Assuming you have a MovieService method for updating movies
      this.movieService.updateMovie(this.movie).subscribe(
        (updatedMovie) => {
          console.log('Movie updated successfully:', updatedMovie);
          // After saving, navigate to the movie details page
          this.router.navigate(['/movies', this.movieId]);
        },
        (error) => {
          console.error('Error updating movie:', error);
        }
      );
    } else {
      console.error('No movie data to save.');
    }
  }

  cancelEdit(): void {
    // Navigate back to the movie details page without saving changes
    this.router.navigate(['/movies', this.movieId]);
  }
}
