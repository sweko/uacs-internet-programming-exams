import {Component, OnInit} from '@angular/core';
import {MovieService} from "../services/movie.service";

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.css'
})
export class GenresComponent implements OnInit{

  genres: string[] = []

  constructor(private service: MovieService) {
  }

  ngOnInit(): void {
    this.service.getGenres().subscribe(
      res => this.genres = res
    )
  }

}
