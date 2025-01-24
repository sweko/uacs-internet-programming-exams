import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'https://localhost:3000/recipes';

  constructor(private http: HttpClient) { }

  // Method to fetch all recipes
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl);
  }

  getRecipesById(id: number): Observable<Recipe>
  {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Recipe>(url);
  } 

  createRecipe(recipe: Recipe): Observable<Recipe>
  {
    return this.http.post<Recipe>(this.apiUrl, recipe);
  }

  updateRecipe(recipe: Recipe): Observable<Recipe> {
    const url = `${this.apiUrl}/${recipe.id}`;
    return this.http.put<Recipe>(url, recipe);
  }

  deleteRecipe(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}