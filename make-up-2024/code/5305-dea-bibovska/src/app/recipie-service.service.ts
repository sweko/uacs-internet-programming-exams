import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipie, Ingredient, Ingredients, Cuisine } from './models/client';
import { toRecipie, toRecipieResponse } from './models/mapping';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class RecipieServiceService {

  constructor(private http: HttpClient) { }

  getRecipies(): Observable<Recipie[]> {
    return this.http.get<Recipie[]>(`${BASE_URL}/recipie`);
  }

  getRecipie(id: number): Observable<Recipie> {
    return this.http.get<Recipie>(`${BASE_URL}/recipie/${id}`);
  }

  createRecipie(newRecipie: Recipie): Observable<Recipie> {
    const recipieResponse = toRecipieResponse(newRecipie); 
    return this.http.post<Recipie>(`${BASE_URL}/recipes`, recipieResponse); 
  }

  updateRecipie(updatedRecipie: Recipie): Observable<Recipie> {
    const recipieResponse = toRecipieResponse(updatedRecipie); 
    return this.http.put<Recipie>(`${BASE_URL}/recipes/${updatedRecipie.id}`, recipieResponse);
  }

  deleteRecipie(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/recipes/${id}`);
  }

  getIngredients(): Observable<Ingredients[]> {
    return this.http.get<Ingredients[]>(`${BASE_URL}/ingredients`);
  }

  getCuisine(): Observable<Cuisine[]> {
    return this.http.get<Cuisine[]>(`${BASE_URL}/cuisines`);
  }

}
