import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../services/ingredient.service';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/Recipe';

@Component({
  selector: 'app-ingredient-details',
  templateUrl: './ingredient-details.component.html',
  styleUrl: './ingredient-details.component.css',
})
export class IngredientDetailsComponent implements OnInit {
  name: string = '';
  ingredient: any = { name: '', recipes: [] };
  ingredientQuantity = 0;
  unitOfIngredient = '';

  constructor(
    private route: ActivatedRoute,
    private ingredientService: IngredientService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.name = param['id'];

      this.recipeService.getRecipes().subscribe((res: Recipe[]) => {
        let tmp = res;

        tmp.forEach((recipee: any) => {
          recipee.ingredients?.forEach((recipeIng: any) => {
            if (recipeIng.name == this.name) {
              this.ingredient.recipes.push({ ...recipee });
              this.ingredientQuantity++;
              this.unitOfIngredient = recipeIng.unit;
            }
          });
        });

        this.ingredient.name = this.name;
      });
      console.log('Ingredient: ', this.ingredient);
    });
  }
}
