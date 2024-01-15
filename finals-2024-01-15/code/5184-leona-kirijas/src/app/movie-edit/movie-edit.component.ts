import { Component, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import { Movie } from '../models/client';
import { Observable, filter, map, switchMap } from 'rxjs';
import { isNumeric } from '../common/utils';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent {
  movie?: Movie;
  editForm: FormGroup = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => isNumeric(id)),
      map(id => parseInt(id!, 10)),
      switchMap(id => this.moviesService.getMovie(id)),
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
      title: [this.movie?.title],
      year: [this.movie?.year],
      director: [this.movie?.director],
      rating: [this.movie?.rating],
      plot: [this.movie?.plot],
    });
  }

  updateMovie() {
    const updatedMovie = {
      ...this.movie,
      ...this.editForm.value,
    };
    this.moviesService.updateMovie(updatedMovie).subscribe({
      next: () => this.router.navigate(['/movies']),
      error: err => console.log(err),
    });
  }
}