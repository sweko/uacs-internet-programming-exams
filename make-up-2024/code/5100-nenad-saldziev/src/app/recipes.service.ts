import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { recipesResponse } from '../model/server';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { toRecipes, toRecipesResponse } from '../model/mapping';
import { recipes } from '../model/client';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class RecipesService {

  private recipesSubject$ = new BehaviorSubject<recipes[]>([]);

  constructor(private http: HttpClient) { }

  getRecipes() {
    return this.http.get<recipesResponse[]>(`${BASE_URL}/recipes`).pipe(
      map(recipesResponse => recipesResponse.map(recipesResponse => toRecipes(recipesResponse))),
      tap(recipes => this.recipesSubject$.next(recipes)),
    );
  }

  getRecipe(id: number): Observable<recipes> {
    return this.http.get<recipesResponse>(`${BASE_URL}/authors/${id}`).pipe(
      map(recipesResponse => toRecipes(recipesResponse)),
    );
  }

  //   getNationalities() {
  //   return this.http.get<string[]>(`${BASE_URL}/nationalities`);
  // }

  updateRecipe(updateRecipe: recipes) {
    const recipesResponse = toRecipesResponse(updateRecipe);
    return this.http.put<recipesResponse>(`${BASE_URL}/recipes/${updateRecipe.id}`, recipesResponse).pipe(
      map(recipesResponse => toRecipes(recipesResponse)),
      tap(recipe => {
        const recipes = this.recipesSubject$.getValue();
        const index = recipes.findIndex(a => a.id === recipe.id);
        recipes[index] = recipe;
        this.recipesSubject$.next(recipes);
      }),
    );
  }

  deleteAuthor(id: number) {
    return this.http.delete(`${BASE_URL}/recipes/${id}`).pipe(
      tap(() => {
        const recipes = this.recipesSubject$.getValue();
        const index = recipes.findIndex(a => a.id === id);
        recipes.splice(index, 1);
        this.recipesSubject$.next(recipes);
      }),
    );
  }
}
