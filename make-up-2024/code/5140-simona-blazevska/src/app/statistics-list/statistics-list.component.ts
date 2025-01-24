import { Component, OnInit } from '@angular/core';
import { IRecipe } from '../models/Recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-statistics-list',
  templateUrl: './statistics-list.component.html',
  styleUrl: './statistics-list.component.css',
})
export class StatisticsListComponent implements OnInit {
  recipes: IRecipe[] = [];
  ingredients: string[] = [];
  cuisines: string[] = [];
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });
    this.recipeService.getIngredients().subscribe((ingredient) => {
      this.ingredients = ingredient;
    });
    this.recipeService.getCuisines().subscribe((cuisine) => {
      this.cuisines = cuisine;
    });
  }
}
