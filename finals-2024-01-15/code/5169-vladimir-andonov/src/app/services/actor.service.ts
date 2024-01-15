import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  private apiUrl = 'https://localhost:3000/actors';

  constructor(private http: HttpClient) { }

  
}
