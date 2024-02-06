import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { IRecipe } from '../models/Recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiUrl = 'http://localhost:3000';
  // private allRecipes = new BehaviorSubject<IRecipe[]>([]);

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(`${this.apiUrl}/recipes`);
  }

  getOneRecipes(id: number): Observable<IRecipe> {
    return this.http.get<IRecipe>(`${this.apiUrl}/recipes/${id}`);
  }

  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/recipes/${id}`);
  }

  getIngredients(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/ingredients`);
  }

  getCuisines(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/cuisines`);
  }
}
