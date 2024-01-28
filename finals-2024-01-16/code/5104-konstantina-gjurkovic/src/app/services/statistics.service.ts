import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { StatisticsData
 } from '../models/statistics';
const BASE_URL = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  getStatistics(): Observable<StatisticsData> {
    return this.http.get<StatisticsData>(`${BASE_URL}/statistics`).pipe(
      tap(data => console.log('Statistics Data:', data))
    );
  }
  
}