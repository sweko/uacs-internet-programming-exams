import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipeService.getRecipeById(id)
      .subscribe(recipe => this.recipe = recipe);
  }

  onSubmit(): void {
    if (this.recipe) {
      this.recipeService.updateRecipe(this.recipe.id, this.recipe)
        .subscribe(() => {
          // Navigate back to recipe details page after successful update
          this.router.navigate(['/recipes', this.recipe!.id]);
        });
    }
  }
}