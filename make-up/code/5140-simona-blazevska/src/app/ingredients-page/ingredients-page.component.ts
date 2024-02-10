import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-ingredients-page',
  templateUrl: './ingredients-page.component.html',
  styleUrl: './ingredients-page.component.css',
})
export class IngredientsPageComponent implements OnInit {
  ingredients: any = [];
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getIngredients().subscribe((ingredient) => {
      this.ingredients = ingredient;
    });
  }
}
