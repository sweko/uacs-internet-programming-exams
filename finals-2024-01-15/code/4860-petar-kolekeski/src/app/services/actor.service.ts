import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Movie} from "../models/movie";
import {Actor} from "../models/actor";

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private http: HttpClient) { }

  getActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>('https://localhost:3000/actors')
  }

  getActor(id: number): Observable<Actor>{
    return this.http.get<Actor>(`https://localhost:3000/actors/${id}`)
  }

  getActorByName(name: string): Observable<Actor>{
    return this.http.get<Actor>(`https://localhost:3000/actors?name=${name}`)
  }
}
