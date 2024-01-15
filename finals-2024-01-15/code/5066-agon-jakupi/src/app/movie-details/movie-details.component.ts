import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movieId: number = 0;
  movie: any;
  movies: any[] = []; 


  showAddCastButton: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit() {
    

    this.route.params.subscribe(params => {
      this.movieId = +params['id'] || 0; 
      this.loadMovieDetails();
     
      this.movieService.getMovieById(this.movieId).subscribe(
        (data) => {
          this.movie = data;
          console.log(this.movie);
        },
        (error) => {
          console.error('Error fetching movie details', error);
        }
      );
    });
  }

  loadMovieDetails() {
  
    this.movieService.getMovieById(this.movieId).subscribe(
      (data) => {
        this.movie = data;
      },
      (error) => {
        console.error('Error fetching movie details', error);
      }
    );
  }

  
  editMovie() {
   
    this.router.navigate(['/movies', this.movieId, 'edit']);
  }

  deleteMovie(id: number) {
    const confirmDelete = window.confirm('Are you sure you want to delete this movie?');

    if (confirmDelete) {
      this.movieService.deleteMovie(id).subscribe(
        (data) => {
          console.log(`Movie with ID ${id} deleted successfully`, data);
          
          this.refreshMovieList();
        },
        (error) => {
          console.error(`Error deleting movie with ID ${id}`, error);
        }
      );
    }
  }

  refreshMovieList() {
    this.movieService.getMovies().subscribe(
      (data) => {
        this.movies = data;
      },
      (error) => {
        console.error('Error fetching movies', error);
      }
    );
  }

  addCast(movieId: number) {
    
    console.log(`Add cast to movie with ID: ${movieId}`);
  }

  
  getOscars(oscars: { [key: string]: string }): string {
    if (!oscars) return '';

    
    return Object.entries(oscars).map(([type, recipient]) => `${type}: ${recipient}`).join(', ');
  }
}
