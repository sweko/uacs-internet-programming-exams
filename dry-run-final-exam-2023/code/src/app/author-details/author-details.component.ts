import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { AuthorsService } from '../authors.service';
import { isNumeric } from '../common/utils';
import { Author } from '../models/client';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.css'
})
export class AuthorDetailsComponent implements OnInit {

  author?: Author;

  constructor(
    private route: ActivatedRoute, 
    private authorsService: AuthorsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => isNumeric(id)),
      map(id => parseInt(id!, 10)),
      switchMap(id => this.authorsService.getAuthor(id)),
    ).subscribe({
      next: author => {
        this.author = author;
      },
      error: err => console.log(err)
    })
  }

  deleteAuthor() {
    throw new Error('Method not implemented.');
  }

  editAuthor() {
    this.router.navigate(['/authors', this.author!.id, "edit"]);
  }

}
