import { Component } from '@angular/core';
import { MovieService } from './services/movies.service';
import { Observable } from 'rxjs';
import { Movie } from './models/Movie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  //movie$: Observable<Movie> = this.movieService.getMovie();
  
  constructor(private movieService: MovieService) { 
    
  }
}
