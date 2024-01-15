import { Component } from '@angular/core';
import { Movie } from '../models/client';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {

  movie?: Movie;

  constructor(
    private route: ActivatedRoute, 
    private moviesService: MoviesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      //filter(id => isNumeric(id)),
      map(id => parseInt(id!, 10)),
      switchMap(id => this.moviesService.getMovie(id)),
    ).subscribe({
      next: movie => {
        this.movie = movie;
      },
      error: err => console.log(err)
    })
  }

  deleteMovie() {
    throw new Error('Method not implemented.');
  }

  editMovie() {
    this.router.navigate(['/movies', this.movie!.id, "edit"]);
  }

}
