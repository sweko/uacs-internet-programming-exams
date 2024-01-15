// movie-create.component.ts

import { Component } from '@angular/core';
import { MovieDataService } from '../services/movie-data.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent {
    Movie: any newMovie = {
    title: '',
    year: 0,
    director: '',
    genre: [],
    plot: '',
    oscars: {},
    rating: 0
  };

  constructor(private movieDataService: MovieDataService) {}

  createMovie(): void {
    this.movieDataService.addMovie(this.newMovie).subscribe(createdMovie => {
    });
  }
}
