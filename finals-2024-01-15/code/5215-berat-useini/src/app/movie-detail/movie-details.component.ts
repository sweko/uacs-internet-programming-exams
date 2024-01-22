import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from "../services/movieServices/movie.service";
import { Movie } from "../models/movie.model";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie | undefined;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  editMovie(id: number): void {
    this.router.navigate(['/movies', id, 'edit']);
  }

  deleteMovie(id: number): void {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.movieService.deleteMovie(id).subscribe(
        () => this.router.navigate(['/movies']),
        error => console.error('Error deleting movie:', error)
      );
    }
  }

  ngOnInit(): void {
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieById(id).subscribe(
      movie => this.movie = movie,
      error => console.error('Error fetching movie:', error)
    );
  }

  protected readonly Object = Object;
}
