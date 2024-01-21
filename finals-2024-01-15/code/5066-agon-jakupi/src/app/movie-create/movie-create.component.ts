import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent {
  newMovie: any = {}; 

  constructor(private movieService: MovieService, private router: Router) { }

  createMovie() {
    
    this.movieService.createMovie(this.newMovie).subscribe(
      (data) => {
        console.log('Movie created successfully', data);
        
        this.router.navigate(['/movies', data.id]);
      },
      (error) => {
        console.error('Error creating movie', error);
      }
    );
  }
}
