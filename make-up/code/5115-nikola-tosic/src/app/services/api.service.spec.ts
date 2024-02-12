import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:3000';

  constructor(private http: HttpClient) { }

  // Get all recipes
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipes`);
  }

  // Get a single recipe by ID
  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/recipes/${id}`);
  }

  // Create a new recipe
  createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.baseUrl}/recipes`, recipe);
  }

  // Update an existing recipe
  updateRecipe(id: number, recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.baseUrl}/recipes/${id}`, recipe);
  }

  // Delete a recipe
  deleteRecipe(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/recipes/${id}`);
  }

  // Get all ingredients
  getIngredients(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/ingredients`);
  }

  // Get all cuisines
  getCuisines(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/cuisines`);
  }
}
