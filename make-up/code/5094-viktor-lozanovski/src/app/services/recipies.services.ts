import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"; 
import {Recipe} from '../models/recipe';
import { Observable, map} from 'rxjs';



const BASE_URL = 'http://localhost:3000/';

@Injectable({
providedIn: 'root'
})
export class RecipeService {
    apiUrl:any;

    constructor(private http:HttpClient) {}
getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${BASE_URL}recipes`);

}
}