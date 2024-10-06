import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../models/Ingredient';
import { IngredientService } from '../services/ingredient.service';
import { Recipe } from '../models/Recipe';
import { RecipeService } from './../services/recipe.service';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.css',
})
export class IngredientListComponent implements OnInit {
  ingredients!: string[];
  recipes: Recipe[] = [];
  displayIngredients: any = [];

  ingredientsWithRecipes = {
    id: 0,
    name: '',
    recipes: [] as any[],
  };

  constructor(
    private ingredientService: IngredientService,
    private recipeService: RecipeService
  ) {}
  ngOnInit(): void {
    this.getIngredients();
  }

  getIngredients() {
    this.ingredientService.getIngredients().subscribe(
      (res) => {
        this.ingredients = res;
        this.recipeService.getRecipes().subscribe((res: Recipe[]) => {
          this.recipes = res;

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
        // console.log('Ing: ', this.displayIngredients);
        this.ingredientService.setIngredientsWithRecipes(
          this.displayIngredients
        );
      },
      (err) => console.log(err)
    );
  }
}
