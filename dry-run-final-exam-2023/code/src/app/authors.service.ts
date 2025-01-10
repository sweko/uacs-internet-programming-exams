import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorResponse } from './models/server';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { toAuthor, toAuthorResponse } from './models/mapping';
import { Author } from './models/client';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {


  private authorSubject$ = new BehaviorSubject<Author[]>([]);

  constructor(private http: HttpClient) { }

  getAuthors() {
    return this.http.get<AuthorResponse[]>(`${BASE_URL}/authors`).pipe(
      map(authorResponses => authorResponses.map(authorResponse => toAuthor(authorResponse))),
      tap(authors => this.authorSubject$.next(authors)),
    );
  }

  getAuthor(id: number): Observable<Author> {
    return this.http.get<AuthorResponse>(`${BASE_URL}/authors/${id}`).pipe(
      map(authorResponse => toAuthor(authorResponse)),
    );
  }

  getNationalities() {
    return this.http.get<string[]>(`${BASE_URL}/nationalities`);
  }

  updateAuthor(updatedAuthor: Author) {
    const authorResponse = toAuthorResponse(updatedAuthor);
    return this.http.put<AuthorResponse>(`${BASE_URL}/authors/${updatedAuthor.id}`, authorResponse).pipe(
      map(authorResponse => toAuthor(authorResponse)),
      tap(author => {
        const authors = this.authorSubject$.getValue();
        const index = authors.findIndex(a => a.id === author.id);
        authors[index] = author;
        this.authorSubject$.next(authors);
      }),
    );
  }

  deleteAuthor(id: number) {
    return this.http.delete(`${BASE_URL}/authors/${id}`).pipe(
      tap(() => {
        const authors = this.authorSubject$.getValue();
        const index = authors.findIndex(a => a.id === id);
        authors.splice(index, 1);
        this.authorSubject$.next(authors);
      }),
    );
  }
}
