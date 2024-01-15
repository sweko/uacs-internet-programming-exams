import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Movie } from '../models/client';
@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
})
export class MovieCreateComponent {
  newMovie = { title: '', year: 0, director: '' };

  constructor(private moviesService: MoviesService) {}

  


}
