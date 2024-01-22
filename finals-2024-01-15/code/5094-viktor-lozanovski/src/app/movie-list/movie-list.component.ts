// movie-list.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.http.get<any[]>('http://localhost:3000/movies')
      .subscribe(
        (data) => {
          this.movies = data;
        },
        (error) => {
          console.error('Error fetching movies:', error);
        }
      );
  }

  onDeleteMovie(movieId: number) {
    // Implement your delete logic here
  }
}
