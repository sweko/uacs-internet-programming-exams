import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrl: './movie-edit.component.css'
})
export class MovieEditComponent {
  movie: any;
  movieForm!: FormGroup;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    ) {
    this.fetchMovieById(this.route.snapshot.params.id);
  }

  fetchMovieById(id: number): void {
    // Fetch all movies from the API
    this.apiService.getMovieById(id).subscribe(
      (movie) => {
        this.initForm(movie);
        this.movie = movie;
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  saveMovie(): void {
    if (this.movieForm.valid) {
      this.apiService.updateMovie(this.route.snapshot.params.id, this.movie).subscribe(
        () => {
          // After saving, navigate back to the movie details page
          this.router.navigate(['movies', this.route.snapshot.params.id]);
        },
        (error) => {
          console.error('Error saving movie:', error);
          // Handle error appropriately
        }
      );
    }else{
      // If the form is invalid, log an error and handle validation errors
      console.error('Form is invalid. Please check the entered data');
    }
  }

  private initForm(movie: any): void {
    this.movieForm = this.formBuilder.group({
      title: [movie.title, Validators.required],
      year: [movie.year, [Validators.required, Validators.pattern(/^\d{4}$/)]],
      // have no time to add other fields...
    });
  }
}
