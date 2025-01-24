import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipes } from '../models/recipe';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RecipeDataService {
  private apiUrl = 'db/recipe-data.json';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  getRecipes(): Observable<Recipes[]> {
    return this.http.get<Recipes[]>(`${this.apiUrl}/recipe`);
  }

  deleteRecipes(id: number): Observable<void> {
    const deleteUrl = `${this.apiUrl}recipes/${id}`;
    return this.http.delete<void>(deleteUrl);
  }
  getRecipeId(id: number): Observable<Recipes> {
    return this.http.get<Recipes>(`${this.apiUrl}/recipes/${id}`);
  }
  updateRecipes(recipe: Recipes): Observable<void> {
    const updateUrl = `${this.apiUrl}/recipes/${recipe.id}`;
    return this.http.put<void>(updateUrl, recipe);
  }
  addRecipes(newRecipe: Recipes): Observable<Recipes> {
    return this.http.post<Recipes>(`${this.apiUrl}/recipes`, newRecipe);
  }
}