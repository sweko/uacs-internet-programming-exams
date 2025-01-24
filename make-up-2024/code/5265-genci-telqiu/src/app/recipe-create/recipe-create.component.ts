import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../app/api-service';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent {
  newRecipe: Recipe = {
    id: null, 
    title: '',
    cuisine: '',
    description: '',
    ingredients: [],
    instructions: '',
    time: 0,
    servings: 0
  };

  constructor(private router: Router, private apiService: ApiService) {}

  createRecipe(): void {
    this.apiService.createRecipe(this.newRecipe).subscribe(createdRecipe => {
      
      this.router.navigate(['/recipes', createdRecipe.id]);
    });
  }
}
