import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
})
export class MovieCreateComponent {
  movie: any = {};

  constructor(private movieService: MovieService, private router: Router) {}

  saveMovie() {

    this.router.navigate(['/movies', this.movie.id]);
  }
}
