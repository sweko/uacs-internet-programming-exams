
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipeService.getRecipes()
      .subscribe(recipes => this.recipes = recipes);
  }

  viewRecipe(id: number): void {
    this.router.navigate(['/recipes', id]);
  }

  editRecipe(id: number): void {
    this.router.navigate(['/recipes', id, 'edit']);
  }

  deleteRecipe(id: number): void {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.deleteRecipe(id).subscribe(() => {
        // After deletion, remove the recipe from the local array
        this.recipes = this.recipes.filter(recipe => recipe.id !== id);
      });
    }
  }
}