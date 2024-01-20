import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css'],
})
export class MovieEditComponent implements OnInit {
  movieId!: number;
  movie: any = {};  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moviesService: MoviesService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.movieId = +params['id'];
      this.loadMovieDetails();
    });
  }

  loadMovieDetails() {
    this.moviesService.getMovieById(this.movieId).subscribe(
      (movie) => {
        this.movie = movie;
      },
      (error) => {
        console.error('Error loading movie details:', error);
      }
    );
  }

  onSubmit() {
    this.moviesService.updateMovie(this.movieId, this.movie).subscribe(
      () => {
        console.log('Movie updated successfully');
        this.router.navigate(['/movie-list']);
      },
      (error) => {
        console.error('Error updating movie:', error);
      }
    );
  }

  addActor() {
    this.movie.cast.push({ actor: '', character: '' });
  }

  removeActor(index: number) {
    this.movie.cast.splice(index, 1);
  }
}