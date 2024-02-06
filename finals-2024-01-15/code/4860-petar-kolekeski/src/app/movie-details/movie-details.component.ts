import {Component, OnInit} from '@angular/core';
import {MovieService} from "../services/movie.service";
import {Movie} from "../models/movie";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit{

  movie: Movie | undefined;

  constructor(private service: MovieService, private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id")!!
    this.service.getMovie(id).subscribe(
      res => this.movie = res
    )
  }


}
