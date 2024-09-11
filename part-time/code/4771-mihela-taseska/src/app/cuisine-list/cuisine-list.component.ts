import { Component } from '@angular/core';
import { Recipe } from '../models/Recipe';
import { IngredientService } from '../services/ingredient.service';
import { RecipeService } from '../services/recipe.service';
import { CuisineService } from '../services/cuisine.service';

@Component({
  selector: 'app-cuisine-list',
  templateUrl: './cuisine-list.component.html',
  styleUrl: './cuisine-list.component.css',
})
export class CuisineListComponent {
  cuisines!: string[];
  recipes: Recipe[] = [];
  displayCuisines: any = [];

  cuisineWithRecipes = {
    name: '',
    recipes: [] as any[],
  };

  constructor(
    private cuisineService: CuisineService,
    private recipeService: RecipeService
  ) {}
  ngOnInit(): void {
    this.getIngredients();
  }

  getIngredients() {
    this.cuisineService.getAllCuisines().subscribe(
      (res) => {
        this.cuisines = res;
        this.recipeService.getRecipes().subscribe((res: Recipe[]) => {
          this.recipes = res;

          this.cuisines.forEach((cuisine) => {
            this.cuisineWithRecipes.recipes = [];

            this.recipes.forEach((recipee: any) => {
              if (recipee.cuisine == cuisine) {
                this.cuisineWithRecipes.recipes.push({ ...recipee });
              }
            });

            this.cuisineWithRecipes.name = cuisine;
            this.displayCuisines.push({ ...this.cuisineWithRecipes });
          });
        });
      },
      (err) => console.log(err)
    );
  }
}
