import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {

  constructor(private http: HttpClient) {}
  
  private recipeListApi = "https://localhost:2999";

  getRecipeApi() {
    return this.http.get<HttpClient>(this.recipeListApi);
  }

}
