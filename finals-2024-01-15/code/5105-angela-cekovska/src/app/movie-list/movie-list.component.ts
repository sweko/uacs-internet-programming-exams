import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MoviesService } from '../movies.service';
import { Movie } from '../modules/client';
import { Router } from '@angular/router';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies: Movie[] | undefined;
  private subscription$?: Subscription;
  

  constructor(private moviesService: MoviesService, private router: Router) { }

  ngOnInit() {
    this.subscription$ = this.moviesService.getMovies().subscribe(data => {
      this.movies = data;
    });
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  viewMovie(id: number) {
    this.router.navigate(['/movies', id]);
  }

  editMovie(id: number) {
    this.router.navigate(['/movies', id, "edit"]);
  }

  deleteMovie(id: number) {
   throw new Error('Method not implemented.');
  }

  AddMovie(){

    this.router.navigate(['/movies', "create"]);
  }

}


