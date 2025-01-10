import { Component } from '@angular/core';
import { AuthorsService } from '../authors.service';
import { Author } from '../models/author';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-author-list',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.css'
})
export class AuthorListComponent {

  authors: Author[] = [];
  displayAuthors: Author[] = [];

  search: string = "";

  constructor(private authorsService: AuthorsService) { }

  ngOnInit() {
    this.authorsService.getAuthors().subscribe(authors => {
      this.authors = authors;
      this.displayAuthors = authors;
    });
  }

  filterAuthors() {
    const searchTerm = this.search.toLowerCase();
    this.displayAuthors = this.authors.filter(author => author.name.toLowerCase().includes(searchTerm));
  }

  deleteAuthor(authorId:number) {
    // todo
  }

}
