import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthorsService } from '../authors.service';
import { Author } from '../models/client';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.css'
})
export class AuthorListComponent implements OnInit, OnDestroy {

  authors: Author[] = [];
  authorsSubscription$?: Subscription;
  selectedAuthor?: Author;
  @ViewChild('dialog') dialog?: ElementRef<HTMLDialogElement>; // TODO: type

  constructor(private authorsService: AuthorsService, private router: Router) { }

  ngOnInit(): void {
    this.authorsSubscription$ = this.authorsService.getAuthors().subscribe({
      next: authors => this.authors = authors,
      error: err => console.log(err)
    });
  }

  ngOnDestroy(): void {
    this.authorsSubscription$?.unsubscribe();
  }

  isAlive(author: Author) {
    return author.deathDate === undefined;
  }

  deleteAuthor(author: Author) {
    this.selectedAuthor = author;
    this.dialog?.nativeElement.showModal();
  }

  editAuthor(author: Author) {
    this.router.navigate(['/authors', author.id, "edit"]);
  }

  viewAuthor(author: Author) {
    this.router.navigate(['/authors', author.id]);
  }

  addAuthor() {
    this.router.navigate(['/authors', "create"]);
  }

  confirmModal() {
    this.authorsService.deleteAuthor(this.selectedAuthor!.id).subscribe({
      next: () => {
        this.authors = this.authors.filter(a => a.id !== this.selectedAuthor!.id);
        this.selectedAuthor = undefined;
      },
      error: err => console.log(err)
    });
    this.closeModal();
  }

  closeModal() {
    this.selectedAuthor = undefined;
    this.dialog?.nativeElement.close();
  }
}
