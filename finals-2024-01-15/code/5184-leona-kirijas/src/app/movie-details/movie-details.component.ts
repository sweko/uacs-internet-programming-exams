import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { MoviesService } from '../movies.service';
import { isNumeric } from '../common/utils';
import { Movie } from '../models/client';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie?: Movie;

  constructor(
    private route: ActivatedRoute, 
    private moviesService: MoviesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => isNumeric(id)),
      map(id => parseInt(id!, 10)),
      switchMap(id => this.moviesService.getMovie(id)),
    ).subscribe({
      next: movie => {
        this.movie = movie;
      },
      error: err => console.log(err)
    });
  }

  deleteMovie() {
    if(this.movie && confirm(`Are you sure you want to delete ${this.movie.title}?`)) {
      this.moviesService.deleteMovie(this.movie.id).subscribe({
        next: () => this.router.navigate(['/movies']),
        error: err => console.log(err),
      });
    }
  }

  editMovie() {
    this.router.navigate(['/movies', this.movie!.id, "edit"]);
  }
}