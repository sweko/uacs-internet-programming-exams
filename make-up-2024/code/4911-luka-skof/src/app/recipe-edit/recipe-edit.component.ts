import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeDataService } from '../services/recipe-data.service';
import { Recipes } from '../models/recipe';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipes | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeDataService: RecipeDataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const recipeId = Number(params.get('id'));
      this.recipeDataService.getRecipeId(recipeId).subscribe((recipe) => {
        this.recipe = recipe;
      });
    });
  }

  saveChanges(): void {
    if (this.recipe) {
      this.recipeDataService.updateRecipes(this.recipe).subscribe(() => {
        this.router.navigate(['/recipe', this.recipe?.id]);
      });
    }
  }
}