import { Component, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../models/client';
import { Observable, filter, map, switchMap } from 'rxjs';
import { isNumeric } from '../common/utils';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent {
  recipe?: Recipe;
  editForm: FormGroup = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => isNumeric(id)),
      map(id => parseInt(id!, 10)),
      switchMap(id => this.recipesService.getRecipe(id)),
    ).subscribe({
      next: recipe => {
        this.recipe = recipe;
        this.prepareForm();
      },
      error: err => console.log(err)
    });
  }

  prepareForm() {
    this.editForm = this.fb.group({
      title: [this.recipe?.title],
      cusine: [this.recipe?.cusine],
      description: [this.recipe?.description],
      instructions: [this.recipe?.instructions],
      time: [this.recipe?.time],
      servings: [this.recipe?.servings]
    });
  }

  updateRecie() {
    const updatedRecipe = {
      ...this.recipe,
      ...this.editForm.value,
    };
    this.recipesService.updateRecipe(updatedRecipe).subscribe({
      next: () => this.router.navigate(['/recipes']),
      error: err => console.log(err),
    });
  }
}