import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { IRecipe } from '../models/Recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  recipes: IRecipe[] = [];
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadRecipes();
  }
  loadRecipes(): void {
    this.recipeService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
  deleteRecipe(id: number): void {
    console.log('akjcsdkjn');
    this.recipeService.deleteRecipe(id).subscribe(() => {
      // Filter out the deleted recipe from the recipes array
      this.recipes = this.recipes.filter((recipe) => recipe.id !== id);
    });
  }
}
