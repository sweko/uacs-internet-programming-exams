import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from '../models/recipe.model'; 

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = 'assets/recipe-data.json'; 

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl);
  }

  getRecipeById(id: number): Observable<Recipe> {
    return this.getRecipes().pipe(
      map(recipes => recipes.find(recipe => recipe.id === id))
    );
  }
}
