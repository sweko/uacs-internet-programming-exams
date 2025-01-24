import { Component, OnInit } from '@angular/core';
import { IRecipe } from '../models/Recipe';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-details-page',
  templateUrl: './recipe-details-page.component.html',
  styleUrl: './recipe-details-page.component.css',
})
export class RecipeDetailsPageComponent implements OnInit {
  recipes: IRecipe = {} as IRecipe;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const recipeId = this.route.snapshot.params['id'];
    this.recipeService.getOneRecipes(recipeId).subscribe((recipe) => {
      console.log(recipe);
      this.recipes = recipe;
    });
  }

  displayTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      if (remainingMinutes > 0) {
        return `${hours} hour ${remainingMinutes} minutes`;
      } else {
        return `${hours} hour`;
      }
    } else {
      return `${minutes} minutes`;
    }
  }
}
