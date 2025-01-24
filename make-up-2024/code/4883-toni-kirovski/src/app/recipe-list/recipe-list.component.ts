import { Component, OnInit } from '@angular/core';
import { RecipeService, Recipe } from '../recipe.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipeService.getRecipes()
      .subscribe(recipes => {
        this.recipes = recipes;
      });
  }
  viewRecipe(id: number): void {
    this.router.navigate(['/recipes', id]);
  }

  editRecipe(id: number): void {
    this.router.navigate(['/recipes', id, 'edit']); 
  }

  deleteRecipe(id: number): void {
    
    console.log("Recipe with ID " + id + " deleted");
  }
}
  

