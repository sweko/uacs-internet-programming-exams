import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../services/ingredient.service';
import { RecipeService } from '../services/recipe.service';
import { CuisineService } from '../services/cuisine.service';
import { Recipe } from '../models/Recipe';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent implements OnInit {
  recipes: Recipe[] = [];
  cuisines: string[] = [];
  ingredients: string[] = [];
  recipesPerCuisine: any = { name: '', recipes: [] as any[] };

  ingredientsWithRecipes = {
    id: 0,
    name: '',
    recipes: [] as any[],
  };

  cuisinesWithRecipes = {
    id: 0,
    name: '',
    recipes: [] as any[],
  };

  displayIngredients: any = [];
  displayCuisines: any = [];

  constructor(
    private ingredientService: IngredientService,
    private recipeService: RecipeService,
    private cuisineService: CuisineService
  ) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((res) => {
      this.recipes = res;

      this.cuisineService.getAllCuisines().subscribe((cuisine: any) => {
        this.cuisines = cuisine;
        this.cuisines.forEach((cuisine) => {
          this.cuisinesWithRecipes.recipes = [];

          this.recipes.forEach((recipee: any) => {
            if (recipee.cuisine == cuisine) {
              this.cuisinesWithRecipes.recipes.push({ ...recipee });
            }
          });

          this.cuisinesWithRecipes.name = cuisine;
          this.displayCuisines.push({ ...this.cuisinesWithRecipes });
        });
      });

      this.ingredientService.getIngredients().subscribe((ingredients: any) => {
        this.ingredients = ingredients;
        this.ingredients.forEach((ingredient) => {
          this.ingredientsWithRecipes.recipes = [];

          this.recipes.forEach((recipee: any) => {
            recipee.ingredients?.forEach((recipeIng: any) => {
              if (recipeIng.name == ingredient) {
                this.ingredientsWithRecipes.recipes.push({ ...recipee });
              }
            });
          });

          this.ingredientsWithRecipes.name = ingredient;
          this.displayIngredients.push({ ...this.ingredientsWithRecipes });
        });
      });
    });
  }
}
