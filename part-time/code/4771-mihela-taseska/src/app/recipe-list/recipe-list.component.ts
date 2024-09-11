import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/Recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  imaPodatoci: boolean = false;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.getAllRecipes();
  }

  getAllRecipes() {
    this.recipeService.getRecipes().subscribe(
      (res) => {
        this.recipes = res;
        this.imaPodatoci = true;
      },
      (err) => {
        this.imaPodatoci = false;
        console.log('Error pri zemanje podatoci', err);
      }
    );
  }

  deleteRecipe(id: any) {
    if (!confirm('The recipe will be deleted. Are you sure?')) {
      window.alert('Recipe deleted successfully');

      return;
    }
    this.recipeService.deleteRecipe(id).subscribe((res) => {
      this.getAllRecipes();
    });
  }
}
