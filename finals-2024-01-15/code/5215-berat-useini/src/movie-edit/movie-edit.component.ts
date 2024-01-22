import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MovieService } from "../app/services/movieServices/movie.service";
import { Movie } from "../app/models/movie.model";

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  movie: Movie | undefined
  genres: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieById(id).subscribe(
      movie => this.movie = movie,
      error => console.error('Error fetching movie:', error)
    );

    this.movieService.getGenres().subscribe(
      genresData => this.genres = genresData,
      error => console.error('Error fetching genres:', error)
    );
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.movieService.updateMovie(this?.movie?.id, form.value).subscribe(
        () => this.router.navigate(['/movies', this?.movie?.id]),
        error => console.error('Error updating movie:', error)
      );
    }
  }
}
