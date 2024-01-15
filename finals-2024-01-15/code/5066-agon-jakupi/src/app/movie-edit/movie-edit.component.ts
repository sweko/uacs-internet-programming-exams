// movie-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  movieId: number = 0;
  movie: any = {}; 

  constructor(private route: ActivatedRoute, private router: Router, private movieService: MovieService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = +params['id'] || 0;
      this.loadMovieDetails();
    });
  }

  loadMovieDetails() {
  
    this.movieService.getMovieById(this.movieId).subscribe(
      (data) => {
        this.movie = data;
      },
      (error) => {
        console.error('Error fetching movie details', error);
      }
    );
  }

  saveChanges() {
   
    this.movieService.editMovie(this.movieId, this.movie).subscribe(
      (data) => {
        console.log('Movie updated successfully', data);
        
        this.router.navigate(['/movies', this.movieId]);
      },
      (error) => {
        console.error('Error updating movie', error);
      }
    );
  }

}
