import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Movie, Cast, Actor } from '../models/client';

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
  oscarsPerType: { type: string, count: number }[] = [];
  oscarsPerGenre: { genre: string, count: number }[] = [];
  moviesPerDecade: { decade: string, count: number }[] = [];
  moviesPerGenre: { genre: string, count: number }[] = [];
  actorsWithoutDetails: number = 0;
  moviesWithoutDetails: number = 0;

  constructor(private moviesService: MoviesService) { }
  

  // with lots of googlin I figured it out and my conclusion is that I dont like statistics 
  ngOnInit(): void {
    this.moviesService.getAllMovies().subscribe(movies => {
      this.totalMovies = movies.length;
      this.moviesService.getAllActors().subscribe(actors => {
      this.totalActors = actors.length;});
      this.totalGenres = [...new Set(movies.flatMap(movie => movie.genre))].length;
      this.totalOscars = movies.reduce((total, movie) => total + Object.keys(movie.oscars).length, 0);
      this.moviesPerGenre = this.getMoviesPerGenre(movies);
  
    });

   

    this.moviesService.getAllMovies().subscribe(movies => {
      const oscars = movies.flatMap(movie => Object.keys(movie.oscars));
      this.totalOscars = oscars.length;
      this.oscarsPerType = this.getOscarsPerType(oscars);
      this.oscarsPerGenre = this.getOscarsPerGenre(movies);
    });
  }

  private getMoviesPerGenre(movies: Movie[]): { genre: string, count: number }[] {
    const moviesPerGenre = new Map<string, number>();
    movies.forEach(movie => {
      movie.genre.forEach(genre => {
        if (moviesPerGenre.has(genre)) {
          moviesPerGenre.set(genre, moviesPerGenre.get(genre)! + 1);
        } else {
          moviesPerGenre.set(genre, 1);
        }
      });
    });
    return Array.from(moviesPerGenre.entries()).map(([genre, count]) => ({ genre, count }));
  }


  private getOscarsPerType(oscars: string[]): { type: string, count: number }[] {
    const oscarsPerType = new Map<string, number>();
    oscars.forEach(oscar => {
      const type = oscar.split(' ')[0];
      if (oscarsPerType.has(type)) {
        oscarsPerType.set(type, oscarsPerType.get(type)! + 1);
      } else {
        oscarsPerType.set(type, 1);
      }
    });
    return Array.from(oscarsPerType.entries()).map(([type, count]) => ({ type, count }));
  }

  private getOscarsPerGenre(movies: Movie[]): { genre: string, count: number }[] {
    const oscarsPerGenre = new Map<string, number>();
    movies.forEach(movie => {
      movie.genre.forEach(genre => {
        const oscars = Object.keys(movie.oscars).filter(oscar => oscar.startsWith(genre));
        if (oscarsPerGenre.has(genre)) {
          oscarsPerGenre.set(genre, oscarsPerGenre.get(genre)! + oscars.length);
        } else {
          oscarsPerGenre.set(genre, oscars.length);
        }
      });
    });
    return Array.from(oscarsPerGenre.entries()).map(([genre, count]) => ({ genre, count }));
  }
}