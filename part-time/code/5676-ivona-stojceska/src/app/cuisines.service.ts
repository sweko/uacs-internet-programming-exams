import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CuisinesService {

  url='http://localhost:2999/cuisines';

  constructor(private http:HttpClient) {     
  }

  getAllCuisines(){
    return  this.http.get(this.url);
   }
}
