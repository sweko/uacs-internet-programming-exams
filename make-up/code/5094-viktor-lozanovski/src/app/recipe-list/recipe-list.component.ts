import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipies.services';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipeService.getRecipes().subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
      console.log(recipes); 
    });
  } 
  displayTime(time: number): string {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    if (hours === 0) {
      return '${minutes} minutes';
    } else {
      return '${hours} hours ${minutes} minutes';
    }
  }
}
