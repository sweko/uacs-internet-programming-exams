import { Component } from '@angular/core';
import { Movie } from '../models/Movie';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movies.service';
import { Observable, filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrl: './movie-edit.component.css'
})
export class MovieEditComponent {

  movie?: Movie;
  editForm: FormGroup = new FormGroup({});

  //genres$: Observable<string[]> = this.movieService.getGenres();
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => this.isNumeric(id)),  //  this.
      map(id => parseInt(id!, 10)),
      switchMap(id => this.movieService.getMovie(id)),
    ).subscribe({
      next: movie => {
        this.movie = movie;
        this.prepareForm();
      },
      error: err => console.log(err)
    });
  }


  prepareForm() {
    this.editForm = this.fb.group({
      id: [this.movie?.id],
      title: [this.movie?.title],
      year: [this.movie?.year],
      director: [this.movie?.director],
      genre: [this.movie?.genre],
      plot: [this.movie?.plot],
      cast: [this.movie?.cast],
      rating: [this.movie?.rating],
    });
  }

  updateMovie() {
    const updateMovie = {
      ...this.movie,
      ...this.editForm.value,
    };
    this.movieService.updateMovie(updateMovie, this.movie!.id).subscribe({
      next: () => this.router.navigate(['/movies']),
      error: err => console.log(err),
    });
  }


  isNumeric = (value: string | null): boolean => {
    if (value === null) {
        return false;
    }
    const numValue = parseInt(value);
    if (isNaN(numValue)) {
        return false;
    }
    if (numValue <= 0) {
        return false;
    }
    return true;
}

}
