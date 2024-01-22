import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../services/student.service';
import { movie } from '../addons/movie';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})

export class movieListComponent implements OnInit, OnDestroy {

  movies: movie[] = [];
  moviesSubscription$?: Subscription;
  selectedMovie?: movie;
  @ViewChild('dialog') dialog?: ElementRef<HTMLDialogElement>; // TODO: type
  Service: any;

  constructor(private StudentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.moviesSubscription$ = this.Service.getMovie().subscribe({
      next: (movie: any) => this.movies = movie,
      error: (err: any) => console.log(err)
    });
  }

  ngOnDestroy(): void {
    this.moviesSubscription$?.unsubscribe();
  }

  // deleteAuthor(author: movie) {
  //   this.selectedAuthor = author;
  //   this.dialog?.nativeElement.showModal();
  // }

  // editAuthor(author: movie) {
  //   this.router.navigate(['/authors', author.id, "edit"]);
  // }

  // viewAuthor(author: movie) {
  //   this.router.navigate(['/authors', author.id]);
  // }

  // addAuthor() {
  //   this.router.navigate(['/authors', "create"]);
  // }

  // confirmModal() {
  //   this.authorsService.deleteAuthor(this.selectedAuthor!.id).subscribe({
  //     next: () => {
  //       this.authors = this.authors.filter(a => a.id !== this.selectedAuthor!.id);
  //       this.selectedAuthor = undefined;
  //     },
  //     error: err => console.log(err)
  //   });
  //   this.closeModal();
  // }

  closeModal() {
    this.selectedMovie = undefined;
    this.dialog?.nativeElement.close();
  }
}