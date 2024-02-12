import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Recipe, Ingredients} from '../models/client'; 
import { toRecipe, toRecipeResponse } from '../models/mapping'; 

const BASE_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${BASE_URL}/recipes`);
  }

  getRecipe(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${BASE_URL}/recipes/${id}`);
  }

  createRecipe(newRecipe: Recipe): Observable<Recipe> {
    const recipeResponse = toRecipeResponse(newRecipe); 
    return this.http.post<Recipe>(`${BASE_URL}/recipes`, recipeResponse); 
  }

  updateRecipe(updatedRecipe: Recipe): Observable<Recipe> {
    const recipeResponse = toRecipeResponse(updatedRecipe); 
    return this.http.put<Recipe>(`${BASE_URL}/recipes/${updatedRecipe.id}`, recipeResponse);
  }

  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/recipes/${id}`);
  }
  getIngredient(): Observable<Ingredients[]> {
    return this.http.get<Ingredients[]>(`${BASE_URL}/Ingredients`);
  }

  getIngredientByName(name: string): Observable<Ingredients> {
    return this.http.get<Ingredients>(`${BASE_URL}/Ingredients?name=${name}`);
  }
}