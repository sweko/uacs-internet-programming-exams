import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from "../services/movieServices/movie.service";
import { Movie } from "../models/movie.model";


@Component({
  selector: 'app-add-movie',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent {
  genres: string[] = [];

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.movieService.getGenres().subscribe(
      genresData => this.genres = genresData,
      error => console.error('Error fetching genres:', error)
    );
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const newMovie: Movie = form.value;
      this.movieService.createMovie(newMovie).subscribe(
        () => this.router.navigate(['/movie-list']),
        error => console.error('Error adding movie:', error)
      );
    }
  }
}
