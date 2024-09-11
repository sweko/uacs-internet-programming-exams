import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models/Recipe';

const BASE_URL = 'http://localhost:2999/';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(BASE_URL + 'recipes');
  }

  getRecipe(recipeId: string): Observable<Recipe> {
    return this.http.get<Recipe>(BASE_URL + 'recipes/' + recipeId);
  }
  createRecipe(recipe: any): Observable<Recipe> {
    return this.http.post<Recipe>(BASE_URL + 'recipes', recipe);
  }

  editRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(BASE_URL + 'recipes/' + recipe.id, recipe);
  }

  deleteRecipe(recipeId: string) {
    return this.http.delete(BASE_URL + 'recipes/' + recipeId);
  }
}
