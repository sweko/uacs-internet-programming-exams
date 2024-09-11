import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuisine } from '../models/Cuisine';

const BASE_URL = 'http://localhost:2999/cuisines';

@Injectable({
  providedIn: 'root',
})
export class CuisineService {
  constructor(private http: HttpClient) {}

  getAllCuisines(): Observable<string[]> {
    return this.http.get<string[]>(BASE_URL);
  }
}
