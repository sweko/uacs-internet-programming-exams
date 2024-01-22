import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movies.service';
import { Movie } from '../models/Movie';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {
  movie?: Movie;

  constructor(private route: ActivatedRoute, 
    private movieService: MovieService,
    private router: Router,){

  }
  
  
  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => this.isNumeric(id)),
      map(id => parseInt(id!, 10)),
      switchMap(id => this.movieService.getMovie(id)),
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
    this.router.navigate(['/authors', this.movie!.id, "edit"]);
  }

  isNumeric = (value: string | null): boolean => {
    if (value === null) {
        return false;
    }
    const numValue = parseInt(value);
    if (isNaN(numValue)) {
        return false;
    }
    if (numValue <= 0) {
        return false;
    }
    return true;
}

}
