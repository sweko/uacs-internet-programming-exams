import { Component } from '@angular/core';
import { RecipeDataService } from '../services/recipe-data.service';
import { Recipes } from '../models/recipe';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent {
    newRecipe: Recipes =  {
    id: 0,
    title: '',
    cuisine: '',
    description: '',
    ingredients: [{name: '', quantity: 0, unit: ''}],
    instructions: '',
    time: 0,
    servings: 0
  };

  constructor(private recipeDataService: RecipeDataService) {}

  createRecipe(): void {
    this.recipeDataService.addRecipes(this.newRecipe).subscribe(createdRecipe => {
    });
  }
}