import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, Subscription, switchMap } from 'rxjs';
import { AuthorsService } from '../authors.service';
import { Author } from '../models/author';

@Component({
  selector: 'app-author-details',
  imports: [RouterModule],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.css'
})
export class AuthorDetailsComponent {

  author: Author | undefined;
  subscription?: Subscription;

  constructor(private route: ActivatedRoute, private authorsService: AuthorsService) { }

  ngOnInit() {
    this.subscription = this.route.params.pipe(
      map(params => Number(params['id'])),
      switchMap(authorId => this.authorsService.getAuthorById(authorId))
    ).subscribe(author => {
      this.author = author;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  
}
