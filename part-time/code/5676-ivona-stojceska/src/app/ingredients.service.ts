import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  url='http://localhost:2999/ingredients';

  constructor(private http:HttpClient) {     
  }

  getAllIngredients(){
    return  this.http.get(this.url);
   }

}
