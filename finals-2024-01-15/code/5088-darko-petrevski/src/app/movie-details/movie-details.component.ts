import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '..//movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movieId!: number; // Add "!" to indicate that it will be initialized in the constructor
  movie: any;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.movieId = +idParam;
        this.loadMovieDetails();
      } else {
        console.error('Movie ID parameter is null.');
      }
    });
  }

  loadMovieDetails(): void {
    this.movieService.getMovieById(this.movieId).subscribe(
      (data) => {
        this.movie = data;
      },
      (error) => {
        console.error('Error loading movie details:', error);
      }
    );
  }

  getOscarsList(oscars: any): string[] {
    // Assuming oscars is an object with oscar types as keys
    return Object.keys(oscars || {}).map(oscarType => `${oscarType}: ${oscars[oscarType]}`);
  }
}
