import { Component, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipieServiceService } from '../recipie-service.service';
import { Recipie } from '../models/client';
import { Observable, filter, map, switchMap } from 'rxjs';
import { isNumeric } from '../common/utils';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recipie-edit',
  templateUrl: './recipie-edit.component.html',
  styleUrls: ['./recipie-edit.component.css']
})
export class RecipieEditComponent {
  recipie?: Recipie;
  editForm: FormGroup = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private recipiesService: RecipieServiceService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => isNumeric(id)),
      map(id => parseInt(id!, 10)),
      switchMap(id => this.recipiesService.getRecipie(id)),
    ).subscribe({
      next: recipie => {
        this.recipie = recipie;
        this.prepareForm();
      },
      error: err => console.log(err)
    });
  }

  prepareForm() {
    this.editForm = this.fb.group({
      title: [this.recipie?.title],
      cuisine: [this.recipie?.cuisine],
      description: [this.recipie?.description],
      instructions: [this.recipie?.instructions],
      time: [this.recipie?.time],
      servings: [this.recipie?.servings],
      ingredients: [this.recipie?.ingredients],
    });
  }

  updateRecipie() {
    const updatedRecipie = {
      ...this.recipie,
      ...this.editForm.value,
    };
    this.recipiesService.updateRecipie(updatedRecipie).subscribe({
      next: () => this.router.navigate(['/recipes']),
      error: err => console.log(err),
    });
  }
}
