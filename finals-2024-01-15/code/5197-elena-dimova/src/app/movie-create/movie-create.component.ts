import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrl: './movie-create.component.css'
})
export class MovieCreateComponent {
  movieForm!: FormGroup;
  genres: string[] = ['Drama', 'Action', 'Comedy', 'Sci-Fi', 'Thriller']; // don't have time for the actual data, so going for dummy data

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) {
    this.movieForm = this.formBuilder.group({
      title: ['', Validators.required],
      year: [null, Validators.required],
      plot: [''],
      director: ['', Validators.required],
      genre: [[]],
      rating: [null],
    });
  }

  onSubmit() {
    if (this.movieForm.invalid) {
      // Form is invalid, do not proceed with submission
      return;
    }
  
    // Assuming ApiService provides a method for creating a new movie
    this.apiService.createMovie(this.movieForm.value).subscribe(
      (newlyCreatedMovie) => {
        // Navigate to the movie details page for the newly created movie
        this.router.navigate(['/movies', newlyCreatedMovie.id]);
      },
      (error) => {
        console.error('Error creating movie:', error);
        // Handle error, show a message, etc.
      }
    );
  }

}
