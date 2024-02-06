import {Component, OnInit} from '@angular/core';
import {MovieService} from "../services/movie.service";
import {Observable} from "rxjs";
import {Movie} from "../models/movie";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit{

  movies: Movie[] = []
  constructor(private service: MovieService) {
  }

  ngOnInit(): void {
    this.service.getMovies().subscribe(
      res => this.movies = res
    )
  }
}
