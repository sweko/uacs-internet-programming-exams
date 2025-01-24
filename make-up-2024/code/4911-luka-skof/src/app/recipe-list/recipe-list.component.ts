import { Component, OnInit } from '@angular/core';
import { Recipes } from '../models/recipe';
import { RecipeDataService } from '../services/recipe-data.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipes[] = [];

  constructor(private recipeDataService: RecipeDataService) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  private loadRecipes(): void {
    this.recipeDataService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

  deleteRecipe(id: number): void {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeDataService.deleteRecipes(id).subscribe(() => {
        this.loadRecipes();
      });
    }
  }
  countKeys(obj: object): number {
    return Object.keys(obj).length;
  }

}