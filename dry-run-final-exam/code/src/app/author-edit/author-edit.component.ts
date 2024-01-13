import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorsService } from '../authors.service';
import { Author } from '../models/client';
import { Observable, filter, map, switchMap } from 'rxjs';
import { isNumeric } from '../common/utils';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrl: './author-edit.component.css'
})
export class AuthorEditComponent {
  author?: Author;
  editForm: FormGroup = new FormGroup({});

  nationalities$: Observable<string[]> = this.authorsService.getNationalities();

  constructor(
    private route: ActivatedRoute,
    private authorsService: AuthorsService,
    private router: Router,
    private fb: FormBuilder,
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
        this.prepareForm();
      },
      error: err => console.log(err)
    });
  }

  prepareForm() {
    this.editForm = this.fb.group({
      name: [this.author?.name],
      birthDate: [this.author?.birthDate],
      deathDate: [this.author?.deathDate],
      nationality: [this.author?.nationality],
    });
  }

  updateAuthor() {
    const updateAuthor = {
      ...this.author,
      ...this.editForm.value,
    };
    this.authorsService.updateAuthor(updateAuthor).subscribe({
      next: () => this.router.navigate(['/authors']),
      error: err => console.log(err),
    });
  }
}
