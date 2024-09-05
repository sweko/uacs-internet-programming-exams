import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  url='http://localhost:2999/recipes';

  constructor(private http:HttpClient) { }
    getAllRecipes(){
     return  this.http.get(this.url);
    }

    getRecipeById(recipe_id: any){
      const newurl = `http://localhost:2999/recipes/${recipe_id}`;
      return  this.http.get(newurl);
    }

    saveRecipeData(data: any){
      //console.log(data);
      return this.http.post(this.url,data);

    }
    
  deleteRecipeFromServer(recipe_id: any){
    const newurl = `http://localhost:2999/recipes/${recipe_id}`;
    return this.http.delete(newurl);
  }

}
