import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { Movie } from '../models/client';
import { Observable, Subscription, filter, map, switchMap } from 'rxjs';

import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  movie?: Movie;
  editForm: FormGroup= new FormGroup({});
  selectedMovie?: Movie;
  movieSubscription?: Subscription;
  @ViewChild('dialog') dialog?: ElementRef<HTMLDialogElement>; // TODO: type
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => this.isNumeric(id)),
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
      title: [this.movie?.title],
      year: [this.movie?.year],
      director: [this.movie?.director],
      genre: [this.movie?.genre],
      plot: [this.movie?.plot],


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
  updateMovie() {
    const updateMovie = {
      ...this.movie,
      ...this.editForm.value,
    };
    this.movieService.updateMovie(updateMovie).subscribe({
      next: () => this.router.navigate(['/movie-list']),
      error: err => console.log(err),
    });
  }
}