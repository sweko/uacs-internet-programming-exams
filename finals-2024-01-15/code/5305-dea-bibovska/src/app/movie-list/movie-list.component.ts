import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../models/movie';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {

  movies: Movie[] = [];
  moviesSubscription$?: Subscription;
  selectedMovie?: Movie;
  @ViewChild('dialog') dialog?: ElementRef<HTMLDialogElement>;

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.moviesSubscription$ = this.movieService.getMovies().subscribe({
      next: movies => this.movies = movies,
      error: err => console.log(err)
    });
  }

  ngOnDestroy(): void {
    this.moviesSubscription$?.unsubscribe();
  }

  deleteMovie(movie: Movie) {
    this.selectedMovie = movie;
    this.dialog?.nativeElement.showModal();
  }

  editMovie(movie: Movie) {
    this.router.navigate(['/movies', movie.id, "edit"]);
  }

  viewMovie(movie: Movie) {
    this.router.navigate(['/movies', movie.id]);
  }

  addMovie() {
    this.router.navigate(['/movies', "create"]);
  }

  confirmModal() {
    this.movieService.deleteMovie(this.selectedMovie!.id).subscribe({
      next: () => {
        this.movies = this.movies.filter(m => m.id !== this.selectedMovie!.id);
        this.selectedMovie = undefined;
      },
      error: err => console.log(err)
    });
    this.closeModal();
  }

  closeModal() {
    this.selectedMovie = undefined;
    this.dialog?.nativeElement.close();
  }
}
