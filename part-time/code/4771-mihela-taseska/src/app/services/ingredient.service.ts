import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/Ingredient';

const BASE_URL = 'http://localhost:2999/ingredients';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  public ingredientsWithRecipes: any;

  constructor(private http: HttpClient) {}

  getIngredients(): Observable<string[]> {
    return this.http.get<string[]>(BASE_URL);
  }

  setIngredientsWithRecipes(data: any) {
    this.ingredientsWithRecipes = data;
  }
}
