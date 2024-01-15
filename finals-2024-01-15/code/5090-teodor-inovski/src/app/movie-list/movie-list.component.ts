import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../models/client';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit, OnDestroy{
  movies: Movie[] = [];
  moviesSubscription$?: Subscription;
  selectedMovie?: Movie;
  @ViewChild('dialog') dialog?: ElementRef<HTMLDialogElement>; // TODO: type

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.moviesSubscription$ = this.movieService.getMovies().subscribe({
      next: movies => this.movies = movies.sort((a,b)=> a.id-b.id),
      error: err => console.log(err)
    });
  }

  ngOnDestroy(): void {
    this.moviesSubscription$?.unsubscribe();
  }



  editMovie(movie:Movie) {
    this.router.navigate(['/movies', movie.id, "edit"]);
  }

  viewMovie(Movie: Movie) {
    this.router.navigate(['/movies', Movie.id]);
  }

  addMovie() {
    this.router.navigate(['/movies', "create"]);
  }
deleteMovie(movie: Movie) {
    this.selectedMovie = movie;
    this.dialog?.nativeElement.showModal();
  }
  confirmModal() {
    this.movieService.deleteMovie(this.selectedMovie!.id).subscribe({
      next: () => {
        this.movies = this.movies.filter(a => a.id !== this.selectedMovie!.id);
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


