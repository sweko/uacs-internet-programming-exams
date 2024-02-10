import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe!: Recipe; =

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const recipeId: number = +this.route.snapshot.paramMap.get('id')!;=
    this.apiService.getRecipeById(recipeId).subscribe(recipe => {
      this.recipe = recipe;
    });
  }

  updateRecipe(): void {
    this.apiService.updateRecipe(this.recipe).subscribe(updatedRecipe => {
     =
      this.router.navigate(['/recipes', updatedRecipe.id]);
    });
  }
}
