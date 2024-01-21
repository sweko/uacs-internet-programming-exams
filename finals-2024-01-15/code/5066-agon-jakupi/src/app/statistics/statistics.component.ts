import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  totalMovies: number = 0;
  totalActors: number = 0;
  totalGenres: number = 0;
  totalOscars: number = 0;
  oscarsPerType: any[] = [];
  oscarsPerGenre: any[] = [];
  moviesPerDecade: any[] = [];
  moviesPerGenre: any[] = [];
  actorsWithoutDetails: number = 0;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.loadStatistics();
  }

  loadStatistics() {
    this.movieService.getMovies().subscribe((movies) => {
   
      this.totalMovies = movies.length;
      this.totalActors = this.calculateTotalActors(movies);
      this.totalGenres = this.calculateTotalGenres(movies);
      this.totalOscars = this.calculateTotalOscars(movies);
      this.oscarsPerType = this.calculateOscarsPerType(movies);
      this.oscarsPerGenre = this.calculateOscarsPerGenre(movies);
      this.moviesPerDecade = this.calculateMoviesPerDecade(movies);
      this.moviesPerGenre = this.calculateMoviesPerGenre(movies);
      this.actorsWithoutDetails = this.calculateActorsWithoutDetails(movies);
    });
  }

  
  calculateTotalActors(movies: any[]): number {
    
    return 0; 
  }

  calculateTotalGenres(movies: any[]): number {
    
    return 0; 
  }

  calculateTotalOscars(movies: any[]): number {
    
    return 0; 
  }

  calculateOscarsPerType(movies: any[]): any[] {
 
    return []; 
  }

  calculateOscarsPerGenre(movies: any[]): any[] {
   
    return []; 
  }

  calculateMoviesPerDecade(movies: any[]): any[] {
   
    return []; 
  }

  calculateMoviesPerGenre(movies: any[]): any[] {
   
    return [];
  }

  calculateActorsWithoutDetails(movies: any[]): number {
  
    return 0; 
  }
}
