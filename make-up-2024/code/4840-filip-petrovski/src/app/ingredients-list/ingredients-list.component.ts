import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.css']
})
export class IngredientsListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getIngredients().subscribe(ingredients => {
      this.ingredients = ingredients;
    });
  }
}