import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-author-edit',
  imports: [RouterModule],
  templateUrl: './author-edit.component.html',
  styleUrl: './author-edit.component.css'
})
export class AuthorEditComponent {
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const authorId = params['id'];
      console.log(`Author ID: ${authorId}`);
    });
  }

}
