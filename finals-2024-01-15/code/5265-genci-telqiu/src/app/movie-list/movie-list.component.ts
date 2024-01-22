import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  filteredMovies: any[] = [];
  genres: string[] = [];
  titleFilter: string = '';
  yearFilter: number | null = null;
  selectedGenre: string | null = null;
  ratingFilter: number | null = null;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data) => {
      this.movies = data;
      this.filteredMovies = this.movies;
      this.extractGenres();
    });
  }

  private extractGenres(): void {
    const allGenres: string[] = [];
    this.movies.forEach((movie) => {
      allGenres.push(...movie.genre);
    });
    this.genres = Array.from(new Set(allGenres));
  }

  sortMoviesBy(property: string): void {
    this.filteredMovies.sort((a, b) => (a[property] > b[property] ? 1 : -1));
  }

  filterMovies(): void {
    this.filteredMovies = this.movies.filter((movie) => {
      const titleMatch = movie.title.toLowerCase().includes(this.titleFilter.toLowerCase());
      const yearMatch = this.yearFilter ? movie.year === this.yearFilter : true;
      const genreMatch = this.selectedGenre ? movie.genre.includes(this.selectedGenre) : true;
      const ratingMatch = this.ratingFilter ? movie.rating >= this.ratingFilter : true;

      return titleMatch && yearMatch && genreMatch && ratingMatch;
    });
  }

  resetFilters(): void {
    this.titleFilter = '';
    this.yearFilter = null;
    this.selectedGenre = null;
    this.ratingFilter = null;
    this.filteredMovies = this.movies;
  }

  viewMovieDetails(id: number): void {
  }

  editMovie(id: number): void {
  }

  deleteMovie(id: number): void {

  }


}
