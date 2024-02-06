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

  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/recipes/${id}`);
  }

  deleteRecipe(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/recipes/${id}`);
  }

  getCuisines(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/cuisines`);
  }

  createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.baseUrl}/recipes`, recipe);
  }
  
  getIngredients(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/ingredients`);
  }
  
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipes`);
  }
}
