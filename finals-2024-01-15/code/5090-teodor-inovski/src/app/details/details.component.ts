import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';

import { MovieService } from '../movie.service';

import { Movie } from '../models/client';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
  movie?: Movie;

  constructor(
    private route: ActivatedRoute, 
    private movieService: MovieService,
    private router: Router,
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
      },
      error: err => console.log(err)
    })
    
  }
  editMovie(movie:Movie) {
    this.router.navigate(['/movies', movie.id, "edit"]);
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
